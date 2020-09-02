import { Rule } from './Rule';

export class RuleParser {
    /**
     * Parse the given string of rules or array of rules
     * to a standard array format.
     *
     * @param rules Rule to be parsed.
     */
    public static parse(rules: string | any[]) {
        if (typeof rules === 'string') {
            // Regex pattern used to split the string by the character |
            // Multiple | coming together are ignored from the string.
            // Example, "1, 2, , 3".split(/(?:,| )+/) outputs ["1", "2", "3"]
            rules = rules.split(/(?:\|)+/g);
        }

        // Filter out empty rules.
        rules = rules.filter(
            (value) => value instanceof Rule || (value != null && value.trim().length > 0),
        );

        rules = rules.map((rule) => {
            // If the rule is a string, parse it to check
            // for additional parameters.
            //
            // Rules can be of the form max_min:50,10. This
            // will be parsed into [max_min, 50, 10]
            if (typeof rule === 'string') {
                // Split the rule for characters ':' and ',' and trim
                // each element. Multiple : and , occuring next to each other
                // are ignored.
                rule = rule.split(/(?::|,)+/g).map((value) => value.trim());
            }
            return Array.isArray(rule) ? rule : [rule];
        });

        return rules;
    }
}
