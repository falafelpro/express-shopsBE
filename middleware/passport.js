const LocalStrategy = require("passport-local").Strategy;
const User = require("../db/models/User");
const bcrypt = require("bcrypt");
const jwtStrategy = require("passport-jwt").Strategy;
const { fromAuthHeaderAsBearerToken } = require("passport-jwt").ExtractJwt;
const { JWT_SECRET } = require("../config/key");

exports.localStrategy = new LocalStrategy(async (username, password, done) => {
  try {
    const user = await User.findOne({ username: username });

    const passwordsMatch = user
      ? bcrypt.compare(password, user.password)
      : false;
    // double check this logic
    //return passwordsMatch ? done(null, user) : done(null, false);
    if (passwordsMatch) {
      return done(null, user);
    }
    return done(null, false);
  } catch (error) {
    done(error);
  }
});

exports.jwtStrategy = new jwtStrategy(
  {
    jwtFromRequest: fromAuthHeaderAsBearerToken,
    secretOrKey: JWT_SECRET,
  },
  async (payload, done) => {
    if (Date.now() > payload.exp) return done(null, false);
    try {
      const user = await User.findById(payload._id);
      return done(null, user);
    } catch (error) {
      done(error);
    }
  }
);
