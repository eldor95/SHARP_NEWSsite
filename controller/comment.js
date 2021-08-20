const COMMENT = require('../module/comment')
const User = require('../module/user')
const News = require('../module/news')

exports.createOne = async(req, res, next) => {
    const result = new COMMENT({
        message: req.body.message,
        user_ID: req.body.user_ID,
        news_ID: req.body.news_ID,
    })
    result.save().then(() => {
            res.status(200).json({ message: "Siz komentariya qoldirdingiz", data: result })
        })
        .catch((error) => {
            res.json(error);
        });
};

exports.getAll = async(req, res, next) => {

    const result = await COMMENT.find()
        .sort({
            date: -1
        })
        .populate(['user_ID'])

    const user = await User.find()
    const news = await News.find()
    res.render("./admin/comment/index", {
        layout: "./admin",
        result,
        user,
        news
    })
};

exports.updateOne = async(req, res, next) => {
    const result = await COMMENT.findOneAndUpdate(req.params.id)

    result.message = req.body.message;
    result.news_ID = req.body.news_ID;
    result.user_ID = req.body.user_ID;

    result.save()
        .then(() => {
            res.status(200).json({
                message: "malumot uzgartirildi",
                data: result
            });
        })
        .catch((error) => {
            res.status(400).json({
                message: " ma;imot uzgarmadi",
                data: error
            });
        })
};


exports.deleteOne = async(req, res, next) => {
    await COMMENT.findByIdAndDelete(req.params.id)
    res.status(200).json({
        success: true,
        data: []
    })
};