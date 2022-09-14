export interface PropertyInfo {
    /**
     * Should no longer be used?
     *
     * @type {boolean}
     * @memberof FunctionInfo
     */
    isDeprecated?: boolean;

    /**
     * The name of the function or property.
     *
     * @type {string}
     * @memberof FunctionInfo
     */
    name: string;

    /**
     * Comments that a function or property may or may not have.
     *
     * @type {string}
     * @memberof FunctionInfo
     */
    comments?: string;

    /**
     * The return type of this specific function or property.
     *
     * @type {string}
     * @memberof FunctionInfo
     */
    returnType: string;

    /**
     * Is this function or property exported / public?
     *
     * @type {boolean}
     * @memberof FunctionInfo
     */
    isExported?: boolean;
}
