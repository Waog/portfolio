import { ServiceContext } from '../context';
import { Echo as EchoOperation } from '../generated/ssdk/index';

export const Echo: EchoOperation<ServiceContext> = async (input, ctx) => {
  ctx.logger.info('Starting Echo operation');
  return input;
};
