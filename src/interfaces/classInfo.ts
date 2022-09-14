import { FunctionInfo } from './functionInfo';
import { PropertyInfo } from './propertyInfo';

export interface ClassInfo {
    /**
     * The name of this class.
     *
     * @type {string}
     * @memberof ClassInfo
     */
    name: string;

    /**
     * Constructor information for this class.
     *
     * @type {FunctionInfo}
     * @memberof ClassInfo
     */
    constructor: FunctionInfo;

    /**
     * An array of properties that belong to this class.
     *
     * @type {Array<PropertyInfo>}
     * @memberof ClassInfo
     */
    properties: Array<PropertyInfo>;

    /**
     * An array of functions that belong to this class.
     *
     * @type {Array<FunctionInfo>}
     * @memberof ClassInfo
     */
    functions: Array<FunctionInfo>;
}
