import type { ServeJob } from '@/models';
import { writable } from 'svelte/store';

export function createJobsStore() {
	const store = writable<ServeJob[]>([]);

	function addJob(job: ServeJob) {
		store.update((jobs) => [...jobs, job]);
	}

	function removeJob(job: ServeJob) {
		// there could be multiple jobs serving the same path, so we also need to compare port
		store.update((jobs) => jobs.filter((j) => j.path !== job.path || j.port !== job.port));
	}

	return {
		...store,
		addJob,
		removeJob
	};
}

export const jobsStore = createJobsStore();
// jobsStore.addJob({
// 	path: '/Users/hk/Dev/others/excalidraw/excalidraw-app/build',
// 	port: 8080,
// 	process: null
// });

// jobsStore.addJob({
// 	path: '/Users/hk/Dev/others/excalidraw/excalidraw-app/build',
// 	port: 8081
// });
