import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { IAuthProvider } from "../../application/types/IAuthProvider";
import { googleAuthConfig } from "../config";

export class GoogleAuthService implements IAuthProvider {
  constructor() {
    this.initializeGoogleStrategy();
  }

  private initializeGoogleStrategy() {
    passport.use(
      new GoogleStrategy(
        {
          clientID: googleAuthConfig.GOOGLE_CLIENT_ID,
          clientSecret: googleAuthConfig.GOOGLE_CLIENT_SECRET,
          callbackURL: googleAuthConfig.CALLBACK_URL,
        },
        (accessToken, refreshToken, profile, done) => {
          const user = {
            id: profile.id,
            email: profile.emails?.[0].value,
            name: profile.displayName,
            picture: profile.photos?.[0].value,
          };
          return done(null, user);
        }
      )
    );
  }
  async authenticate(): Promise<any> {
    throw new Error(
      "Use Express routes with Passport for Google authentication"
    );
  }
}

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user: any, done) => {
  done(null, user);
});
