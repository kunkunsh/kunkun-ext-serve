export interface API {
	serve: (path: string, port: number) => Promise<number>;
}
