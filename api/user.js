var randomstring = require("randomstring");
var sha256 = require("sha256");

module.exports = (app, db) => {
  app.use( "/user*", async (req, res, next) => {
    
    var auth = await db.AuthToken.findOne({
      where:{
        token: req.headers.authorization || ""
      }
    })

    if(auth != null){
       next()
    }else{
      res.status(400).json({
            error: `invalid access token'`
      })
      return
    }
  });


  app.get( "/user", (req, res) =>
    db.User.findAll().then( (result) => res.json(result) )
  );

  app.get( "/user/:id", (req, res) =>
    db.User.findByPk(req.params.id).then( (result) => res.json(result))
  );

  // app.post("/user", async (req, res) => {
    
  //   var salt = randomstring.generate({
  //     length: 12,
  //     charset: 'alphabetic'
  //   });

  //   var encryptPassword = sha256(`${req.body.password}${salt}`)


  //   var user = await  db.User.create({
  //     name: req.body.name,
  //     email: req.body.email,
  //     password: encryptPassword,
  //     salt: salt
  //   })

  //   res.json(user)

  // });

  // app.put( "/user/:id", (req, res) =>
  //   db.User.update({
  //     name: req.body.name,
  //     email: req.body.email
  //   },
  //   {
  //     where: {
  //       id: req.params.id
  //     }
  //   }).then( (result) => res.json(result) )
  // );

  // app.delete( "/user/:id", (req, res) =>
  //   db.User.destroy({
  //     where: {
  //       id: req.params.id
  //     }
  //   }).then( (result) => res.json(result) )
  // );
}