import fs from 'fs';
import fetch from 'cross-fetch';
import { FunctionInfo } from './interfaces/functionInfo';
import { getFunctions } from './parsers/functionParser';

export class TypeDefExporter {
    private contents: string[];

    /**
     * Reads file contents, and creates a new instance with the file contents.
     *
     * @static
     * @param {string} urlOrPath
     * @return {Promise<TypeDefExporter>}
     * @memberof TypeDefExporter
     */
    static async load(urlOrPath: string): Promise<TypeDefExporter> {
        let fileContents: string;

        // Handle External Files
        if (urlOrPath.includes('http') || urlOrPath.includes('https')) {
            const fetchRequest = await fetch(urlOrPath);
            if (fetchRequest.status >= 400) {
                throw new Error(`File Contents of ${urlOrPath} could not be read.`);
            }

            fileContents = await fetchRequest.text();
        } else {
            if (!fs.existsSync(urlOrPath)) {
                throw new Error(`${urlOrPath} does not exist. Is this path valid?`);
            }

            fileContents = fs.readFileSync(urlOrPath, { encoding: 'utf-8' });
        }

        if (typeof fileContents === 'undefined') {
            throw new Error(`File Contents of ${urlOrPath} could not be read.`);
        }

        return new TypeDefExporter(fileContents);
    }

    /**
     * Creates an instance of TypeDefExporter.
     * Best when used in tandem with `process.cwd()` for
     *
     * @param {string} filePathOrURL
     * @memberof TypeDefExporter
     */
    constructor(contents: string) {
        this.contents = contents.split('\r\n');
    }

    /**
     * Simply returns the file contents that were read.
     *
     * @return {string}
     * @memberof TypeDefExporter
     */
    getContents(): string {
        return this.contents.join('\r\n');
    }

    getFunctions(): Array<FunctionInfo> {
        return getFunctions(this.contents);
    }
}
