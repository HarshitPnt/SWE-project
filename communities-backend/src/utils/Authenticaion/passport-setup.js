import passport from "passport";
import GoogleStrategy from "passport-google-oauth20";

const passportSetup = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_SECRET_KEY,
        callbackURL: process.env.GOOGLE_REDIRECT_URL,
        scope: ["profile", "email"],
      },
      (accessToken, refreshToken, profile, done) => {
        console.log("passport callback function fired");
        done(null, profile);
      }
    )
  );
};

export default passportSetup;
