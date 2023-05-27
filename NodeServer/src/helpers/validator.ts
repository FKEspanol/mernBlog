interface ValidationErrors {
  key: string;
  message: string;
}

interface ErrorResponse {
  type: string;
  statusCode: number;
  message: string;
  errorProps: ValidationErrors[];
}

class CustomClientError extends Error {
  public errorResponse: ErrorResponse;

  constructor(errorProps: ValidationErrors[], statusCode: number) {
    super("CustomClientError has occured");
    this.errorResponse = {
      type: "error",
      statusCode,
      message: this.message,
      errorProps,
    };
  }
}

export { ValidationErrors, ErrorResponse, CustomClientError };
