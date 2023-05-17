interface ValidationErrors {
    key: string, message: string
}

class CustomClientError extends Error {
    public errorList: ValidationErrors[];
    public type: string;
    public statusCode: number;

    constructor(errorList: ValidationErrors[], statusCode: number) {
        super("CustomClientError has occured");
            this.errorList = errorList;
            this.type = "CustomClientError"
            this.statusCode = statusCode
    }
}

export {
    ValidationErrors, CustomClientError
}