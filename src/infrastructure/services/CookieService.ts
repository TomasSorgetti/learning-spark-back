import { Response } from "express";

export class CookieService {
  constructor() {}

  public createCookie(
    res: Response,
    name: string,
    value: string,
    options?: any
  ): void {
    const defaultOptions = {
      httpOnly: true,
      secure: true,
      maxAge: 60 * 24 * 60 * 60 * 1000, // 60 days
      sameSite: "Lax", // Strict for https
      path: "/",
    };

    const finalOptions = { ...defaultOptions, ...options };

    res.cookie(name, value, finalOptions);
  }

  public removeCookie(res: Response, name: string): void {
    res.clearCookie(name, { path: "/" });
  }
}
