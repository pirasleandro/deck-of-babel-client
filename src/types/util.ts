/**
 * Unix timestamp.
 * @see {@linkcode Date.now()}
 */
export type Timestamp = number;

/**
 * Annotated integer ID.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type Id<_Annotation> = number;

/**
 * A color in hexadecimal format
 * @example
 * '#0077fe'
 */
export type HexColor = `#${string}`;
