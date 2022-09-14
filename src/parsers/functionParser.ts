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

            // Means it ends now...
            if (isFindingComment && line.includes('/**')) {
                isFindingComment = false;

                if (currentComments.length <= 1) {
                    functions[functions.length - 1].comments = currentComments.join('\r\n');
                    continue;
                }

                const commentInfo = commentParser(currentComments);
                for (let paramIndex = 0; paramIndex < commentInfo.params.length; paramIndex++) {
                    if (functions[functions.length - 1].arguments[paramIndex]) {
                        functions[functions.length - 1].arguments[paramIndex].comment = commentInfo.params[paramIndex];
                    }
                }

                functions[functions.length - 1].comments = commentInfo.descriptions.join('\r\n');
                if (commentInfo.isDeprecated) {
                    functions[functions.length - 1].isDeprecated = true;
                }

                currentComments = [];
            }

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
