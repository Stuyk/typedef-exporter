import { PropertyInfo } from './propertyInfo';

export interface FunctionInfo extends PropertyInfo {
    /**
     * Arguments that belong to this function.
     *
     * @type {Array<{ key: string, value: string }>}
     * @memberof FunctionInfo
     */
    arguments: Array<{ key: string; value: string; comment?: string }>;
}
