import fs from 'fs';
import fetch from 'cross-fetch';
import { FunctionInfo } from './interfaces/functionInfo';
import { getFunctions } from './parsers/functionParser';
import { PropertyInfo } from './interfaces/propertyInfo';
import { ClassInfo } from './interfaces/classInfo';

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

    /**
     * Returns all functions and function information exported with... `export function`.
     * Does not have support for fat arrow exports.
     *
     * @return {Array<FunctionInfo>}
     * @memberof TypeDefExporter
     */
    getFunctions(): Array<FunctionInfo> {
        return getFunctions(this.contents);
    }

    /**
     * Returns all consts that are not functions.
     *
     * @return {Array<PropertyInfo>}
     * @memberof TypeDefExporter
     */
    getProperties(): Array<PropertyInfo> {
        throw new Error('getProperties - Not Currently Implemented');
    }

    /**
     * Returns all enums
     *
     * @return {Array<unknown>}
     * @memberof TypeDefExporter
     */
    getEnums(): Array<unknown> {
        throw new Error('getEnums - Not Currently Implemented');
    }

    /**
     * Returns all classes and their functions, properties, constructors, etc.
     *
     * @return {Array<ClassInfo>}
     * @memberof TypeDefExporter
     */
    getClasses(): Array<ClassInfo> {
        throw new Error('getClasses - Not Currently Implemented');
    }
}
