import { Rule } from "./rule";
import { StringObject } from "@rheas/contracts";
export declare class RuleError {
    private static readonly default_messages;
    /**
     * The custom Rule object or string.
     *
     * @var
     */
    private rule;
    /**
     * The parameters submitted along with the rule.
     *
     * @var array
     */
    private params;
    constructor(rule: string | Rule, ...params: string[]);
    /**
     * Parse the error message for this rule.
     *
     * @param field
     * @param alias
     * @param custom_messages
     */
    getErrorMessage(field: string, alias?: string, custom_messages?: StringObject): string;
    /**
     * Replaces the :attribute with the alias or field name
     *
     * @param field
     * @param alias
     */
    private replaceAttributePlaceholder;
    /**
     * Replace the params in the message. Params are replaced in the
     * order as they appear.
     *
     * @param message
     */
    private replaceParams;
}
