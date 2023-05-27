class ApiError extends Error {
  constructor(data) {
    super(data.message);
    this.errorResponse = { ...data };
  }
}

export default ApiError;
