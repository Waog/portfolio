import { IncomingMessage, ServerResponse, createServer } from 'http';
import { convertRequest, writeResponse } from '@smithy/server-node';
import { Logger } from '@aws-lambda-powertools/logger';
import { Metrics } from '@aws-lambda-powertools/metrics';
import { Tracer } from '@aws-lambda-powertools/tracer';
import { Service } from './service';
import { getPortfolioApiServiceHandler } from './generated/ssdk/index';

const PORT = 3001;

const tracer = new Tracer();
const logger = new Logger();
const metrics = new Metrics();

const serviceHandler = getPortfolioApiServiceHandler(Service);

const server = createServer(async function (
  req: IncomingMessage,
  res: ServerResponse<IncomingMessage> & { req: IncomingMessage }
) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const httpRequest = convertRequest(req);
  const httpResponse = await serviceHandler.handle(httpRequest, {
    tracer,
    logger,
    metrics,
  });
  return writeResponse(httpResponse, res);
});

server.listen(PORT);
console.log(`Started server on port ${PORT}...`);
