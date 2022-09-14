/**
 * Gets all arguments from a given function.
 *
 * @param {string} line
 * @return {Array<{ key: string, value: string }>}
 */
export function getArguments(line: string): Array<{ key: string; value: string }> {
    let newLine = line.replace(/:.(?:(?:\(\(.*)|{.*}|<.*>|[a-zA-Z]+);/gm, ''); // Remove Back - Removes Return
    newLine = newLine.replace(/^.*?(?=\()/gm, ''); // Remove Front
    newLine = newLine.slice(1, newLine.length - 1); // Remove Parenthesis

    // Remove no argument functions...
    if (newLine === '') {
        return [];
    }

    let argsReversed = [];
    let startPos = newLine.length;
    let isFindingComma = false;
    let isGoingThroughCallback = false;

    for (let i = newLine.length - 1; i >= 0; i--) {
        const letter = newLine[i];
        if (i === 0) {
            const extract = newLine.slice(0, startPos);
            argsReversed.push(extract);
            continue;
        }

        if (isGoingThroughCallback) {
            if (letter !== '(' && letter !== '<') {
                continue;
            }

            if (newLine[i + 1] === '(' && letter === '(') {
                continue;
            }

            isGoingThroughCallback = false;
            continue;
        }

        if (letter === '>') {
            isGoingThroughCallback = true;
            continue;
        }

        if (letter === ':' && newLine[i - 1] !== ')' && !isFindingComma) {
            isFindingComma = true;
            continue;
        }

        if (!isFindingComma) {
            continue;
        }

        if (letter !== ',') {
            continue;
        }

        const extract = newLine.slice(i, startPos);
        startPos = i;
        argsReversed.push(extract.replace(', ', ''));
        isFindingComma = false;
    }

    const results = argsReversed.reverse().map((argument: string) => {
        const arrayOfKeys = argument.match(/^.*?(?::)/gm) || '';
        let key = arrayOfKeys[0];
        let value = argument.replace(key, '');

        // Removes 1 extra space.
        value = value.slice(1, value.length);

        // Removes the ':' from the function.
        key = key.replace(':', '');

        return { key, value };
    });

    return results;
}
