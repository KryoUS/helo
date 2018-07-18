require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
// const session = require('express-session');
// const passport = require('passport');
const massive = require('massive');
// const Auth0Strategy = require('passport-auth0');
// const fc = require('./controllers/foodController');

const app = express();

app.use(bodyParser.json());
app.use(cors());

//Cors
// app.use(cors());

//Sessions
// app.use(session({
//     secret: process.env.secret,
//     resave: false,
//     saveUninitialized: true
// }));

//Passport
// app.use(passport.initialize());
// app.use(passport.session());

// //Massive
massive(process.env.CONNECTION_STRING).then(dbInstance => {
    app.set('db', dbInstance);
});

app.post('/login', (req, res, next) => {
    const { username, password } = req.body;

    let db = app.get('db');

    db.get_specific_user([username, password])
        .then(response => res.status(200).send(response))
        .catch(error => {
            console.log(error)
        })
})

app.post('/register', (req, res, next) => {
    const { username, password } = req.body;
    const pic = `https://robohash.org/${username}.png`;

    let db = app.get('db');

    db.user_check([username])
    .then(response => {
        console.log(response)
        if (response[0].id) {
            const alreadyExists = {exists: true}
            console.log('user already exists!')
            res.status(200).send(alreadyExists)
        } else {
            db.create_user([username, password, pic])
            .then(createRes => {
                console.log('user created')
                res.status(200).send(createRes)
            })
            .catch(error => {
                console.log(error)
            })
        }
    })
    .catch(error => {
        console.log(error)
    })

})

// //Auth0 Strategy
// passport.use(new Auth0Strategy({
//     domain: process.env.DOMAIN,
//     clientID: process.env.CLIENT_ID,
//     clientSecret: process.env.CLIENT_SECRET,
//     callbackURL: process.env.CALLBACKURL,
//     scope: 'openid profile email'
// }, function(accessToken, refreshToken, extraParams, profile, done) {
//     let db = app.get('db');

//     db.get_by_auth_id({auth_id: profile['user_id']}).then(user => {
//         if (user.length) {
//             return done(null, {id: user[0].id});
//         } else {
//             let { displayName: user_name, user_id: auth_id, emails } = profile;
//             let email = emails[0].value;

//             db.create_user({user_name, auth_id, email}).then(user => {
//                 return done(null, {id: user[0].id});
//             });
//         }
//     })
// }));

// app.get('/me', (req, res) => {
//     if (req.user) {
//         res.send({
//             name: req.user.user_name,
//             email: req.user.email
//         });
//     } else {
//         res.sendStatus(401);
//     }
// });

// //Auth Routes
// app.get('/auth', passport.authenticate('auth0'));

// app.get('/auth/callback', passport.authenticate('auth0', {
//     successRedirect: 'http://localhost:3000/#/profile',
//     failureRedirect: '/'
// }));

// app.get('/api/food', fc.getFoodies);
// app.post('/api/food', fc.postFood);

// //Example of creating a DB through the app
// // app.get('/db/create', (req, res, next) => {
// //     let db = req.app.get('db');

// //     db.create_user_table().then(res => {
// //         console.log(res);
// //     });
// // });

// passport.serializeUser((user, done) => {
//     done(null, {id: user.id});
// });

// passport.deserializeUser((user, done) => {
//     let db = app.get('db');

//     db.get_session_user({id: user.id}).then(user => {
//         return done(null, user[0]);
//     });
// });

app.listen(3005, () => {
    console.log('Listening on Port 3005.');
});