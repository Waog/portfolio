import { createContext, FC, PropsWithChildren, useMemo } from 'react';
import { PortfolioApi } from '../generated/portfolio-api/client.gen';
import { PortfolioApiOptionsProxy } from '../generated/portfolio-api/options-proxy.gen';
import { useRuntimeConfig } from '../hooks/useRuntimeConfig';
import { useSigV4 } from '../hooks/useSigV4';

export const PortfolioApiContext = createContext<
  PortfolioApiOptionsProxy | undefined
>(undefined);

export const PortfolioApiClientContext = createContext<
  PortfolioApi | undefined
>(undefined);

const useCreatePortfolioApiClient = (): PortfolioApi => {
  const runtimeConfig = useRuntimeConfig();
  const apiUrl = runtimeConfig.apis.PortfolioApi;
  const sigv4Client = useSigV4();
  return useMemo(
    () =>
      new PortfolioApi({
        url: apiUrl,
        fetch: sigv4Client.fetch,
      }),
    [apiUrl, sigv4Client]
  );
};

export const PortfolioApiProvider: FC<PropsWithChildren> = ({ children }) => {
  const client = useCreatePortfolioApiClient();
  const optionsProxy = useMemo(
    () => new PortfolioApiOptionsProxy({ client }),
    [client]
  );

  return (
    <PortfolioApiClientContext.Provider value={client}>
      <PortfolioApiContext.Provider value={optionsProxy}>
        {children}
      </PortfolioApiContext.Provider>
    </PortfolioApiClientContext.Provider>
  );
};

export default PortfolioApiProvider;
