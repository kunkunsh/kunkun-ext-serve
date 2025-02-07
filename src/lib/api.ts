import type { API } from '../api.types.ts';
import { shell } from '@kksh/api/ui/custom';

export async function getRpcAPI() {
	const { rpcChannel, process, command } = await shell.createDenoRpcChannel<object, API>(
		'$EXTENSION/deno-src/index.ts',
		[],
		{
			allowAllNet: true,
			allowAllRead: true
		},
		{}
	);
	command.stderr.on('data', (data: string) => {
		console.warn(data);
	});
	const api = rpcChannel.getAPI();
	return {
		api,
		rpcChannel,
		process,
		command
	};
}
