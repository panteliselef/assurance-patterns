/**
 * Custom error class for representing Clerk runtime errors.
 *
 * @class AsssuranceError
 * @example
 *   throw new AsssuranceError('An error occurred', { code: 'password_invalid' });
 */
export class AsssuranceError extends Error {
  assuranceError: true;

  /**
   * The error message.
   *
   * @type {string}
   * @memberof ClerkRuntimeError
   */
  message: string;

  /**
   * A unique code identifying the error, can be used for localization.
   *
   * @type {string}
   * @memberof ClerkRuntimeError
   */
  code: string;

  constructor(message: string, { code }: { code: string }) {
    super(message);

    Object.setPrototypeOf(this, AsssuranceError.prototype);

    this.code = code;
    this.message = message;
    this.assuranceError = true;
  }

  /**
   * Returns a string representation of the error.
   *
   * @returns {string} A formatted string with the error name and message.
   * @memberof ClerkRuntimeError
   */
  public toString = () => {
    return `[${this.name}]\nMessage:${this.message}`;
  };
}
