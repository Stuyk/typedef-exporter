/**
 * Returns a function return type.
 *
 * @param {string} functionOrPropertyLine
 * @return {string | 'self' | 'void' | undefined}
 */
export function getFunctionReturn(functionOrPropertyLine: string): string | 'self' | 'void' | undefined {
    if (functionOrPropertyLine.includes('constructor')) {
        return 'self';
    }

    if (functionOrPropertyLine.includes(');')) {
        return 'void';
    }

    let startPos = functionOrPropertyLine.length;
    let isGoingThroughCallback = false;
    for (let i = functionOrPropertyLine.length - 1; i >= 0; i--) {
        const letter = functionOrPropertyLine[i];
        if (isGoingThroughCallback) {
            if (letter !== '(' && letter !== '<') {
                continue;
            }

            isGoingThroughCallback = false;
            continue;
        }

        if (letter === '>') {
            isGoingThroughCallback = true;
            continue;
        }

        if (letter !== ':') {
            continue;
        }

        return functionOrPropertyLine
            .slice(i + 1, startPos)
            .replace(' ', '')
            .replace(';', '');
    }

    return undefined;
}
