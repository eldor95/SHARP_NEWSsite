const Category = require('../module/category')
const News = require('../module/news')
const Comments = require('../module/comment')

exports.dashboard = async(req, res, next) => {
    const client = req.session.client
    const categories = await Category.find()
    const news = await News.find()
    res.render("./client/index", {
        layout: "./client",
        categories,
        client,
        news
    });
};
exports.getOne_category_news = async(req, res, next) => {
    const news = await News.find({
            category_ID: req.params.id
        })
        .populate(['category_ID'])
    const categories = await Category.find()
    const client = req.session.client
    res.render("./client/news", {
        layout: "./client",
        news,
        categories,
        client
    });

};
exports.get_one_news = async(req, res, next) => {
    const news = await News.findById({
            _id: req.params.id
        })
        .populate(['category_ID'])
    const newsUpdate = await News.findByIdAndUpdate({
        _id: req.params.id
    })
    newsUpdate.counter++
        newsUpdate.save()

    const client = req.session.client
    const categories = await Category.find()
    const all_comment = await Comments.find({
            news_ID: req.params.id
        })
        .populate({
            path: "user_ID",
            select: "name"
        })
        .sort({
            date: -1
        })

    res.render("./client/get_news", {
        layout: "./client",
        news,
        categories,
        client,
        all_comment
    });

};