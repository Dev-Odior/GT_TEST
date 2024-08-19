class CustomError extends Error {
  public _message: string;

  private _code:number
  private _errors: unknown[];

  constructor(message: string, _code: number) {
    super(message);

    this._message = message || 'An error occurred';
    this._code = _code;
    this._errors = this._errors || [];

    Object.setPrototypeOf(this, CustomError.prototype);
  }

  get errors():unknown[] | undefined {
    return this._errors;
  }

  get code() {
    return this._code;
  }
}

export default CustomError;
