export const STATUS_CODES = {
  OK: 200,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_ERROR: 500,
};

export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;
  public readonly errorStack?: string;

  constructor(
    name: string,
    statusCode: number,
    description: string,
    isOperational: boolean = true,
    errorStack?: string
  ) {
    super(description);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = name;
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.errorStack = errorStack;
    Error.captureStackTrace(this);
  }
}

export class APIError extends AppError {
  constructor(
    description: string = "Internal Server Error",
    statusCode: number = STATUS_CODES.INTERNAL_ERROR
  ) {
    super("API_ERROR", statusCode, description);
  }
}

export class BadRequestError extends AppError {
  constructor(description: string = "Bad request") {
    super("BAD_REQUEST", STATUS_CODES.BAD_REQUEST, description);
  }
}

export class ValidationError extends AppError {
  constructor(description: string = "Validation error", errorStack?: string) {
    super(
      "VALIDATION_ERROR",
      STATUS_CODES.BAD_REQUEST,
      description,
      true,
      errorStack
    );
  }
}
