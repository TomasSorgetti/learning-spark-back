import rateLimit from "express-rate-limit";

export const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    message: "Too many requests, please try again later.",
  },
  headers: true,
});

// TODO => apply to reset password route
export const passwordLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: {
    message: "Too many requests, please try again later.",
  },
  headers: true,
});

export const loginLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 10,
  message: { message: "Too many login attempts, try again later." },
});

export const registerLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 3,
  message: { message: "Too many account creation attempts, please wait." },
});

export const changePasswordLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { message: "Too many password changes, please try again later." },
});

export const verifyCodeLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 5,
  message: { message: "Too many verification attempts, please try later." },
});

export const refreshTokenLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, 
  max: 10,
  message: { message: "Too many refresh token requests, slow down." },
});
