import { useContext } from 'react';
import { PortfolioApiContext } from '../components/PortfolioApiProvider';
import { PortfolioApiOptionsProxy } from '../generated/portfolio-api/options-proxy.gen';

export const usePortfolioApi = (): PortfolioApiOptionsProxy => {
  const optionsProxy = useContext(PortfolioApiContext);

  if (!optionsProxy) {
    throw new Error(
      'usePortfolioApi must be used within a PortfolioApiProvider'
    );
  }

  return optionsProxy;
};
