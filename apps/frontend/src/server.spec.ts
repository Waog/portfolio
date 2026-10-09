import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import type { Server } from 'node:http';
import type { AddressInfo } from 'node:net';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import type { ErrorRequestHandler } from 'express';
import { vi } from 'vitest';

const { render } = vi.hoisted(() => ({ render: vi.fn() }));

vi.mock('@angular/ssr/node', () => ({
  CommonEngine: class {
    render = render;
  },
}));
vi.mock('./main.server', () => ({ default: vi.fn() }));

describe('Express SSR server', () => {
  let server: Server;
  let baseUrl: string;
  let workspace: string;
  let distFolder: string;

  beforeAll(async () => {
    // Supply the Webpack entry-point guard when importing the unbundled server.
    vi.stubGlobal('__non_webpack_require__', { main: undefined });
    const { app } = await import('./server');

    workspace = mkdtempSync(join(tmpdir(), 'portfolio-express-'));
    distFolder = join(workspace, 'dist/apps/frontend/browser');
    mkdirSync(join(distFolder, 'assets/icons'), { recursive: true });
    mkdirSync(join(distFolder, 'assets.v1'), { recursive: true });
    writeFileSync(join(distFolder, 'main.js'), 'console.log("asset");');
    writeFileSync(join(distFolder, 'assets/icons/icon.svg'), '<svg></svg>');
    writeFileSync(join(distFolder, 'assets.v1/LICENSE'), 'license');
    writeFileSync(join(distFolder, 'extensionless'), 'static file');
    writeFileSync(join(distFolder, '.secret'), 'private');
    writeFileSync(join(distFolder, 'index.html'), '<html></html>');

    const cwd = vi.spyOn(process, 'cwd').mockReturnValue(workspace);
    let application;
    try {
      application = app();
    } finally {
      cwd.mockRestore();
    }

    const errorHandler: ErrorRequestHandler = (_error, _req, res, _next) => {
      // Express identifies error middleware by its four-argument signature.
      void _next;
      res.status(500).send('SSR failed');
    };
    application.use(errorHandler);

    await new Promise<void>((resolve, reject) => {
      server = application.listen(0, '127.0.0.1', error => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
    baseUrl = `http://127.0.0.1:${(server.address() as AddressInfo).port}`;
  });

  beforeEach(() => {
    render.mockReset().mockResolvedValue('<html>SSR</html>');
  });

  afterAll(async () => {
    if (server?.listening) {
      await new Promise<void>((resolve, reject) => {
        server.close(error => (error ? reject(error) : resolve()));
        server.closeAllConnections();
      });
    }
    if (workspace) {
      rmSync(workspace, { recursive: true, force: true });
    }
    vi.unstubAllGlobals();
  });

  it.each(['/', '/legal', '/nested/page?tag=angular', '/extensionless'])(
    'renders %s through Angular',
    async path => {
      const response = await fetch(`${baseUrl}${path}`);

      expect(response.status).toBe(200);
      expect(await response.text()).toBe('<html>SSR</html>');
      expect(render).toHaveBeenCalledWith(
        expect.objectContaining({
          url: `${baseUrl}${path}`,
          documentFilePath: join(distFolder, 'index.html'),
          publicPath: distFolder,
        })
      );
    }
  );

  it.each([
    ['/main.js', 'console.log("asset");'],
    ['/assets/icons/icon.svg', '<svg></svg>'],
    ['/assets.v1/LICENSE', 'license'],
  ])('serves %s without invoking Angular', async (path, content) => {
    const response = await fetch(`${baseUrl}${path}`);

    expect(response.status).toBe(200);
    expect(await response.text()).toBe(content);
    expect(response.headers.get('cache-control')).toContain('max-age=31536000');
    expect(render).not.toHaveBeenCalled();
    if (path.endsWith('.js')) {
      expect(response.headers.get('content-type')).toContain('text/javascript');
    }
  });

  it.each(['/missing.js', '/.secret'])(
    'falls through to Angular for %s',
    async path => {
      const response = await fetch(`${baseUrl}${path}`);

      expect(response.status).toBe(200);
      expect(await response.text()).toBe('<html>SSR</html>');
      expect(render).toHaveBeenCalledOnce();
    }
  );

  it('forwards rejected renders to Express error middleware', async () => {
    render.mockRejectedValueOnce(new Error('Rendering failed'));

    const response = await fetch(`${baseUrl}/legal`);

    expect(response.status).toBe(500);
    expect(await response.text()).toBe('SSR failed');
  });
});
