import { TSS_SERVER_FUNCTION, ClientFnMeta } from '@tanstack/start-client-core';
import { ServerFn } from '#tanstack-start-server-fn-resolver';
export type SsrRpcImporter = () => Promise<ServerFn>;
export declare const createSsrRpc: (functionId: string, importer?: SsrRpcImporter) => ((...args: Array<any>) => Promise<any>) & {
    url: string;
    serverFnMeta: ClientFnMeta;
    [TSS_SERVER_FUNCTION]: boolean;
};
