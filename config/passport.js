

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
//Require your User Model here!
const UserModel=require('../models/user')

// configuring Passport!
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK
  },
  async function(accessToken, refreshToken, profile, cb) {
    // a user has logged in via OAuth!
    // refer to the lesson plan from earlier today in order to set this up
    console.log(profile)
	  // cb function signature below
	  // cb(error, dataYouWantToGiveToPassport)		
	  // if there is an error just pass the error as the first argument
	  // cb(err)
	  // if no error pass in null then the data you want to give to passport
	  // cb(null, dataYouWantToPassToPassportGoesHere)

      // a user has logged in with OAuth...

      // IMPLEMENT THIS LOGIC!

      // Check if the user has logged in before in our app,
      // Search our User's collection in mongodb and see if any user has the google id
      // which value is called profile.id
      let user = await UserModel.findOne({ googleId: profile.id });
      // UserModelFindOne, will either return the userDocument that contatins
      // that googleId or it will return undefined!
	
      // if we have the user pass the users information to passport middleware
      if (user) return cb(null, user);//cb(null, user); the next function is serializeUser to put the id of the user
	  // in the cookie	
		


	  /// WE DON"T HAVE A USER THIS CODE RUNS!
   
      // otherwise if user undefined, Create that User in our database
      // becuase its the first time loggin in to our app!
      try {
        user = await UserModel.create({
          name: profile.displayName,
          googleId: profile.id,
          email: profile.emails[0].value, // array of objects from google
          avatar: profile.photos[0].value, // array of objects from google
        });

        // once we create the user, pass that user document to passport
        return cb(null, user);
	//	cb(null, user); the next function is serializeUser to put the id of the user
	// in the cookie	
      } catch (err) {
        cb(err);
      }

  }
));

passport.serializeUser(function(user, cb) {
   cb(null, user._id);
});

passport.deserializeUser(async function (userId, cb) {
  // Find your User, using your model, and then call cb(err, whateverYourUserIsCalled)
  // When you call this done function passport assigns the user document to req.user, which will
  // be availible in every Single controller function, so you always know the logged in user

  try {
    const userDoc = await UserModel.findById(userId);
    // This line of code below
    cb(null, userDoc); // <------- This is setting the user document to req.user = userDoc passes it
    // to one of the controller functions!
  } catch (err) {
    cb(err);
  }
});



