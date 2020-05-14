import { Exception } from "@rheas/errors";
import { KeyValue } from "@rheas/contracts";
import { IValidator } from "@rheas/contracts/validators";
export declare class ValidationException extends Exception {
    /**
     * Validator class of this exception.
     *
     * @var IValidator
     */
    private validator;
    /**
     * Set the error message and HTTP status code to 422.
     *
     * @param validator
     */
    constructor(validator: IValidator);
    /**
     * Returns the validator errors object. Error handler will
     * parse the errors to Json if required. Or the views can iterate
     * through the errors and display the error messages on view.
     *
     * @return object
     */
    getErrors(): KeyValue<string[]>;
}
