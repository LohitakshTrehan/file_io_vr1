const path = require('path');
const express = require('express')
const app = express()

app.set('views', path.join(__dirname, 'client'))
app.set('view engine', 'ejs')
app.get('/',function(req,res) {
  res.render('index');
})
app.listen(3000, () => console.log('Magic happens at 3000!'))
