import { FunctionInfo } from '../interfaces/functionInfo';
import { hasAllInTextLine } from '../utility/hasAllInTextLine';
import { getArguments } from './argsParser';
import { getFunctionReturn } from './returnParser';
import { commentParser } from './commentParser';

const whatToFind = ['function', '(', ')', ';'];

export function getFunctions(contents: string[]): Array<FunctionInfo> {
    const functions: Array<FunctionInfo> = [];

    let isFindingComment = false;
    let currentComments = [];
    for (let i = contents.length - 1; i >= 0; i--) {
        const line = contents[i];

        if (isFindingComment && !line.includes('*')) {
            isFindingComment = false;
            currentComments = [];
            continue;
        }

        if (isFindingComment && line.includes('*')) {
            currentComments.push(line);

            // There are more things to process.
            if (!line.includes('/**')) {
                continue;
            }

            // There is nothing left to process.
            isFindingComment = false;

            if (currentComments.length <= 1) {
                functions[functions.length - 1].comments = currentComments.join('\r\n');
                continue;
            }

            // Hard to read this; but basicaly...
            // Read the function params from JSDoc styling
            // Loop through the params, and replace the 'key' if it is present in the string.
            // Once the 'key' is removed. It should be safe to append the comment to the function args.
            const commentInfo = commentParser(currentComments);
            for (let paramIndex = 0; paramIndex < commentInfo.params.length; paramIndex++) {
                if (functions[functions.length - 1].arguments[paramIndex]) {
                    const key = functions[functions.length - 1].arguments[paramIndex].key;
                    const keyLength = key.replace('...', '').length + 1;
                    const currentComment = commentInfo.params[paramIndex];
                    const cleanedComment = currentComment.slice(keyLength, currentComment.length);
                    functions[functions.length - 1].arguments[paramIndex].comment = cleanedComment;
                }
            }

            functions[functions.length - 1].comments = commentInfo.descriptions.join('\r\n');
            if (commentInfo.isDeprecated) {
                functions[functions.length - 1].isDeprecated = true;
            }

            currentComments = [];
            continue;
        }

        if (!hasAllInTextLine(line, whatToFind)) {
            continue;
        }

        // Removes empty spaces, and otehr garbage.
        const splitLines = line.split(' ').filter((x) => x.length >= 1);
        let name: string;
        let isExported = false;

        if (splitLines.includes('export')) {
            isExported = true;
            name = /.+?(?=(\(|<|:))/.exec(splitLines[2])[0];
        } else {
            name = /.+?(?=(\(|<|:))/.exec(splitLines[1])[0];
        }

        functions.push({ name, arguments: getArguments(line), isExported, returnType: getFunctionReturn(line) });
        isFindingComment = true;
    }

    return functions;
}
