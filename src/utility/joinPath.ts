import path from 'path';

/**
 * Joins a file path together, and replaces `\` with `/`.
 *
 * @export
 * @param {...string[]} args
 * @return {string} 
 */
export function joinPath(...args: string[]): string {
    return path.join(...args).replace(/\\/gm, '/');
}