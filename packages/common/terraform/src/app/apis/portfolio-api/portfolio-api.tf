terraform {
  required_version = ">= 1.0"

  required_providers {
    archive = {
      source  = "hashicorp/archive"
      version = "2.8.1"
    }
    aws = {
      source  = "hashicorp/aws"
      version = "6.67.0"
    }
    random = {
      source  = "hashicorp/random"
      version = "3.9.1"
    }
  }
}


variable "env" {
  description = "Environment variables for the Lambda function"
  type        = map(string)
  default     = {}
}

variable "additional_iam_policy_statements" {
  description = "Additional IAM policy statements for the Lambda function"
  type        = list(object({
    Effect   = string
    Action   = list(string)
    Resource = list(string)
  }))
  default = []
}

variable "appconfig_application_id" {
  description = "ID of the shared runtime-config AppConfig application (from `core/runtime-config/appconfig.application_id`). When set, the Lambda functions receive `RUNTIME_CONFIG_APP_ID` and read access to the application."
  type        = string
  default     = null
}

variable "appconfig_application_arn" {
  description = "ARN of the shared runtime-config AppConfig application (from `core/runtime-config/appconfig.application_arn`). Used to scope the IAM read permission granted to the Lambda functions."
  type        = string
  default     = null
}

variable "asset_bucket_name" {
  description = "Name of the shared asset S3 bucket used to stage the Lambda deployment zip. Instantiate the `core/asset-bucket` module once per deployment and pass its `bucket_name` output here."
  type        = string
}

# VPC Configuration (optional)
variable "enable_vpc" {
  description = "Deploy the Lambda function into a VPC. Set alongside vpc_id/subnet_ids."
  type        = bool
  default     = false
}

variable "vpc_id" {
  description = "VPC ID to deploy the Lambda function into. Required when enable_vpc is true."
  type        = string
  default     = null

  validation {
    condition     = !var.enable_vpc || (var.vpc_id != null && var.subnet_ids != null)
    error_message = "vpc_id and subnet_ids must be set when enable_vpc is true."
  }
}

variable "subnet_ids" {
  description = "Subnet IDs to deploy the Lambda function into. Required when enable_vpc is true."
  type        = list(string)
  default     = null
}

# CORS Configuration (passed to core module)

variable "cors_allow_headers" {
  description = "List of allowed headers for CORS"
  type        = list(string)
  default     = ["authorization", "content-type", "x-amz-content-sha256", "x-amz-date", "x-amz-security-token"]
}

variable "cors_allow_methods" {
  description = "List of allowed HTTP methods for CORS"
  type        = list(string)
  default     = ["*"]
}

variable "cors_allow_origins" {
  description = "List of allowed origins for CORS"
  type        = list(string)
  default     = ["*"]
}

# WAF Configuration
variable "enable_waf" {
  description = "Whether to enable AWS WAFv2 with the default managed ruleset on the API stage"
  type        = bool
  default     = true
}

# Tags
variable "tags" {
  description = "Tags to apply to all resources"
  type        = map(string)
  default     = {}
}

# Custom domain configuration
variable "custom_domain_name" {
  description = "Custom domain name for the API. Requires acm_certificate_arn."
  type        = string
  default     = null
}

variable "acm_certificate_arn" {
  description = "ARN of an ACM certificate (in the API's region) for the custom domain name."
  type        = string
  default     = null
}

# Get current AWS region and account ID
data "aws_region" "current" {}
data "aws_caller_identity" "current" {}

resource "random_string" "suffix" {
  length  = 8
  special = false
  upper   = false
}

locals {
  # Generated at build time from the API definition
  operations_file = "${path.module}/../../../generated/portfolio-api/operations.json"
  operations      = fileexists(local.operations_file) ? jsondecode(file(local.operations_file)) : {}

  operation_slug = { for op in keys(local.operations) : op => replace(op, "/[^a-zA-Z0-9-_]/", "-") }
  operation_hash = { for op in keys(local.operations) : op => substr(sha256(op), 0, 8) }

  function_name = { for op in keys(local.operations) : op =>
    "${substr("PortfolioApi-${local.operation_slug[op]}", 0, 64 - length(local.operation_hash[op]) - length(random_string.suffix.result) - 2)}-${local.operation_hash[op]}-${random_string.suffix.result}"
  }
  role_name = { for op in keys(local.operations) : op =>
    "${substr("PortfolioApi-${local.operation_slug[op]}-role", 0, 64 - length(local.operation_hash[op]) - length(random_string.suffix.result) - 2)}-${local.operation_hash[op]}-${random_string.suffix.result}"
  }

  # A REST API needs a resource per path segment, so each operation's path is
  # split into the distinct path prefixes the resource tree is built from below
  operation_segments = { for op, details in local.operations : op => compact(split("/", details.path)) }

  path_nodes = merge([
    for op, segments in local.operation_segments : {
      for i, segment in segments : join("/", slice(segments, 0, i + 1)) => {
        depth  = i
        parent = i == 0 ? "" : join("/", slice(segments, 0, i))
        part   = segment
      }
    }
  ]...)

  # Instances of a resource cannot reference one another, so each depth is a
  # separate resource. Deeper paths are reported by the precondition below.
  max_path_depth = 16
  path_nodes_by_depth = { for depth in range(local.max_path_depth) : depth => {
    for path, node in local.path_nodes : path => node if node.depth == depth
  } }
  paths_too_deep = [for path, node in local.path_nodes : path if node.depth >= local.max_path_depth]

  resource_ids = merge(
    { for path, resource in aws_api_gateway_resource.path_depth_0 : path => resource.id },
    { for path, resource in aws_api_gateway_resource.path_depth_1 : path => resource.id },
    { for path, resource in aws_api_gateway_resource.path_depth_2 : path => resource.id },
    { for path, resource in aws_api_gateway_resource.path_depth_3 : path => resource.id },
    { for path, resource in aws_api_gateway_resource.path_depth_4 : path => resource.id },
    { for path, resource in aws_api_gateway_resource.path_depth_5 : path => resource.id },
    { for path, resource in aws_api_gateway_resource.path_depth_6 : path => resource.id },
    { for path, resource in aws_api_gateway_resource.path_depth_7 : path => resource.id },
    { for path, resource in aws_api_gateway_resource.path_depth_8 : path => resource.id },
    { for path, resource in aws_api_gateway_resource.path_depth_9 : path => resource.id },
    { for path, resource in aws_api_gateway_resource.path_depth_10 : path => resource.id },
    { for path, resource in aws_api_gateway_resource.path_depth_11 : path => resource.id },
    { for path, resource in aws_api_gateway_resource.path_depth_12 : path => resource.id },
    { for path, resource in aws_api_gateway_resource.path_depth_13 : path => resource.id },
    { for path, resource in aws_api_gateway_resource.path_depth_14 : path => resource.id },
    { for path, resource in aws_api_gateway_resource.path_depth_15 : path => resource.id },
  )

  operation_resource_id = { for op, segments in local.operation_segments : op =>
    local.resource_ids[join("/", segments)]
  }

  permission_source_suffix = { for op, details in local.operations : op =>
    "${upper(details.method)}/${replace(join("/", local.operation_segments[op]), "/{[^}]*}/", "*")}"
  }
}

resource "terraform_data" "operations_metadata" {
  # Fails the plan when the operations metadata has not been generated
  input = local.operations_file

  lifecycle {
    precondition {
      condition     = fileexists(local.operations_file)
      error_message = "Operations metadata not found at ${local.operations_file}. Build the PortfolioApi project to generate it."
    }
    precondition {
      condition     = length(local.operations) > 0
      error_message = "No operations found in ${local.operations_file}. The PortfolioApi API must define at least one operation."
    }
    precondition {
      condition     = length(local.paths_too_deep) == 0
      error_message = "Operation paths exceed the supported depth of ${local.max_path_depth} segments: ${join(", ", local.paths_too_deep)}. Add further aws_api_gateway_resource levels to this module to support them."
    }
  }
}

# API Gateway resources at path depth 0
resource "aws_api_gateway_resource" "path_depth_0" {
  for_each = local.path_nodes_by_depth[0]

  rest_api_id = module.rest_api.api_id
  parent_id   = module.rest_api.api_root_resource_id
  path_part   = each.value.part
}

# API Gateway resources at path depth 1
resource "aws_api_gateway_resource" "path_depth_1" {
  for_each = local.path_nodes_by_depth[1]

  rest_api_id = module.rest_api.api_id
  parent_id   = aws_api_gateway_resource.path_depth_0[each.value.parent].id
  path_part   = each.value.part
}

# API Gateway resources at path depth 2
resource "aws_api_gateway_resource" "path_depth_2" {
  for_each = local.path_nodes_by_depth[2]

  rest_api_id = module.rest_api.api_id
  parent_id   = aws_api_gateway_resource.path_depth_1[each.value.parent].id
  path_part   = each.value.part
}

# API Gateway resources at path depth 3
resource "aws_api_gateway_resource" "path_depth_3" {
  for_each = local.path_nodes_by_depth[3]

  rest_api_id = module.rest_api.api_id
  parent_id   = aws_api_gateway_resource.path_depth_2[each.value.parent].id
  path_part   = each.value.part
}

# API Gateway resources at path depth 4
resource "aws_api_gateway_resource" "path_depth_4" {
  for_each = local.path_nodes_by_depth[4]

  rest_api_id = module.rest_api.api_id
  parent_id   = aws_api_gateway_resource.path_depth_3[each.value.parent].id
  path_part   = each.value.part
}

# API Gateway resources at path depth 5
resource "aws_api_gateway_resource" "path_depth_5" {
  for_each = local.path_nodes_by_depth[5]

  rest_api_id = module.rest_api.api_id
  parent_id   = aws_api_gateway_resource.path_depth_4[each.value.parent].id
  path_part   = each.value.part
}

# API Gateway resources at path depth 6
resource "aws_api_gateway_resource" "path_depth_6" {
  for_each = local.path_nodes_by_depth[6]

  rest_api_id = module.rest_api.api_id
  parent_id   = aws_api_gateway_resource.path_depth_5[each.value.parent].id
  path_part   = each.value.part
}

# API Gateway resources at path depth 7
resource "aws_api_gateway_resource" "path_depth_7" {
  for_each = local.path_nodes_by_depth[7]

  rest_api_id = module.rest_api.api_id
  parent_id   = aws_api_gateway_resource.path_depth_6[each.value.parent].id
  path_part   = each.value.part
}

# API Gateway resources at path depth 8
resource "aws_api_gateway_resource" "path_depth_8" {
  for_each = local.path_nodes_by_depth[8]

  rest_api_id = module.rest_api.api_id
  parent_id   = aws_api_gateway_resource.path_depth_7[each.value.parent].id
  path_part   = each.value.part
}

# API Gateway resources at path depth 9
resource "aws_api_gateway_resource" "path_depth_9" {
  for_each = local.path_nodes_by_depth[9]

  rest_api_id = module.rest_api.api_id
  parent_id   = aws_api_gateway_resource.path_depth_8[each.value.parent].id
  path_part   = each.value.part
}

# API Gateway resources at path depth 10
resource "aws_api_gateway_resource" "path_depth_10" {
  for_each = local.path_nodes_by_depth[10]

  rest_api_id = module.rest_api.api_id
  parent_id   = aws_api_gateway_resource.path_depth_9[each.value.parent].id
  path_part   = each.value.part
}

# API Gateway resources at path depth 11
resource "aws_api_gateway_resource" "path_depth_11" {
  for_each = local.path_nodes_by_depth[11]

  rest_api_id = module.rest_api.api_id
  parent_id   = aws_api_gateway_resource.path_depth_10[each.value.parent].id
  path_part   = each.value.part
}

# API Gateway resources at path depth 12
resource "aws_api_gateway_resource" "path_depth_12" {
  for_each = local.path_nodes_by_depth[12]

  rest_api_id = module.rest_api.api_id
  parent_id   = aws_api_gateway_resource.path_depth_11[each.value.parent].id
  path_part   = each.value.part
}

# API Gateway resources at path depth 13
resource "aws_api_gateway_resource" "path_depth_13" {
  for_each = local.path_nodes_by_depth[13]

  rest_api_id = module.rest_api.api_id
  parent_id   = aws_api_gateway_resource.path_depth_12[each.value.parent].id
  path_part   = each.value.part
}

# API Gateway resources at path depth 14
resource "aws_api_gateway_resource" "path_depth_14" {
  for_each = local.path_nodes_by_depth[14]

  rest_api_id = module.rest_api.api_id
  parent_id   = aws_api_gateway_resource.path_depth_13[each.value.parent].id
  path_part   = each.value.part
}

# API Gateway resources at path depth 15
resource "aws_api_gateway_resource" "path_depth_15" {
  for_each = local.path_nodes_by_depth[15]

  rest_api_id = module.rest_api.api_id
  parent_id   = aws_api_gateway_resource.path_depth_14[each.value.parent].id
  path_part   = each.value.part
}

# Resources

# Create Lambda ZIP file from the bundle directory
data "archive_file" "lambda_zip" {
  type        = "zip"
  source_dir  = "${path.module}/../../../../../../../dist/packages/portfolio-api/backend/bundle"
  output_path = "${path.module}/../../../../../../../dist/packages/common/terraform/apis/portfolio-api/lambda.zip"
}

resource "aws_s3_object" "lambda_zip" {
  bucket      = var.asset_bucket_name
  key         = "apis/portfolio-api/${data.archive_file.lambda_zip.output_sha256}.zip"
  source      = data.archive_file.lambda_zip.output_path
  source_hash = data.archive_file.lambda_zip.output_base64sha256
  etag        = data.archive_file.lambda_zip.output_md5
}

# Use the core REST API module
# Account-level CloudWatch role required for REST API access logging
module "account" {
  source = "../../../core/api/api-gateway-account"
}

module "rest_api" {
  source = "../../../core/api/rest-api"

  api_name        = "PortfolioApi-${random_string.suffix.result}"
  api_description = "PortfolioApi REST API"
  stage_name      = "prod"
  stage_auto_deploy = true

  # WAF Configuration
  enable_waf = var.enable_waf

  # CORS Configuration
  cors_allow_headers     = var.cors_allow_headers
  cors_allow_methods     = var.cors_allow_methods
  cors_allow_origins     = var.cors_allow_origins

  # Tags
  tags = var.tags
}

resource "aws_wafv2_web_acl_association" "api_waf_association" {
  count = var.enable_waf ? 1 : 0

  resource_arn = aws_api_gateway_stage.api_stage.arn
  web_acl_arn  = module.rest_api.waf_web_acl_arn

  depends_on = [aws_api_gateway_stage.api_stage]
}

# Security group for the API Lambda function, used when deployed into a VPC
resource "aws_security_group" "api_lambda" {
  count = var.enable_vpc ? 1 : 0

  #checkov:skip=CKV2_AWS_5:Attached to api_lambda via vpc_config block; Checkov cannot resolve this reference
  name_prefix = "portfolio-api-lambda-"
  description = "Security group for the PortfolioApi API Lambda function"
  vpc_id      = var.vpc_id
  tags        = var.tags
}

resource "aws_vpc_security_group_egress_rule" "api_lambda_https" {
  count = var.enable_vpc ? 1 : 0

  security_group_id = aws_security_group.api_lambda[0].id
  cidr_ipv4         = "0.0.0.0/0"
  from_port         = 443
  to_port           = 443
  ip_protocol       = "tcp"
  description       = "Allow outbound HTTPS to AWS service endpoints"
}

resource "aws_lambda_function" "api_lambda" {
  # One lambda function per operation, each serving just that operation
  for_each = local.operations

  #checkov:skip=CKV_AWS_117:Lambda function is optionally deployed into a VPC via vpc_id/subnet_ids; not required for this use case
  #checkov:skip=CKV_AWS_116:Dead Letter Queue not required for this simple API use case
  #checkov:skip=CKV_AWS_272:Code signing not required for this use case
  #checkov:skip=CKV_AWS_115:Concurrent execution limit not required for this use case
  #checkov:skip=CKV_AWS_173:Lambda environment variables encrypted by managed key
  s3_bucket         = aws_s3_object.lambda_zip.bucket
  s3_key            = aws_s3_object.lambda_zip.key
  s3_object_version = aws_s3_object.lambda_zip.version_id
  function_name    = local.function_name[each.key]
  role            = aws_iam_role.lambda_execution_role[each.key].arn
  handler         = "index.handler"
  runtime         = "nodejs24.x"
  timeout         = 30
  memory_size     = 128

  source_code_hash = data.archive_file.lambda_zip.output_base64sha256

  # Enable X-Ray tracing
  tracing_config {
    mode = "Active"
  }

  dynamic "vpc_config" {
    for_each = var.enable_vpc ? [1] : []
    content {
      subnet_ids         = var.subnet_ids
      security_group_ids = [aws_security_group.api_lambda[0].id]
    }
  }


  environment {
    variables = merge({
    }, var.appconfig_application_id != null ? {
      RUNTIME_CONFIG_APP_ID = var.appconfig_application_id
    } : {}, var.env)
  }

  tags = var.tags

  depends_on = [aws_iam_role_policy_attachment.lambda_vpc_access]
}

# IAM role for Lambda execution
resource "aws_iam_role" "lambda_execution_role" {
  for_each = local.operations

  name = local.role_name[each.key]

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "lambda.amazonaws.com"
        }
      }
    ]
  })

  tags = var.tags
}

# Attach basic execution policy to Lambda role
resource "aws_iam_role_policy_attachment" "lambda_basic_execution" {
  for_each = local.operations

  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
  role       = aws_iam_role.lambda_execution_role[each.key].name
}

# Attach X-Ray tracing policy to Lambda role
resource "aws_iam_role_policy_attachment" "lambda_xray_execution" {
  for_each = local.operations

  policy_arn = "arn:aws:iam::aws:policy/AWSXRayDaemonWriteAccess"
  role       = aws_iam_role.lambda_execution_role[each.key].name
}

# Attach VPC access policy to Lambda role when deployed into a VPC
resource "aws_iam_role_policy_attachment" "lambda_vpc_access" {
  for_each = var.enable_vpc ? local.operations : {}

  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaVPCAccessExecutionRole"
  role       = aws_iam_role.lambda_execution_role[each.key].name
}

# Additional IAM policies for Lambda (if provided)
resource "aws_iam_role_policy" "lambda_additional_policies" {
  for_each = local.operations

  name = "${substr(local.function_name[each.key], 0, 55)}-policies"
  role = aws_iam_role.lambda_execution_role[each.key].id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = local.lambda_policy_document_statements
  })
}

locals {
  # Grant read access to the runtime-config AppConfig application when wired
  lambda_policy_statements = concat(var.appconfig_application_arn != null ? [
    {
      Effect = "Allow"
      Action = [
        "appconfig:StartConfigurationSession",
        "appconfig:GetLatestConfiguration"
      ]
      Resource = ["${var.appconfig_application_arn}/*"]
    }
  ] : [], var.additional_iam_policy_statements)

  # IAM rejects an empty statement list, so fall back to a no-op deny
  lambda_policy_document_statements = length(local.lambda_policy_statements) > 0 ? local.lambda_policy_statements : [
    {
      Effect   = "Deny"
      Action   = ["appconfig:GetLatestConfiguration"]
      Resource = ["arn:aws:appconfig:${data.aws_region.current.region}:${data.aws_caller_identity.current.account_id}:application/none"]
    }
  ]
}

locals {
  api_url = var.custom_domain_name == null ? "${aws_api_gateway_stage.api_stage.invoke_url}/" : "https://${var.custom_domain_name}/"
}

# CloudWatch Log Group for Lambda
resource "aws_cloudwatch_log_group" "lambda_logs" {
  #checkov:skip=CKV_AWS_158:Using default CloudWatch log encryption
  #checkov:skip=CKV_AWS_338:Log retention set to forever
  #checkov:skip=CKV_AWS_66:Log retention set to forever
  for_each = local.operations

  name = "/aws/lambda/${local.function_name[each.key]}"
  tags = var.tags
}



# Method per operation
resource "aws_api_gateway_method" "operation_methods" {
  #checkov:skip=CKV2_AWS_53:Request validation not required for proxy integration as Lambda handles validation
  for_each = local.operations

  rest_api_id   = module.rest_api.api_id
  resource_id   = local.operation_resource_id[each.key]
  http_method   = upper(each.value.method)

  authorization = "AWS_IAM"

  # Path parameters must be declared on the method
  request_parameters = {
    for segment in local.operation_segments[each.key] :
    "method.request.path.${trimsuffix(trimprefix(segment, "{"), "}")}" => true
    if startswith(segment, "{")
  }

  depends_on = []
}

# Lambda integration per operation
resource "aws_api_gateway_integration" "lambda_integration" {
  for_each = local.operations

  rest_api_id = module.rest_api.api_id
  resource_id = local.operation_resource_id[each.key]
  http_method = aws_api_gateway_method.operation_methods[each.key].http_method

  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = aws_lambda_function.api_lambda[each.key].invoke_arn

  depends_on = [aws_lambda_function.api_lambda]
}

# OPTIONS method for CORS preflight, on every resource an operation is served from
resource "aws_api_gateway_method" "options_method" {
  #checkov:skip=CKV2_AWS_70:OPTIONS method must be unauthenticated for CORS preflight requests
  #checkov:skip=CKV2_AWS_53:Request validation not required for OPTIONS CORS preflight method
  for_each = local.resource_ids

  rest_api_id   = module.rest_api.api_id
  resource_id   = each.value
  http_method   = "OPTIONS"
  authorization = "NONE"
}

# CORS integration for OPTIONS methods
resource "aws_api_gateway_integration" "options_integration" {
  for_each = local.resource_ids

  rest_api_id = module.rest_api.api_id
  resource_id = each.value
  http_method = aws_api_gateway_method.options_method[each.key].http_method

  type = "MOCK"
  request_templates = {
    "application/json" = "{\"statusCode\": 204}"
  }
}

# OPTIONS method responses
resource "aws_api_gateway_method_response" "options_response" {
  for_each = local.resource_ids

  rest_api_id = module.rest_api.api_id
  resource_id = each.value
  http_method = aws_api_gateway_method.options_method[each.key].http_method
  status_code = "204"

  response_parameters = {
    "method.response.header.Access-Control-Allow-Headers" = true
    "method.response.header.Access-Control-Allow-Methods" = true
    "method.response.header.Access-Control-Allow-Origin"  = true
  }
}

# OPTIONS integration responses
resource "aws_api_gateway_integration_response" "options_integration_response" {
  for_each = local.resource_ids

  rest_api_id = module.rest_api.api_id
  resource_id = each.value
  http_method = aws_api_gateway_method.options_method[each.key].http_method
  status_code = aws_api_gateway_method_response.options_response[each.key].status_code

  response_parameters = {
    "method.response.header.Access-Control-Allow-Headers" = "'${join(",", var.cors_allow_headers)}'"
    "method.response.header.Access-Control-Allow-Methods" = "'${join(",", var.cors_allow_methods)}'"
    "method.response.header.Access-Control-Allow-Origin"  = "'${join(",", var.cors_allow_origins)}'"
  }

  depends_on = [aws_api_gateway_integration.options_integration]
}

# API Gateway deployment
resource "aws_api_gateway_deployment" "api_deployment" {
  rest_api_id = module.rest_api.api_id

  triggers = {
    redeployment = sha1(jsonencode(concat(
      [for r in aws_api_gateway_resource.path_depth_0 : r.id],
      [for r in aws_api_gateway_resource.path_depth_1 : r.id],
      [for r in aws_api_gateway_resource.path_depth_2 : r.id],
      [for r in aws_api_gateway_resource.path_depth_3 : r.id],
      [for r in aws_api_gateway_resource.path_depth_4 : r.id],
      [for r in aws_api_gateway_resource.path_depth_5 : r.id],
      [for r in aws_api_gateway_resource.path_depth_6 : r.id],
      [for r in aws_api_gateway_resource.path_depth_7 : r.id],
      [for r in aws_api_gateway_resource.path_depth_8 : r.id],
      [for r in aws_api_gateway_resource.path_depth_9 : r.id],
      [for r in aws_api_gateway_resource.path_depth_10 : r.id],
      [for r in aws_api_gateway_resource.path_depth_11 : r.id],
      [for r in aws_api_gateway_resource.path_depth_12 : r.id],
      [for r in aws_api_gateway_resource.path_depth_13 : r.id],
      [for r in aws_api_gateway_resource.path_depth_14 : r.id],
      [for r in aws_api_gateway_resource.path_depth_15 : r.id],
      [for m in aws_api_gateway_method.operation_methods : m.id],
      [for i in aws_api_gateway_integration.lambda_integration : i.id],
      [for m in aws_api_gateway_method.options_method : m.id],
      [for i in aws_api_gateway_integration.options_integration : i.id],
    )))
  }

  lifecycle {
    create_before_destroy = true
  }

  depends_on = [
    aws_api_gateway_method.operation_methods,
    aws_api_gateway_integration.lambda_integration,
    aws_api_gateway_method.options_method,
    aws_api_gateway_integration.options_integration,
    aws_api_gateway_method_response.options_response,
    aws_api_gateway_integration_response.options_integration_response,
  ]
}

# KMS key for encrypting access logs at rest
resource "aws_kms_key" "access_logs" {
  description             = "PortfolioApi API access log encryption"
  deletion_window_in_days = 7
  enable_key_rotation     = true

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid       = "Enable IAM User Permissions"
        Effect    = "Allow"
        Principal = { AWS = "arn:aws:iam::${data.aws_caller_identity.current.account_id}:root" }
        Action    = "kms:*"
        Resource  = "*"
      },
      {
        Sid       = "Allow CloudWatch Logs"
        Effect    = "Allow"
        Principal = { Service = "logs.${data.aws_region.current.region}.amazonaws.com" }
        Action = [
          "kms:Encrypt",
          "kms:Decrypt",
          "kms:ReEncrypt*",
          "kms:GenerateDataKey*",
          "kms:DescribeKey"
        ]
        Resource = "*"
        Condition = {
          ArnEquals = {
            "kms:EncryptionContext:aws:logs:arn" = "arn:aws:logs:${data.aws_region.current.region}:${data.aws_caller_identity.current.account_id}:log-group:/aws/apigateway/portfolio-api-${random_string.suffix.result}/access"
          }
        }
      }
    ]
  })

  tags = var.tags
}

resource "aws_kms_alias" "access_logs" {
  name          = "alias/portfolio-api-${random_string.suffix.result}-access-logs"
  target_key_id = aws_kms_key.access_logs.key_id
}

# Access logs for the API Gateway stage
resource "aws_cloudwatch_log_group" "access_logs" {
  name              = "/aws/apigateway/portfolio-api-${random_string.suffix.result}/access"
  retention_in_days = 365
  kms_key_id        = aws_kms_key.access_logs.arn
  tags              = var.tags
}

# API Gateway stage
resource "aws_api_gateway_stage" "api_stage" {
  #checkov:skip=CKV_AWS_120:API Gateway caching not required for this use case
  #checkov:skip=CKV2_AWS_4:Access logging is enabled below; verbose execution logging is intentionally not enabled
  #checkov:skip=CKV2_AWS_51:Client certificate authentication not required for this use case
  #checkov:skip=CKV2_AWS_77:WAFv2 Web ACL is attached via aws_wafv2_web_acl_association when var.enable_waf is true (default) and includes AWSManagedRulesKnownBadInputsRuleSet for Log4j protection; Checkov does not track the association across modules
  deployment_id        = aws_api_gateway_deployment.api_deployment.id
  rest_api_id          = module.rest_api.api_id
  stage_name           = "prod"
  xray_tracing_enabled = true

  access_log_settings {
    destination_arn = aws_cloudwatch_log_group.access_logs.arn
    format = jsonencode({
      requestId      = "$context.requestId"
      ip             = "$context.identity.sourceIp"
      caller         = "$context.identity.caller"
      user           = "$context.identity.user"
      requestTime    = "$context.requestTime"
      httpMethod     = "$context.httpMethod"
      resourcePath   = "$context.resourcePath"
      status         = "$context.status"
      protocol       = "$context.protocol"
      responseLength = "$context.responseLength"
    })
  }

  tags = var.tags

  # Ensure the account-level role is configured before the stage is created
  depends_on = [aws_api_gateway_deployment.api_deployment, module.account]
}

# Default throttling applied to all resource paths and methods
resource "aws_api_gateway_method_settings" "throttling" {
  #checkov:skip=CKV_AWS_225:API Gateway caching not required for this use case
  rest_api_id = module.rest_api.api_id
  stage_name  = aws_api_gateway_stage.api_stage.stage_name
  method_path = "*/*"

  settings {
    throttling_rate_limit  = 10000
    throttling_burst_limit = 5000
  }
}

# API Gateway Resource Policy
resource "aws_api_gateway_rest_api_policy" "api_policy" {
  rest_api_id = module.rest_api.api_id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        # Grant any AWS credentials from the account to call the API
        # Machine to machine fine-grained access can be defined here using more specific principals
        # (eg roles or users) and resources (eg which api paths may be invoked by which principal) if required
        Effect = "Allow"
        Principal = {
          AWS = "arn:aws:iam::${data.aws_caller_identity.current.account_id}:root"
        }
        Action   = "execute-api:Invoke"
        Resource = "execute-api:/*"
      },
      {
        # Open up OPTIONS to allow browsers to make unauthenticated preflight requests
        Effect = "Allow"
        Principal = "*"
        Action   = "execute-api:Invoke"
        Resource = "execute-api:/*/OPTIONS/*"
      }
    ]
  })
}

# Lambda permission for API Gateway to invoke the function
resource "aws_lambda_permission" "api_gateway_invoke" {
  for_each = local.operations

  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.api_lambda[each.key].function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${module.rest_api.api_execution_arn}/*/${local.permission_source_suffix[each.key]}"

  depends_on = [module.rest_api, aws_lambda_function.api_lambda]
}


# Add API url to runtime config
module "add_url_to_runtime_config" {
  source = "../../../core/runtime-config/entry"

  namespace = "connection"
  key       = "apis"
  value     = { "PortfolioApi" = local.api_url }

  depends_on = [aws_api_gateway_stage.api_stage]
}

# Custom domain for the API, served without the stage path prefix
resource "aws_api_gateway_domain_name" "custom_domain" {
  count = var.custom_domain_name == null ? 0 : 1

  domain_name              = var.custom_domain_name
  regional_certificate_arn = var.acm_certificate_arn
  security_policy          = "TLS_1_2"

  endpoint_configuration {
    types = ["REGIONAL"]
  }

  tags = var.tags

  lifecycle {
    precondition {
      condition     = var.acm_certificate_arn != null
      error_message = "acm_certificate_arn is required when custom_domain_name is set."
    }
  }
}

resource "aws_api_gateway_base_path_mapping" "custom_domain" {
  count = var.custom_domain_name == null ? 0 : 1

  api_id      = module.rest_api.api_id
  stage_name  = aws_api_gateway_stage.api_stage.stage_name
  domain_name = aws_api_gateway_domain_name.custom_domain[0].domain_name
}

# Outputs

# API Gateway Outputs (from core module)
output "api_id" {
  description = "ID of the REST API Gateway"
  value       = module.rest_api.api_id
}

output "api_arn" {
  description = "ARN of the REST API Gateway"
  value       = module.rest_api.api_arn
}

output "api_endpoint" {
  description = "Base URL of the REST API Gateway"
  value       = module.rest_api.api_endpoint
}

output "api_execution_arn" {
  description = "Execution ARN of the REST API Gateway"
  value       = module.rest_api.api_execution_arn
}

output "stage_invoke_url" {
  description = "Invoke URL of the API Gateway stage"
  value       = aws_api_gateway_stage.api_stage.invoke_url
}

output "api_url" {
  description = "URL clients should call: the custom domain if configured, otherwise the stage invoke URL"
  value       = local.api_url
}

output "custom_domain_target_domain_name" {
  description = "Target domain name to point a DNS alias or CNAME record at for the custom domain"
  value       = var.custom_domain_name == null ? null : aws_api_gateway_domain_name.custom_domain[0].regional_domain_name
}

output "custom_domain_hosted_zone_id" {
  description = "Hosted zone ID to use for a Route 53 alias record for the custom domain"
  value       = var.custom_domain_name == null ? null : aws_api_gateway_domain_name.custom_domain[0].regional_zone_id
}

output "stage_arn" {
  description = "ARN of the API Gateway stage"
  value       = aws_api_gateway_stage.api_stage.arn
}

output "stage_execution_arn" {
  description = "Execution ARN of the API Gateway stage"
  value       = aws_api_gateway_stage.api_stage.execution_arn
}

output "deployment_id" {
  description = "ID of the API Gateway deployment"
  value       = aws_api_gateway_deployment.api_deployment.id
}

output "stage_id" {
  description = "ID of the API Gateway stage"
  value       = aws_api_gateway_stage.api_stage.id
}

# Lambda Function Outputs, keyed by operation name
output "operations" {
  description = "Names of the API operations, each with its own Lambda function"
  value       = keys(local.operations)
}

output "lambda_function_names" {
  description = "Name of each operation's Lambda function, keyed by operation name"
  value       = { for op, fn in aws_lambda_function.api_lambda : op => fn.function_name }
}

output "lambda_function_arns" {
  description = "ARN of each operation's Lambda function, keyed by operation name"
  value       = { for op, fn in aws_lambda_function.api_lambda : op => fn.arn }
}

output "lambda_invoke_arns" {
  description = "Invoke ARN of each operation's Lambda function, keyed by operation name"
  value       = { for op, fn in aws_lambda_function.api_lambda : op => fn.invoke_arn }
}

output "lambda_qualified_arns" {
  description = "Qualified ARN of each operation's Lambda function, keyed by operation name"
  value       = { for op, fn in aws_lambda_function.api_lambda : op => fn.qualified_arn }
}

output "lambda_versions" {
  description = "Version of each operation's Lambda function, keyed by operation name"
  value       = { for op, fn in aws_lambda_function.api_lambda : op => fn.version }
}

output "lambda_source_code_hash" {
  description = "Base64-encoded SHA256 hash of the Lambda deployment package, shared by every operation"
  value       = data.archive_file.lambda_zip.output_base64sha256
}

# IAM Role Outputs, keyed by operation name
output "lambda_execution_role_arns" {
  description = "ARN of each operation's Lambda execution role, keyed by operation name"
  value       = { for op, role in aws_iam_role.lambda_execution_role : op => role.arn }
}

output "lambda_execution_role_names" {
  description = "Name of each operation's Lambda execution role, keyed by operation name. Attach additional policies to a specific operation's role by name."
  value       = { for op, role in aws_iam_role.lambda_execution_role : op => role.name }
}

output "security_group_id" {
  description = "Security group ID shared by the API Lambda functions, for use in ingress rules on resources they must reach (e.g. a database). Null unless enable_vpc is true."
  value       = var.enable_vpc ? aws_security_group.api_lambda[0].id : null
}

# Integration Outputs, keyed by operation name
output "integration_ids" {
  description = "ID of each operation's Lambda integration, keyed by operation name"
  value       = { for op, i in aws_api_gateway_integration.lambda_integration : op => i.id }
}

output "method_ids" {
  description = "ID of each operation's API Gateway method, keyed by operation name"
  value       = { for op, m in aws_api_gateway_method.operation_methods : op => m.id }
}

output "resource_ids" {
  description = "ID of each API Gateway resource, keyed by its path"
  value       = local.resource_ids
}

# CloudWatch Log Groups, keyed by operation name
output "lambda_log_group_names" {
  description = "Name of each operation's Lambda CloudWatch log group, keyed by operation name"
  value       = { for op, lg in aws_cloudwatch_log_group.lambda_logs : op => lg.name }
}

output "lambda_log_group_arns" {
  description = "ARN of each operation's Lambda CloudWatch log group, keyed by operation name"
  value       = { for op, lg in aws_cloudwatch_log_group.lambda_logs : op => lg.arn }
}
