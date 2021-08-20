const REPLY = require('../module/reply')
const COMMENT = require('../module/comment')
const Category = require('../module/category')
const ObjectId = require("mongodb").ObjectID;
exports.createOne = async(req, res, next) => {
    const result = new REPLY({
        message: req.body.message,
        comment_ID: req.body.comment_ID,
        user_ID: req.body.user_ID,
    })
    result.save().then((data) => {
        res.json(result);
    }).catch((error) => {
        res.json(error);
    })
};

exports.getAll = async(req, res, next) => {
    const result = await REPLY.find();
    res.json(result);
};

exports.filterAll = async(req, res, next) => {

    const result = await COMMENT.aggregate([{
            $match: {
                _id: new ObjectId(req.params.id),
            },
        },

        {
            $lookup: {
                from: "replies",
                localField: "_id",
                foreignField: "comment_ID",
                as: "INFO",
            },
        }

    ])

    const result_cat = await Category.aggregate([{
            $match: {},
        },

        {
            $lookup: {
                from: "news",
                let: { category_ID: "$_id" },
                pipeline: [
                    { $match: { $expr: { $eq: ["$category_ID", "$$category_ID"] } } },
                    {
                        $count: "jami"
                    }

                ],
                as: "natija",
            },
        },

    ])


    // const client = req.session.client
    // const categories = await Category.find()
    // res.render("./client/replies", {
    //     layout: "./client",
    //     client,
    //     categories,
    //     result

    // });
    res.json(result_cat)

};

exports.deleteOne = async(req, res, next) => {
    await REPLY.findByIdAndRemove(req.params.id);
    res.status(200).json({
        success: true,
        data: []
    });
};