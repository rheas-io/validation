import { Exception } from "@laress/errors";
import { KeyValue } from "@laress/contracts";
import { IValidator } from "@laress/contracts/validators";

export class ValidationException extends Exception {

    /**
     * Validator class of this exception.
     * 
     * @var IValidator
     */
    private validator: IValidator;

    /**
     * Set the error message and HTTP status code to 422.
     * 
     * @param validator 
     */
    constructor(validator: IValidator) {
        super("Validation exception", 422);

        this.validator = validator;
    }

    /**
     * Returns the validator errors object. Error handler will
     * parse the errors to Json if required. Or the views can iterate
     * through the errors and display the error messages on view.
     * 
     * @return object
     */
    public getErrors(): KeyValue<string[]> {
        return this.validator.getErrors();
    }
}