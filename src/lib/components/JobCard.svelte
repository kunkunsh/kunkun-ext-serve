<script lang="ts">
	import { Button, Card } from '@kksh/svelte5';
	import type { ServeJob } from '@/models';
	import { open, toast } from '@kksh/api/ui/custom';
	import { jobsStore } from '@/stores/jobs';

	let { job }: { job: ServeJob } = $props();
</script>

<Card.Root>
	<Card.Content>
		<p><strong>URL:</strong> <code>http://localhost:{job.port}</code></p>
		<p><strong>Path:</strong> <code>{job.path}</code></p>
	</Card.Content>
	<Card.Footer class="flex gap-2">
		<Button
			class="w-full"
			variant="destructive"
			onclick={() => {
				job.process
					.kill()
					.then(() => {
						toast.success('Killed');
						jobsStore.removeJob(job);
					})
					.catch((err) => {
						toast.error('Failed to kill', {
							description: 'Quiting this extension will automatically kill all servers'
						});
					});
			}}
		>
			Kill
		</Button>
		<Button
			class="w-full"
			variant="default"
			onclick={() => open.url(`http://localhost:${job.port}`)}
		>
			Open URL
		</Button>
		<Button class="w-full" variant="secondary" onclick={() => open.folder(job.path)}>
			Open Folder
		</Button>
	</Card.Footer>
</Card.Root>
