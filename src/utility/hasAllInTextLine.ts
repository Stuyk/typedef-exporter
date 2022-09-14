/**
 * Check if a line has all search criteria.
 *
 * @export
 * @param {string} line
 * @param {Array<string>} whatToCheckFor
 * @return {boolean}
 */
export function hasAllInTextLine(line: string, whatToCheckFor: Array<string>): boolean {
    for (const textToFind of whatToCheckFor) {
        if (!line.includes(textToFind)) {
            return false;
        }
    }

    return true;
}
