type UsagePos = {
    line: number;
    column0: number;
};
/**
 * Given transformed code, returns the first "meaningful" usage position for an
 * import from `source` that survives compilation.
 *
 * "Preferred" positions (call, new, member-access) take priority over bare
 * identifier references. The returned column is 0-based (Babel loc semantics).
 */
export declare function findPostCompileUsagePos(code: string, source: string): UsagePos | undefined;
export {};
