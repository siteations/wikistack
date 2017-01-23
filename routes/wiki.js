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



  page.save().then((saved)=> {
    console.log("saved: ", saved);

    res.render('wikipage.html', { title: inputs.title,
        urltitle: page.urlTitle,
        name: inputs.name,
        content: page.content,
    });
  });
})

/*router.get('/:urlTitle', function (req, res, next) {
    var urlTitle=req.params.urlTitle.slice(0,-5);

    console.log("page: ", Page.findAll());

    var site = Page.findAll({
        where:{
            urlTitle: urlTitle
        }
        //attribute:['title','urlTitle','content','status','date']

    });

    /*site.then((foundPage)=>{
        console.log('retpage: ', foundPage);
        res.json(foundPage);
    })
    next();
});*/

router.get('/add', (req,res, next)=>{
    //retrieve the 'add a page' form
    res.render('../views/addpage.html');
})



module.exports=router;
