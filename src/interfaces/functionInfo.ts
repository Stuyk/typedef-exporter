export interface FunctionInfo {
    /**
     * Is this a function that should no longer be used?
     *
     * @type {boolean}
     * @memberof FunctionInfo
     */
    isDeprecated?: boolean;

    /**
     * The name of the string.
     *
     * @type {string}
     * @memberof FunctionInfo
     */
    name: string;

    /**
     * Arguments that belong to this function.
     *
     * @type {Array<{ key: string, value: string }>}
     * @memberof FunctionInfo
     */
    arguments: Array<{ key: string; value: string; comment?: string }>;

    /**
     * Comments that a function may or may not have.
     *
     * @type {string}
     * @memberof FunctionInfo
     */
    comments?: string;

    /**
     * The return type of this specific function.
     *
     * @type {string}
     * @memberof FunctionInfo
     */
    returnType: string;

    /**
     * Is this function exported?
     *
     * @type {boolean}
     * @memberof FunctionInfo
     */
    isExported?: boolean;
}
