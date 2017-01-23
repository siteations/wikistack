var express=require('express');
var router=express.Router();
var models = require('../models');
var Page = models.Page;
var User = models.User;

router.get('/', (req,res, next)=>{
    //retrieves all wiki pages
    //res.redirect('/');

    var site = Page.findAll({

        attribute:['title','urlTitle','content','status','date'],

    });

    site.then(function(pagesArr) {
        //console.log(pagesArr);
        res.render('../views/index.html', {pages: pagesArr});
    });

})

router.get('/users', (req,res, next)=>{
    //retrieves all wiki pages
    //res.redirect('/');

    var users = User.findAll({

        attribute:['name','email', 'id'],

    });

    users.then(function(usersArr) {
        console.log(usersArr);
        res.render('../views/users.html', {users: usersArr});
    });

})

router.get('/users/:id', (req,res, next)=>{
    //retrieves all wiki pages
    //res.redirect('/');
    console.log("LOOK", req.params.id);
    if (req.params.id) {
        var site = Page.findAll({

        where:{
            authorId: Number(req.params.id)
        }
    });


    site.then((foundPage)=>{
        //console.log('retpage: ', foundPage);
        //res.send('got here');
        //res.json(foundPage[0]);

        User.findAll({
            where: {
                id : foundPage[0].authorId
            }
        }).then((foundUser) => {
            res.render('indiv.html', {
            name: foundUser[0].name,
            email: foundUser[0].email,
             pages: foundPage,
             });
        })

    })
    .catch(next);
    }

    /*else {

        var users = User.findAll({

        attribute:['name','email', 'id'],

         });

         users.then(function(usersArr) {
        //console.log(pagesArr);
        res.render('../views/users.html', {users: usersArr});
        });
    }*/


})


router.post('/', (req,res, next)=>{
    //submit new page to db
    //console.log('post log starts here:', (req.body));

    var inputs=req.body;
    //console.log(inputs.urlTitle);

    var page = Page.build({
        title: inputs.title,
        content: inputs.content
      });

    var user = User.build({
        name: inputs.name,
        email: inputs.email

    });



  // page.save().then((saved)=> {
  //   //console.log("saved: ", saved);

  //   res.render('wikipage.html', { title: inputs.title,
  //       urltitle: page.urlTitle,
  //       name: inputs.name,
  //       content: page.content,
  //   });
  // });

  user.save().then(function(saveUser) {
    page.save().then(function(savedPage){
        page.setAuthor(saveUser).then(() => {
            res.redirect(savedPage.route);
        })

         // route virtual FTW
    });
  }).catch(next);

})

router.get('/add', (req,res, next)=>{
    //retrieve the 'add a page' form
    res.render('../views/addpage.html');
})

router.get('/:urlTitle', function (req, res, next) {
    var urlTitle=req.params.urlTitle.slice(0,-5);

    //console.log("page: ", Page.findAll());

    var site = Page.findAll({

        //attribute:['title','urlTitle','content','status','date'],
        where:{
            urlTitle: urlTitle
        }
    });


    site.then((foundPage)=>{
        //console.log('retpage: ', foundPage);
        //res.send('got here');
        //res.json(foundPage[0]);

        User.findAll({
            where: {
                id : foundPage[0].authorId
            }
        }).then((foundUser) => {
            res.render('wikipage.html', { title: foundPage[0].title,
             urltitle: foundPage[0].urlTitle,
             name: foundUser[0].name,
              content: foundPage[0].content,
             });
        })

    })
    .catch(next);

});




module.exports=router;
