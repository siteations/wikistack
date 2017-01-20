var express = require('express');
var app= express();
var morgan = require('morgan');
var parser= require('body-parser');
var nunjucks= require('nunjucks');
var models = require('./models/');

var env = nunjucks.configure('views', {noCache: true, express:app });
    // have res.render work with html files
    app.set('view engine', 'html');
    // when res.render works with html files, have it use nunjucks to do so
    app.engine('html', nunjucks.render);


app.use(morgan('dev'));


express.static('./public');
express.static('./public/stylesheets/');

app.get('/', (req, res) => {
    res.render('index.html');
});


models.User.sync({})
.then(()=> {
    return models.Page.sync({})
}).then(()=>{
    app.listen(3000, function () {
        console.log('Server is listening on port 3000!');
    });
})
