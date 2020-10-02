import { Rule } from './rule';
import { Str } from '@rheas/support/str';
import { StringObject } from '@rheas/contracts';

export class RuleError {
    private static readonly default_messages: StringObject = {
        accepted: 'The :attribute must be accepted.',
        active_url: 'The :attribute is not a valid URL.',
        after: 'The :attribute must be a date after :date.',
        after_or_equal: 'The :attribute must be a date after or equal to :date.',
        alpha: 'The :attribute may only contain letters.',
        alpha_dash: 'The :attribute may only contain letters, numbers, dashes and underscores.',
        alpha_num: 'The :attribute may only contain letters and numbers.',
        array: 'The :attribute must be an array.',
        before: 'The :attribute must be a date before :date.',
        before_or_equal: 'The :attribute must be a date before or equal to :date.',
        between: 'The :attribute must be between :min and :max.',
        boolean: 'The :attribute field must be true or false.',
        confirm: 'The :attribute confirmation does not match.',
        date: 'The :attribute is not a valid date.',
        date_equals: 'The :attribute must be a date equal to :date.',
        date_format: 'The :attribute does not match the format :format.',
        different: 'The :attribute and :other must be different.',
        digits: 'The :attribute must be :digits digits.',
        digits_between: 'The :attribute must be between :min and :max digits.',
        dimensions: 'The :attribute has invalid image dimensions.',
        distinct: 'The :attribute field has a duplicate value.',
        email: 'The :attribute must be a valid email address.',
        exists: 'The selected :attribute is invalid.',
        file: 'The :attribute must be a file.',
        filled: 'The :attribute field must have a value.',
        image: 'The :attribute must be an image.',
        in: 'The selected :attribute is invalid.',
        in_array: 'The :attribute field does not exist in :other.',
        integer: 'The :attribute must be an integer.',
        ip: 'The :attribute must be a valid IP address.',
        ipv4: 'The :attribute must be a valid IPv4 address.',
        ipv6: 'The :attribute must be a valid IPv6 address.',
        json: 'The :attribute must be a valid JSON string.',
        max: 'The :attribute may not be greater than :max.',
        mimes: 'The :attribute must be a file of type: :values.',
        mimetypes: 'The :attribute must be a file of type: :values.',
        min: 'The :attribute field must have at least :min characters.',
        not_in: 'The selected :attribute is invalid.',
        not_regex: 'The :attribute format is invalid.',
        numeric: 'The :attribute must be a number.',
        present: 'The :attribute field must be present.',
        regex: 'The :attribute format is invalid.',
        required: 'The :attribute field is required.',
        required_if: 'The :attribute field is required when :other is :value.',
        required_unless: 'The :attribute field is required unless :other is in :values.',
        required_with: 'The :attribute field is required when :values is present.',
        required_with_all: 'The :attribute field is required when :values are present.',
        required_without: 'The :attribute field is required when :values is not present.',
        required_without_all: 'The :attribute field is required when none of :values are present.',
        same: 'The :attribute and :other must match.',
        size: 'The :attribute must be :size.',
        starts_with: 'The :attribute must start with one of the following: :values',
        string: 'The :attribute must be a string.',
        timezone: 'The :attribute must be a valid zone.',
        unique: 'The :attribute has already been taken.',
        uploaded: 'The :attribute failed to upload.',
        url: 'The :attribute format is invalid.',
        uuid: 'The :attribute must be a valid UUID.',
    };
    /**
     * The custom Rule object or string.
     *
     * @var
     */
    private rule: string | Rule;

    /**
     * The parameters submitted along with the rule.
     *
     * @var array
     */
    private params: string[];

    constructor(rule: string | Rule, ...params: string[]) {
        this.rule = rule;
        this.params = params;
    }

    /**
     * Parse the error message for this rule.
     *
     * @param field
     * @param alias
     * @param custom_messages
     */
    public getErrorMessage(
        field: string,
        alias: string = '',
        custom_messages: StringObject = {},
    ): string {
        let error_message = '';

        if (this.rule instanceof Rule) {
            // A rule can be given a name and custom messages can be
            // given for even these rules. Custom messages for custom
            // Rule should have a key similar to "custom_rule_name".
            // ie "custom_" + Str.snake(ruleName)
            const rule_name = Str.snake('custom' + this.rule.getName());
            error_message = custom_messages[rule_name] || this.rule.getErrorMessage();
        }
        // string rule should check the custom message or
        // use the default message.
        else {
            error_message = custom_messages[this.rule] || RuleError.default_messages[this.rule];
        }

        error_message = this.replaceAttributePlaceholder(error_message, field, alias);

        error_message = this.replaceParams(error_message);

        return error_message;
    }

    /**
     * Replaces the :attribute with the alias or field name
     *
     * @param field
     * @param alias
     */
    private replaceAttributePlaceholder(message: string, field: string, alias: string) {
        let attribute_name = null != alias && '' !== alias ? alias : field;

        return message.replace(/:attribute/giu, attribute_name);
    }

    /**
     * Replace the params in the message. Params are replaced in the
     * order as they appear.
     *
     * @param message
     */
    private replaceParams(message: string): string {
        for (let param of this.params) {
            message = message.replace(/(:\w+)/u, param);
        }
        return message;
    }
}
