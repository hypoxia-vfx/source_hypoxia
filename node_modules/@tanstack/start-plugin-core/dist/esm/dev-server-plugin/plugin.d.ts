import { PluginOption } from 'vite';
import { GetConfigFn } from '../types.js';
export declare function devServerPlugin({ getConfig, devSsrStylesEnabled, }: {
    getConfig: GetConfigFn;
    devSsrStylesEnabled: boolean;
}): PluginOption;
