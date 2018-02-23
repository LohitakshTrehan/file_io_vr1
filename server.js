const path = require('path');
const express = require('express')
const app = express()
var formidable = require('formidable')
var fs = require('fs')

app.set('views', path.join(__dirname, 'client'))
app.set('view engine', 'ejs')

app.get('/',function(req,res) {
  res.render('index');
})

app.post('/upload', function(req, res){
  console.log("Here");
  // create an incoming form object
  var form = new formidable.IncomingForm();
  // specify that we want to allow the user to upload multiple files in a single request
  form.multiples = true;
  // store all uploads in the /uploads directory
  form.uploadDir = path.join(__dirname, '/uploads');
  // every time a file has been uploaded successfully,
  // rename it to it's orignal name
  form.on('file', function(field, file) {
    console.log("detected a file");
    fs.rename(file.path, path.join(form.uploadDir, file.name));
  });
  // log any errors that occur
  form.on('error', function(err) {
    console.log('An error has occured: \n' + err);
  });
  // once all the files have been uploaded, send a response to the client
  form.on('end', function() {
    console.log("sucess msg sent");
    res.end('success');
  });
  // parse the incoming request containing the form data
  form.parse(req);
  console.log("Ends");
});

app.use('/', express.static(path.join(__dirname, 'client')))
app.listen(process.env.PORT || 3000, () => console.log('Magic happens at 3000!'))
