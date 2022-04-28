import passport from "passport";
import passportJwt from "passport-jwt";
import mongoose from "mongoose";
import dotenv from "dotenv";

const JwtStrategy = passportJwt.Strategy;
const { ExtractJwt } = passportJwt;
const User = mongoose.model("Users");

dotenv.config();

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.SECRET_OR_KEY,
    },
    (jwt_payload, done) => {
      User.findById(jwt_payload.id)
        .then((user) => {
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch((err) => console.log(err));
    }
  )
);
