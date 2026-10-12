import { PortfolioApi } from '../generated/portfolio-api/client.gen';
import { PortfolioApiClientContext } from '../components/PortfolioApiProvider';
import { useContext } from 'react';

export const usePortfolioApiClient = (): PortfolioApi => {
  const client = useContext(PortfolioApiClientContext);

  if (!client) {
    throw new Error(
      'usePortfolioApiClient must be used within a PortfolioApiProvider'
    );
  }

  return client;
};
