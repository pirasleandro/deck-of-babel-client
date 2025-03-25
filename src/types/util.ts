/**
 * Unix timestamp.
 * @see {@linkcode Date.now()}
 */
export type Timestamp = number;

/**
 * Annotated integer ID.
 * Note: all IDs of this format should be unique, even among different annotated types.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type Id<_Annotation> = number;

/**
 * A color in hexadecimal format
 * @example
 * '#0077fe'
 */
export type HexColor = `#${string}`;

export interface Position {
    /** Normalized from 0 to 1 across the top of a board. */
    x: number;
    /** Proportional to x. */
    y: number;
  }