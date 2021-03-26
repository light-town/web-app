export default class ValidationError extends Error {
  constructor(message) {
    super(message);

    this.type = 'Validation Error';
    this.statusCode = 400;
  }
}
