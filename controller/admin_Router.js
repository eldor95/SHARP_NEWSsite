const Category = require('../module/category')
const News = require('../module/news')
const Users = require('../module/user')


exports.dashboard = async(req, res, next) => {
    const newsCount = await News.aggregate([{
        $match: {}
    }, {
        $count: "all"
    }])
    const userCount = await Users.find().count()
    const categoryCount = await Category.find().countDocuments()

    // const user = req.session.user;
    res.render("./admin/dashboard", {
        layout: "./admin",
        userCount,
        newsCount,
        categoryCount,
    });
};
exports.users = async(req, res, next) => {
    // const user = req.session.user;
    res.render("./admin/user", {
        layout: "./admin",
    });
};
exports.login = async(req, res, next) => {
    res.render("./admin/login_index", {
        layout: "./login",
    });
};

exports.login_client = async(req, res, next) => {
    const client = req.session.client
    const categories = await Category.find()
    res.render("./client/login", {
        layout: "./client",
        categories,
        client
    });
};
exports.register_client = async(req, res, next) => {
    const client = req.session.client
    const categories = await Category.find()
    res.render("./client/register", {
        layout: "./client",
        categories,
        client
    });
};