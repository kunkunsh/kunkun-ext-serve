<script lang="ts">
	import { Input, Label, Button } from '@kksh/svelte5';
	import { onMount } from 'svelte';
	import { event, toast, fs, dialog } from '@kksh/api/ui/iframe';

	// let isDragging = false;
	let { onSubmit }: { onSubmit: (path: string, port: number) => void } = $props();
	let path = $state('');
	let port = $state(8000);

	onMount(() => {
		// event.onDragEnter(() => {
		// 	isDragging = true;
		// });
		// event.onDragLeave(() => {
		// 	isDragging = false;
		// });
		event.onDragDrop(async (e) => {
			const paths = e.paths;
			if (paths.length > 1) {
				toast.error('Only one folder can be served at a time');
				return;
			}
			if (paths.length === 0) {
				toast.error('No folder selected');
				return;
			}
			path = paths[0];
			const stat = await fs.stat(path);
			if (!stat.isDirectory) {
				toast.error('Selected path is not a folder');
				return;
			}
		});
	});

	async function selectDirectory() {
		const result: string = await dialog.open({
			directory: true,
			multiple: false
		});
		if (!result) {
			return toast.warning('No directory selected');
		}
		if (!(await fs.exists(result))) {
			return toast.error('Directory does not exist');
		}
		path = result;
	}
</script>

<form
	onsubmit={(e) => {
		e.preventDefault();
		onSubmit(path, port);
	}}
>
	<Label>Path to Serve <span class="text-red-500">(or drag and drop a folder)</span></Label>
	<div class="flex gap-2">
		<Input bind:value={path} placeholder="Enter path to serve" />
		<Button onclick={selectDirectory}>Select Folder</Button>
	</div>
	<Label>Port <span class="text-red-500">(use 0 to auto assign)</span></Label>
	<Input bind:value={port} placeholder="Enter port to serve" />
	<Button type="submit" class="w-full">Serve</Button>
</form>
