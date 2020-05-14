import { RuleError } from "../src/ruleError";

describe("Rule error suit", () => {

    let ruleError = new RuleError('email', 'email');

    it("Alias pass", () => {
        let message = ruleError.getErrorMessage('email', 'Email address');
    });

    it("Non alias pass", () => {

    });

    it("Custom message pass", () => {

    });

});