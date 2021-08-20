const NEWS = require('../module/news')
const Category = require('../module/category')
exports.searchClient = async(req, res) => {
    let searchExpression_name = new RegExp(req.query.name);

    pipeline = [{
        $match: {
            "title": { $regex: searchExpression_name, $options: "i" },
        },
    }, ];

    const result = await NEWS.aggregate(pipeline);
    const client = req.session.client
    const categories = await Category.find()
    res.render("./client/search", {
        layout: "./client",
        result,
        client,
        categories,
    });

};