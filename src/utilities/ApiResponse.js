class ApiResponse {
  constructor(statusCode, data = "Success") {
    this.statusCode = statusCode;
    this.data = data;
    this.success = statusCode < 400;
  }
}

export { ApiResponse };
