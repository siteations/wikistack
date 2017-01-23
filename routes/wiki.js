var express=require('express');
var router=express.Router();
var models = require('../models');
var Page = models.Page;
var User = models.User;

router.get('/', (req,res, next)=>{
    //retrieves all wiki pages
    res.redirect('/');

})

router.post('/', (req,res, next)=>{
    //submit new page to db
    console.log('post log starts here:', (req.body));

    var inputs=req.body;
    console.log(inputs.urlTitle);

    var page = Page.build({
        title: inputs.title,
        content: inputs.content
      });

  page.save().then(()=> {
    res.json(req.body);

  });
  // -> after save -> res.redirect('/');



})

router.get('/add', (req,res, next)=>{
    //retrieve the 'add a page' form
    res.render('../views/addpage.html');
})



module.exports=router;
