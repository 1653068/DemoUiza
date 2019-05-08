const Uiza = require('uiza');
let controller = {};

controller.homepage = (req, res) => {
    Uiza.entity.list()
        .then((elist) => {
            res.locals.active = 0;
            res.locals.entityList = elist;
            Uiza.category.list()
                .then((clist) => {
                    res.locals.categoryList = clist;
                    Uiza.live.list_recorded()
                    .then((llist)=>{
                        res.locals.recordList=llist;
                        res.render('index');
                    })
                    .catch((err)=>{
                        res.json(err);
                    })
                })
                .catch((err) => {
                    res.json(err);
                });  
        })
        .catch((err) => {
            res.json(err);
        });
}

module.exports = controller;