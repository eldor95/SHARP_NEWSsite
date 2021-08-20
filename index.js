const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require("cookie-parser");
const session = require("express-session");
const expressLayouts = require("express-ejs-layouts");
const methodOverride = require("method-override");
const cors = require("cors");
const MongoDBSession = require("connect-mongodb-session")(session);
const MongoURI = 'mongodb://localhost:27017/Sharp';

app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(express.static(path.join(__dirname, '/public')))

const store = new MongoDBSession({
    uri: MongoURI,
    collection: "MYSession",
});
app.use(
    methodOverride("_method", {
        methods: ["POST", "GET"],
    })
);
app.locals.moment = require("moment");
app.use(expressLayouts);

app.use(cookieParser());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");


app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(
    session({
        secret: "asdasdasdasdasdasdsfsafd",
        saveUninitialized: false,
        store: store,
        resave: false,

        cookie: {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 2,
            sameSite: "strict",
        },
    })
);
mongoose
    .connect(MongoURI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('MongoDb connected!');
    });


app.use(cookieParser());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");





app.use('/', require('./router/client_Router'))
app.use('/admin', require('./router/admin_Routre'))




app.use('/user', require('./router/user'))
app.use('/news', require('./router/news'))
app.use('/comment', require('./router/comment'))
app.use('/category', require('./router/category'))
app.use('/rating', require('./router/rating'))
app.use('/reply', require('./router/reply'));
app.use('/search', require('./router/search'));



app.listen(3000, () => {
    console.log('Server working ...');
});