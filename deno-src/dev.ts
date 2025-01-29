import { serveDir } from 'jsr:@std/http/file-server';

const server = Deno.serve({ port: 0 }, (req: Request) => {
	return serveDir(req, {
		fsRoot: '/Users/hk/Dev/others/excalidraw/excalidraw-app/build'
	});
});
console.error('Server started at port', server.addr.port);
