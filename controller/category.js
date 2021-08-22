const CATEGORY = require('../module/category')


exports.createOne = async(req, res, next) => {
    const result = new CATEGORY({
        name: req.body.name,
    })
    result.save().then(() => {
            res.redirect('/category/getAll')
                // res.json(result)
        })
        .catch((error) => {
            res.json(error);
        });
};
exports.getAll = async(req, res, next) => {
    const result = await CATEGORY.find().sort({ date: 1 });
    res.render("./admin/category/index", {
            layout: "./admin",
            result

        })
        // res.json(result);
};

exports.getOne = async(req, res, next) => {

    const result = await CATEGORY.findById(req.params.id)
    res.render("./admin/category/update", {
        layout: "./admin",
        result
    });
};

exports.updateOne = async(req, res, next) => {
    const result = await CATEGORY.findOneAndUpdate(req.params.id)

    result.name = req.body.name;

    result.save()
        .then(() => {
            res.redirect('/category/getAll')
        })
        .catch((error) => {
            res.status(400).json({
                message: " malumot uzgarmadi",
                data: error
            });
        })
};


exports.deleteOne = async(req, res, next) => {
    await CATEGORY.findByIdAndDelete(req.params.id)
    res.redirect('/category/getAll')
};