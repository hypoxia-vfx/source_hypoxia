import { Loc } from './trace.js';
/**
 * Minimal source-map shape used throughout the import-protection plugin.
 */
export interface SourceMapLike {
    file?: string;
    sourceRoot?: string;
    version: number | string;
    sources: Array<string>;
    names: Array<string>;
    sourcesContent?: Array<string | null>;
    mappings: string;
}
export interface TransformResult {
    code: string;
    map: SourceMapLike | undefined;
    originalCode: string | undefined;
    /** Precomputed line index for `code` (index → line/col). */
    lineIndex?: LineIndex;
}
/**
 * Provides the transformed code and composed sourcemap for a module.
 *
 * Populated from a late-running transform hook. By the time `resolveId`
 * fires for an import, the importer has already been fully transformed.
 */
export interface TransformResultProvider {
    getTransformResult: (id: string) => TransformResult | undefined;
}
export type LineIndex = {
    offsets: Array<number>;
};
export declare function buildLineIndex(code: string): LineIndex;
/**
 * Pick the most-likely original source text for `importerFile` from
 * a sourcemap that may contain multiple sources.
 */
export declare function pickOriginalCodeFromSourcesContent(map: SourceMapLike | undefined, importerFile: string, root: string): string | undefined;
export type ImportLocEntry = {
    file?: string;
    line: number;
    column: number;
};
/**
 * Cache for import statement locations with reverse index for O(1)
 * invalidation by file.  Keys: `${importerFile}::${source}`.
 */
export declare class ImportLocCache {
    private cache;
    private reverseIndex;
    has(key: string): boolean;
    get(key: string): ImportLocEntry | null | undefined;
    set(key: string, value: ImportLocEntry | null): void;
    clear(): void;
    /** Remove all cache entries where the importer matches `file`. */
    deleteByFile(file: string): void;
}
export type FindImportSpecifierIndex = (code: string, source: string) => number;
/**
 * Find the location of an import statement in a transformed module
 * by searching the post-transform code and mapping back via sourcemap.
 * Results are cached in `importLocCache`.
 */
export declare function findImportStatementLocationFromTransformed(provider: TransformResultProvider, importerId: string, source: string, importLocCache: ImportLocCache, findImportSpecifierIndex: FindImportSpecifierIndex): Promise<Loc | undefined>;
/**
 * Find the first post-compile usage location for a denied import specifier.
 * Best-effort: searches transformed code for non-import uses of imported
 * bindings and maps back to original source via sourcemap.
 */
export declare function findPostCompileUsageLocation(provider: TransformResultProvider, importerId: string, source: string): Promise<Loc | undefined>;
/**
 * Annotate each trace hop with the location of the import that created the
 * edge (file:line:col). Skips steps that already have a location.
 */
export declare function addTraceImportLocations(provider: TransformResultProvider, trace: Array<{
    file: string;
    specifier?: string;
    line?: number;
    column?: number;
}>, importLocCache: ImportLocCache, findImportSpecifierIndex: FindImportSpecifierIndex): Promise<void>;
export interface CodeSnippet {
    /** Source lines with line numbers, e.g. `["  6 | import { getSecret } from './secret.server'", ...]` */
    lines: Array<string>;
    /** The highlighted line (1-indexed original line number) */
    highlightLine: number;
    /** Clickable file:line reference */
    location: string;
}
/**
 * Build a vitest-style code snippet showing lines surrounding a location.
 *
 * Prefers `originalCode` from the sourcemap's sourcesContent; falls back
 * to transformed code when unavailable.
 */
export declare function buildCodeSnippet(provider: TransformResultProvider, moduleId: string, loc: Loc, contextLines?: number): CodeSnippet | undefined;
