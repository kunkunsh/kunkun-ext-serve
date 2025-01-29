import type { Child } from '@kksh/api/ui/iframe';

export type Process = {
	kill: () => Promise<void>;
};

export type ServeJob = {
	path: string;
	port: number;
	process: Child;
	// process: Process;
};
