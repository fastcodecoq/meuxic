var Application, ApplicationSchema, app, express, gridfs, mongoose;

express = require("express");

gridfs = require("./gridfs");

mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/meuxic");

 var express = require("express");
  var app = express();


app = module.exports = express.createServer();

app.configure(function() {
  app.set("views", __dirname + "/views");
  app.set("view engine", "jade");
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express["static"](__dirname + "/public"));
  return app.use(express.errorHandler({
    dumpExceptions: true,
    showStack: true
  }));
});

ApplicationSchema = new mongoose.Schema({
  name: String,
  files: [mongoose.Schema.Mixed]
});

ApplicationSchema.methods.addFile = function(file, options, fn) {
  var application;
  application = this;
  return gridfs.putFile(file.path, file.filename, options, function(err, result) {
    application.files.push(result);
    return application.save(fn);
  });
};

Application = mongoose.model("application", ApplicationSchema);

app.get("/", function(req, res) {
  return Application.find({}, function(err, applications) {
    return res.render("index", {
      title: "GridFS Example",
      applications: applications
    });
  });
});

app.post("/new", function(req, res) {
  var application, opts;
  application = new Application();
  application.name = req.body.name;
  opts = {
    content_type: req.files.file.type
  };
  return application.addFile(req.files.file, opts, function(err, result) {
    return res.redirect("/");
  });
});

app.get("/stream/:id", function(req, res) {
  return gridfs.get(req.params.id, function(err, file) {
    
    console.log(file);

    res.header("Content-Type", file.type);
    //res.header('Content-Disposition' , 'inline; filename="meuxic.mp3"');  
    res.header('Cache-Control','no-cache'); 
    res.header("Content-length", file.length);        
    res.header("Content-Transfer-Encoding","chunked");        
    return file.stream(true).pipe(res);
  });
});

app.listen(1216, function() {
  return console.log("Streaming ready");
});
