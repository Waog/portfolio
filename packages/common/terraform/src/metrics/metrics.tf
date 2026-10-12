locals {
  metric_id = "uksb-4wk0bqpg5s"
  metric_version = "1.0.6"
  metric_tags    = ["g5", "g7", "g6", "g27", "g1", "g26", "g61", "g28", "g63", "g23"]
}

resource "random_string" "suffix" {
  length  = 8
  special = false
  upper   = false
}

# CloudFormation stack for metrics tracking
resource "aws_cloudformation_stack" "metrics" {
  #checkov:skip=CKV_AWS_124:Metrics stack does not require SNS notifications
  name = "nx-plugin-metrics-${random_string.suffix.result}"

  template_body = jsonencode({
    AWSTemplateFormatVersion = "2010-09-09"
    Description = "(${local.metric_id}) (version:${local.metric_version}) (tag:${join(",", local.metric_tags)})"
    Resources = {
      # Empty stack - used only for metrics tracking via description
      MetricsPlaceholder = {
        Type = "AWS::CloudFormation::WaitConditionHandle"
      }
    }
  })

  tags = {
    Purpose = "nx-plugin-metrics"
  }
}