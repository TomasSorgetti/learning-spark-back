export const STATUS_CODES = {
  OK: 200,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT_ERROR: 409,
  GONE_ERROR: 410,
  INTERNAL_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
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

export class NotFoundError extends AppError {
  constructor(description: string = "Not found") {
    super("NOT_FOUND", STATUS_CODES.NOT_FOUND, description);
  }
}

export class GoneError extends AppError {
  constructor(description: string = "This resource is no longer available") {
    super("GONE_ERROR", STATUS_CODES.GONE_ERROR, description);
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

export class ConflictError extends AppError {
  constructor(description: string = "Conflict error", errorStack?: string) {
    super(
      "CONFLICT_ERROR",
      STATUS_CODES.CONFLICT_ERROR,
      description,
      true,
      errorStack
    );
  }
}

export class UnavailableError extends AppError {
  constructor(
    description: string = "Service unavailable",
    errorStack?: string
  ) {
    super(
      "SERVICE_UNAVAILABLE",
      STATUS_CODES.SERVICE_UNAVAILABLE,
      description,
      true,
      errorStack
    );
  }
}

export class UnauthorizedError extends AppError {
  constructor(description: string = "Unauthorized", errorStack?: string) {
    super(
      "UNAUTHORIZED",
      STATUS_CODES.UNAUTHORIZED,
      description,
      true,
      errorStack
    );
  }
}
