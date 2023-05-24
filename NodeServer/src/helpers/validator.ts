interface ValidationErrors {
    key: string, message: string
}

interface ErrorResponse {
    statusCode: number,
    message: string,
    details: {
        errorDetails: ValidationErrors[]
    }
}

class CustomClientError extends Error {
    public errorResponse: ErrorResponse;

    constructor(errorDetails: ValidationErrors[], statusCode: number) {
        super("CustomClientError has occured");
            this.errorResponse = {
                statusCode,
                message: this.message,
                details: {
                    errorDetails,

                }
            }
    }
}



export {
    ValidationErrors, ErrorResponse, CustomClientError
}