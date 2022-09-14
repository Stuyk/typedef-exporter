export interface CommentInfo {
    /**
     * Parameters in the order of the arguments were obtained.
     *
     * @type {Array<string>}
     * @memberof CommentInfo
     */
    params: Array<string>;

    /**
     * Descriptions for this code block
     *
     * @type {Array<string>}
     * @memberof CommentInfo
     */
    descriptions: Array<string>;

    /**
     * Is this function deprecated?
     *
     * @type {boolean}
     * @memberof CommentInfo
     */
    isDeprecated?: boolean;
}
