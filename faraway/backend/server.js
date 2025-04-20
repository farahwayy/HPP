const express = require('express')
const app = express();
const cors = require('cors');
require('dotenv').config();
const jwt = require('jsonwebtoken')
const passport = require('passport')
const { Strategy: GoogleStrategy } = require('passport-google-oauth20');


const port = process.env.PORT || 7000

app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: false, 
  }));

app.use(cors());


passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `http://localhost:${port}/login/callback`
  },
  function(accessToken, refreshToken, profile, cb) {
        const user ={ 
            id: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
        }

        const token = jwt.sign(user, process.env.JWT_SECRET, {expiresIn: '1h'});

        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        })

      return cb(null, {user, token});
  }
));

app.get('/verify', (req,res) => {
    console.log("called");
    const authHeader = req.headers['authorization']


    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ valid: false, message: 'No token provided' });
      }

    const token = authHeader.split(' ')[1];


    jwt.verify(token, process.env.JWT_SECRET, (err,decoded) => {
        if(err){
            return res.status(401).json({ valid: false, message: 'Invalid token' });
        }

        console.log('foipkdsaok ', decoded);
        return res.json({valid:true, user: decoded})
    })
})

app.get('/login/google', passport.authenticate('google' , {scope: ['profile', 'email'], 
    prompt:'consent',
    accessType:'offline'
}));

app.get('/login/callback', passport.authenticate('google', {session: false, failureRedirect:'/'}),
        (req,res) => {
            const {token, user} = req.user;
            res.redirect(`http://localhost:5173/login?token=${token}`);
        }
)

app.listen(port, () => {
    console.log(`Listening to port: ${port}`);
})