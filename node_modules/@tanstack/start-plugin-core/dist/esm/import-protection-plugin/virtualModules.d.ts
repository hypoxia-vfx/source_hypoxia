import { ViolationInfo } from './trace.js';
export declare const MOCK_MODULE_ID = "tanstack-start-import-protection:mock";
/**
 * Per-violation mock prefix used in build+error mode.
 * Each deferred violation gets a unique ID so we can check which ones
 * survived tree-shaking in `generateBundle`.
 */
export declare const MOCK_BUILD_PREFIX = "tanstack-start-import-protection:mock:build:";
export declare const MOCK_EDGE_PREFIX = "tanstack-start-import-protection:mock-edge:";
export declare const MOCK_RUNTIME_PREFIX = "tanstack-start-import-protection:mock-runtime:";
export declare function resolvedMarkerVirtualModuleId(kind: 'server' | 'client'): string;
/**
 * Convenience list for plugin `load` filters/handlers.
 *
 * Vite/Rollup call `load(id)` with the *resolved* virtual id (prefixed by `\0`).
 * `resolveId(source)` sees the *unresolved* id/prefix (without `\0`).
 */
export declare function getResolvedVirtualModuleMatchers(): ReadonlyArray<string>;
/**
 * Resolve import-protection's internal virtual module IDs.
 *
 * `resolveId(source)` sees *unresolved* ids/prefixes (no `\0`).
 * Returning a resolved id (with `\0`) ensures Vite/Rollup route it to `load`.
 */
export declare function resolveInternalVirtualModuleId(source: string): string | undefined;
type MockAccessMode = 'error' | 'warn' | 'off';
/**
 * Compact runtime suggestion text for browser console, derived from
 * {@link CLIENT_ENV_SUGGESTIONS} so there's a single source of truth.
 */
export declare const RUNTIME_SUGGESTION_TEXT: string;
export declare function mockRuntimeModuleIdFromViolation(info: ViolationInfo, mode: MockAccessMode, root: string): string;
export declare function makeMockEdgeModuleId(exports: Array<string>, runtimeId: string): string;
export declare function loadSilentMockModule(): {
    code: string;
};
/**
 * Generate a self-contained mock module with explicit named exports.
 *
 * Used by the transform hook's "self-denial" check: when a denied file
 * (e.g. `.server.ts` in the client environment) is transformed, its entire
 * content is replaced with this mock module.  This avoids returning virtual
 * module IDs from `resolveId`, which prevents cross-environment cache
 * contamination from third-party resolver plugins.
 *
 * The generated code is side-effect-free and tree-shakeable.
 */
export declare function generateSelfContainedMockModule(exportNames: Array<string>): {
    code: string;
};
/**
 * Generate a dev-mode mock module for self-denial transforms.
 *
 * Similar to `loadMockEdgeModule` but takes export names and a runtime ID
 * directly (instead of parsing them from a base64url-encoded payload).
 * Used by the transform hook when a denied file (e.g. `.server.ts` in
 * the client environment) is replaced in dev mode.
 *
 * The generated module imports mock-runtime for runtime diagnostics
 * (error/warn on property access) and re-exports explicit named exports
 * so that `import { foo } from './denied.server'` works.
 */
export declare function generateDevSelfDenialModule(exportNames: Array<string>, runtimeId: string): {
    code: string;
};
export declare function loadMockEdgeModule(encodedPayload: string): {
    code: string;
};
export declare function loadMockRuntimeModule(encodedPayload: string): {
    code: string;
};
export declare function loadMarkerModule(): {
    code: string;
};
export declare function loadResolvedVirtualModule(id: string): {
    code: string;
} | undefined;
export {};
