const { Strategy, ExtractJwt } = require('passport-jwt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();


const opts = {  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};



module.exports = async (passport) => {
   
  passport.use(
  //jwt_payload : decoded token (user content)
    new Strategy(opts, async (jwt_payload, done) => {

        const user =  await prisma.user.findUnique(
            {
                where : {
                    id : jwt_payload.id
                }
            }
        )
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    })
  );
};