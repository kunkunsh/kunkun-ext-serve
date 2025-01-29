import { expose } from '@kunkun/api/runtime/deno';
import { serveDir } from 'jsr:@std/http/file-server';
import type { API } from '../src/api.types.ts';

expose({
	serve: (path: string, port: number): Promise<number> => {
		const server = Deno.serve({ port }, (req: Request) => {
			return serveDir(req, {
				fsRoot: path,
				showDirListing: true,
				showDotfiles: true,
				quiet: true
			});
		});
		console.error('Server started at port', path, server.addr.port);
		return Promise.resolve(server.addr.port);
	}
} satisfies API);
