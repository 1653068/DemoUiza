var express = require('express');
var app = express();
let hbs = require('express-handlebars');
let bodyParser = require('body-parser');
let https = require('https');
let http = require('http');
let path = require('path');
let fs = require('fs');
const uiza = require('uiza');

uiza.authorization('uap-a92a4506195d429b8bd992abfa7b93e0-efbeefc1');
app.use(express.static(__dirname + "/public"));
app.engine('hbs', hbs({
    extname: 'hbs',
    defaultLayout: 'layout',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials'
}));

app.set('view engine', 'hbs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.set('port', process.env.PORT || 5000);

app.get('/', (req, res) => {
    uiza.entity.list()
        .then((list) => {
            console.log(list);
            res.render('index');
        }).catch((err) => {
            console.log(err);
            res.json(err);
        });
});

app.get('/createCategory', (req, res) => {
    const param = {
        name: 'Folder sample',
        type: 'folder',
        description: 'Folder desciption',
        orderNumber: 1
    };
    uiza.category.create(param)
        .then((cate) => {
            res.send(cate);
        })
        .catch((err) => {
            res.send(err);
        })
});

app.get('/listCategory', (req, res) => {
    uiza.category.list()
        .then((cate) => {
            res.send(cate);
        })
        .catch((err) => {
            res.send(err);
        })
});

app.get('/updateCategory', (req, res) => {
    const param = {
        id: '85c8ad59-e304-48a8-85c7-b9db419d1485',
        name: 'Folder edit',
        desciption: 'Folder description edited',
        orderNumber: 0
    };
    uiza.category.update(param)
        .then((updated) => {
            res.send(updated);
        })
        .catch((err) => {
            res.send(err);
        })
});

app.get('/callback', (req, res) => {
    res.send('hello');
});

app.get('/createRelation', (req, res) => {
    const param = {
        entityId: '90458b03-d0c2-4e4d-a88c-06462fb032d4',
        metadataIds: ['85c8ad59-e304-48a8-85c7-b9db419d1485', '4b732a54-65ca-4d6d-a23c-45388fea815b']
    }
    uiza.category.create_relation(param)
        .then((rel) => {
            res.send(rel);
        })
        .catch((err) => {
            res.send(err);
        })
});

function callback(res) {
    const param = {
        url: "http://localhost:5000/callback",
        method: "POST",
        jsonData: {
            data: "data"
        },
        headersData: {
            data: "Headers data"
        }
    };

    uiza.callback.create(param)
        .then((call) => {
            console.log('callback create');
            console.log(call);
            res.send(call);
        })
        .catch((err) => {
            console.log('callback error');
            console.log(err);
        })
};

app.get('/createEntity', (req, res) => {
    res.send('hello');
});

app.post('/createEntity', (req, res) => {
    const param = {
        name: req.body.name,
        url: req.body.url,
        inputType: req.body.inputType,
        desciption: req.body.desciption,
        shortDescription: req.body.shortDescription
    };

    uiza.entity.create(param)
        .then((entity) => {
            console.log('create entity ');
            console.log(entity);
            callback(res);
        })
        .catch((err) => {
            console.log(err);
            callback(res);
            res.json(err);
        });

});

app.get('/livestream', (req, res) => {
    const params = {
        name: 'test event',
        mode: 'push',
        encode: 1,
        dvr: 1,
        description: 'This is for test event',
        poster: '/image1.jpeg',
        thumbnail: '/image1.jpeg',
        linkStream: [
            'https://playlist.m3u8'
        ],
        resourceMode: 'single'
    };

    uiza.live.create(params)
        .then((live) => {
            res.json(live);
        }).catch((err) => {
            res.json(err);
        });
});

app.use('/start', (req, res) => {
    var params = {
        id: '37bcc5de-8315-469b-8463-cd740649e934'
    };
    uiza.live.start_feed(params)
        .then((live) => {
            res.json(live);
        })
        .catch((err) => {  
            res.json(err);
        })
});

app.use('/stop',(req,res)=>{
    var params={
        id:'37bcc5de-8315-469b-8463-cd740649e934'
    }
    uiza.live.stop_feed(params)
    .then((live)=>{

    })
    .catch((err)=>{

    })
});

app.get('/test',(req,res)=>{
    res.render('test');
});

app.listen(app.get("port"), function () {
    console.log("server is  listening on port " + app.get("port"));
});