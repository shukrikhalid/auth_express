var randomstring = require("randomstring");
var sha256 = require("sha256");

module.exports = (app, db) => {
  app.post( "/login", async (req, res) =>
  {

    if ( req.headers.authorization == undefined || req.headers.authorization == "" || !( /(?:Basic)\s([-0-9a-zA-z\.]){8,}/.test(req.headers.authorization) ) ){
      res.status(400).json({
        error: "invalid authorization" 
      });
      return
    }else {
      auth = req.headers.authorization.split(" ")
      // console.log("auth",auth)
      var buffDecodeAuth = new Buffer.from(auth[1], 'base64')
      var decodeAuth = buffDecodeAuth.toString('ascii')
      // console.log("decodeAuth", decodeAuth)
      var Email = decodeAuth.split(":")[0]
      var Password = decodeAuth.split(":")[1]
    }


    var user = await db.User.findOne({
      where:{
        email: Email
      }
    })

    if (user == null){
      res.status(400).json({
            error: `Email or Password is not exist`
      });
      return
    }


    var encryptPassword = sha256(`${Password}${user.salt}`)

    if(encryptPassword == user.password){
      
       authorizeUser = await user.authorize();
       console.log(authorizeUser)
       res.json(authorizeUser.authToken)  
       return
    }else{
      res.status(400).json({
            error: `invalid username or password'`
      })
      return
    }  
  });

  app.post( "/logout", async (req, res) =>
  {
    var auth = await db.AuthToken.findOne({
      where:{
        token: req.headers.authorization
      }
    })

    console.log(auth)
    if(auth != null){
      db.AuthToken.destroy({
        where: {
          token: req.params.id
        }
      })
    }

    res.json({status: "success"})
    return 
  })

  app.post("/signup", async (req, res) => {
    
    var salt = randomstring.generate({
      length: 12,
      charset: 'alphabetic'
    });

    var encryptPassword = sha256(`${req.body.password}${salt}`)


    var user = await  db.User.create({
      name: req.body.name,
      email: req.body.email,
      password: encryptPassword,
      salt: salt
    })

    res.json(user)

  });
}