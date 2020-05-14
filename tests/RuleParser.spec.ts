import { Rule } from "../src/Rule";
import { AnyObject } from "@laress/contracts";
import { RuleParser } from "../src/ruleParser";

// Test suite for checking the validation rule parser. Rules
// can be string or an array of mixed types. Each case is checked
// separately.
describe("Rule parser suit", () => {

    // Check exact string pattern for success. A plain valid
    // rule string pattern is checked for success.
    it("parse required|email", () => {
        let result = RuleParser.parse('required|email');
        let expected = [['required'], ['email']];

        expect(result).toEqual(expected);
    });

    // Checks wrong pattern for success ie Test wrong pattern
    // and see if the output eliminates all the empty rules
    // from the list and return only non-empty rules..
    it("parse |required| |email", () => {
        let result = RuleParser.parse('|required| |email|');
        let expected = [['required'], ['email']];

        expect(result).toEqual(expected);
    });

    // Test rules with arguments for success. Certain rules
    // can have additional parameters associated with them
    // These all should be parsed along with the rule name
    // in an array.
    //
    // The following test uses an invalid pattern with max_min:50,10
    // 50 and 10 are the parameters for the rule max_min. This rule
    // should be parsed as ["max_min","50","10"];
    it("parse |required| |email|max_min:50,10", () => {
        let result = RuleParser.parse('||required| |email|max_min:50,10');
        let expected = [['required'], ['email'], ["max_min", "50", "10"]];

        expect(result).toEqual(expected);
    });

    // Parse rules given as array. Array elements used are string
    // with parameters and without parameters. Check if the parsed
    // rules are exactly same as the one used as a plain string of
    // the same rule.
    it("parse array of required, email, max_min:50,10", () => {
        let result = RuleParser.parse(["required", "email", "", " ", "max_min:50,10"]);
        let expected = [['required'], ['email'], ["max_min", "50", "10"]];

        expect(result).toEqual(expected);
    });

    // Parse rules given as array. The following test tests the 
    // presence of a Rule instance in the list.
    it("parse array of |required| |email|max_min:50,10", () => {

        class TestClass extends Rule {

            public getErrorMessage(): string {
                return "";
            }
            public check(all_fields: AnyObject, field: string): boolean {
                return true;
            }
        }

        let rule = new TestClass();

        let result = RuleParser.parse(["required", "email", "", " ", "max_min:50,10", rule]);
        let expected = [['required'], ['email'], ["max_min", "50", "10"], [rule]];

        expect(result).toEqual(expected);
    });
});