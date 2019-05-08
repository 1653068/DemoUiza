const Uiza=require('uiza');
let controller={};

controller.categoryList=(req,res)=>{
    Uiza.category.list()
    .the((list)=>{
        res.locals.active=2;
        res.locals.categoryList=list;
        res.render('categoryList');
    })
    .catch((err)=>{
        res.json(err);
    })
}

module.exports 