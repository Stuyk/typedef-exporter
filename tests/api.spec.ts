import 'mocha';
import { assert } from 'chai';
import { TypeDefExporter } from '../src';
import { joinPath } from '../src/utility/joinPath';

describe('api tests', () => {
    it('should read contents from local file', async () => {
        const exporter = await TypeDefExporter.load(joinPath(process.cwd(), 'examples', 'server.d.ts'));
        assert(typeof exporter !== 'undefined', 'could not create TypeDefExporter from local file');
        const contents = exporter.getContents();
        assert(contents.length >= 1, 'did not read file contents properly');
        assert(contents.includes('export function'), 'did not find any exports');
    });

    it('should read contents from an external file', async () => {
        const exporter = await TypeDefExporter.load(
            'https://raw.githubusercontent.com/Stuyk/altv-js-docs-parser/main/files/shared.d.ts'
        );
        assert(typeof exporter !== 'undefined', 'could not create TypeDefExporter from external file');
        const contents = exporter.getContents();
        assert(contents.length >= 1, 'did not read file contents properly');
        assert(contents.includes('export function'), 'did not find any exports');
    });

    it('should parse functions and return function information', async () => {
        const exporter = await TypeDefExporter.load(joinPath(process.cwd(), 'examples', 'server.d.ts'));
        const functions = exporter.getFunctions();
        assert(functions.length >= 1, 'Could not parse any function results from typedef');

        // Very specific function check
        assert(functions.findIndex((x) => x.name === 'once') !== -1, "Could not find function with name 'once'");

        let hasFoundAtLeastOneComment = false;
        let hasFoundDescriptionWithLongerLength = false;
        let hasFoundDeprecated = false;

        for (const funcRef of functions) {
            const keyIndex = funcRef.arguments.findIndex((x) => x.key.includes(':'));
            assert(keyIndex <= -1, `${funcRef.name} had an argument key with ':' defined.`);

            if (!hasFoundAtLeastOneComment) {
                const commentIndex = funcRef.arguments.findIndex((x) => typeof x.comment !== 'undefined');
                if (commentIndex >= 0) {
                    hasFoundAtLeastOneComment = true;
                }
            }

            if (!hasFoundDescriptionWithLongerLength) {
                const isLongEnough = funcRef.comments && funcRef.comments.length >= 25;
                if (isLongEnough) {
                    hasFoundDescriptionWithLongerLength = true;
                }
            }

            if (!hasFoundDeprecated) {
                if (funcRef.isDeprecated) {
                    hasFoundDeprecated = true;
                }
            }
        }

        assert(hasFoundAtLeastOneComment, `Could not find any comments inside of arguments.`);
        assert(hasFoundDescriptionWithLongerLength, `Could not find any descriptions extracted from comments`);
        assert(hasFoundDeprecated, `Could not find any example comments with a deprecated tag.`);

        console.log(JSON.stringify(functions, null, '\t'));
    });
});
