<script lang="ts">
	import { Button, Card, Input, Label } from '@kksh/svelte5';
	import { ui, dialog, fs, toast, event } from '@kksh/api/ui/custom';
	import { getRpcAPI } from '@/api';
	import { jobsStore } from '@/stores/jobs';
	import JobCard from '@/components/JobCard.svelte';
	import { onMount } from 'svelte';
	import SelectForm from '@/components/SelectForm.svelte';
	import type { Process } from '@/models';

	async function serveDir(path: string, port: number) {
		console.log('serveDir', path, port);
		// check path existence
		if (!(await fs.exists(path))) {
			toast.error('Path does not exist');
			return;
		}
		// check path type
		const stat = await fs.stat(path);
		if (!stat.isDirectory) {
			toast.error('Path is not a directory');
			return;
		}

		getRpcAPI()
			.then((rpc) =>
				rpc.api.serve(path, port).then((realPort) => {
					jobsStore.addJob({
						path,
						port: realPort,
						process: rpc.process
					});
					toast.success('Server started');
				})
			)
			.catch((err) => {
				toast.error('Failed to serve', {
					description: `${err.message}; consider changing the port`
				});
			});
	}
</script>

<svelte:window
	onkeydown={(e) => {
		if (document.activeElement?.nodeName === 'BODY' && e.key === 'Escape') {
			ui.goBack();
		}
	}}
/>
<div class="h-12" data-kunkun-drag-region></div>
<main class="container space-y-2">
	<h1 class="text-2xl font-bold">Serve Static Files</h1>

	<SelectForm onSubmit={serveDir} />
	{#each $jobsStore as job}
		<JobCard {job} />
	{/each}
</main>
