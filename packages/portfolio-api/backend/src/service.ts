import { ServiceContext } from './context';
import { PortfolioApiService } from './generated/ssdk/index';
import { Echo } from './operations/echo';

// Register operations to the service here
export const Service: PortfolioApiService<ServiceContext> = {
  Echo,
};
