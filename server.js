let express = require("express")
let bodyParser = require("body-parser")
let db = require("./models")
let apiAuth = require("./api/auth")
let apiUser = require("./api/user")
let cors = require("cors")


const app = express();
app.use(cors());
app.use(bodyParser.json());
// app.use(express.static("app/public"));


app.use(function(req, res, next){
   console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
   next();
});

apiAuth(app, db)
apiUser(app, db)


//The 404 Route (ALWAYS Keep this as the last route)
app.all('*', function (req, res) {
  res.status(404).json({
        error: `Not Found Method: ${req.method}, Route :'${req.url}'`
  });
});

// error-handling middleware functions
app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).json({
    error: "Internal Server Error" 
  });
})

process.env.SERVER_PORT = process.env.SERVER_PORT || 3000;

app.listen(process.env.SERVER_PORT, () => console.log(`App listening on port ${process.env.SERVER_PORT}!`));