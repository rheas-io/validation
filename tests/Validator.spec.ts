import { Validator } from "../../src/validators";

// A single field validation suit.
describe("Validator test suites", () => {

    // Test to see if an invalid rule submitted throws
    // exception. Laress have a predefined rules defined, if the
    // submitted rule does not match with any of these, then an 
    // exception must be thrown.
    it("Check unknown rule throws error", () => {
        let validator = new Validator({}, { test: "required|abcdefghi:10" });

        let errorValidator = () => {
            validator.passes();
        };

        expect(errorValidator).toThrow(Error);
    });

    // Check validation handlers are being executed and
    // errors are captured when validation fails.
    //
    // Test suit for validation fail scenario.
    it("Check validation errors", () => {
        let validator = new Validator({}, { test: "required" });
        expect(validator.fails()).toBe(true);

        let result = validator.getErrors();
        let expected = { test: ["The test field is required."] };

        expect(result).toEqual(expected);
    });

    // Test suit for validation pass scenario. No errors
    // should be return when the validation passes.
    it("Check validation passes", () => {
        let validator = new Validator({ test: "hello" }, { test: "required" });
        expect(validator.passes()).toBe(true);

        let result = validator.getErrors();
        let expected = {};

        expect(result).toEqual(expected);

    });

    // Test for checking the bail rule. This rule bails
    // the validation on failure of even one field rule. So
    // there will be only one error if validation fails.
    it("Check field bailing", () => {
        let validator = new Validator({ test: "" }, { test: "bail|required|min:10" });
        expect(validator.passes()).toBe(false);

        let result = validator.getErrors();
        let expected = { test: ["The test field is required."] };

        expect(result).toEqual(expected);

    });

    // Test for non bailable validation errors. Test if 
    // all the errors are being captured.
    it("Check field not bailing", () => {
        let validator = new Validator({ test: "" }, { test: "required|min:10" });
        expect(validator.passes()).toBe(false);

        let result = validator.getErrors();
        let expected = { test: ["The test field is required.", "The test field must have at least 10 characters."] };

        expect(result).toEqual(expected);
    });

});