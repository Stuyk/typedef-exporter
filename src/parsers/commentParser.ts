import { CommentInfo } from '../interfaces/commentInfo';

/**
 * Extracts comment information from a JSDoc Comment Block
 * Automatically categorizes it based on some `@` parameters.
 *
 * @export
 * @param {Array<string>} comments
 * @return {*}
 */
export function commentParser(comments: Array<string>) {
    // Remove first line
    comments.shift();

    // Remove last line
    comments.pop();
    comments = comments.filter((x) => x !== '\r\n');

    const commentInfo: CommentInfo = {
        descriptions: [],
        params: [],
    };

    // Loop through comment block and pull out rest.
    for (let cc = comments.length - 1; cc >= 0; cc--) {
        // Remove all additional front-facing white space
        comments[cc] = comments[cc].replace(/.*(?:\*){1}/gm, '');
        comments[cc] = comments[cc].slice(1, comments[cc].length);
        if (comments[cc].length <= 2) {
            continue;
        }

        // Parse as description
        if (!comments[cc].includes('@')) {
            commentInfo.descriptions.push(comments[cc]);
            continue;
        }

        if (comments[cc].includes('@remarks')) {
            if (comments[cc].includes('@remarks ')) {
                commentInfo.descriptions.push(comments[cc].replace('@remarks ', ''));
                continue;
            }

            commentInfo.descriptions.push(comments[cc].replace('@remarks', ''));
            continue;
        }

        if (comments[cc].includes('@param')) {
            if (comments[cc].includes('@param ')) {
                commentInfo.params.push(comments[cc].replace('@param ', ''));
                continue;
            }

            commentInfo.params.push(comments[cc].replace('@param', ''));
        }

        if (comments[cc].includes('@deprecated')) {
            commentInfo.isDeprecated = true;
        }
    }

    return commentInfo;
}
