const NEWS = require("../module/news")
const md5 = require('md5')
const path = require('path')
const fs = require('fs')
const sharp = require('sharp');
const Category = require('../module/category');



exports.createOne = async(req, res) => {

    // qirqilgan rasmni tushadigan yoli
    let compressedFile = path.join(__dirname, '../public/convert', md5(new Date().getTime()) + '.jpg')
        // rasmni qirqish jarayoni
    sharp(req.file.path) // req.file.path - bu original rasm
        .resize(360, 274)
        .jpeg({ quality: 100 })
        .toFile(compressedFile, (error) => {
            if (error) {
                res.send(error)
            }
            // origininal rasmni ochirib yuboradi
            fs.unlink(req.file.path, async(error) => {
                if (error) {
                    res.send(error)
                }
            })
        })

    const result = new NEWS({

        category_ID: req.body.category_ID,
        title: req.body.title,
        description: req.body.description,
        tag: req.body.tag,
        image: path.basename(compressedFile),
    })
    result
        .save()
        .then(() => {
            // res.json(result);
            res.redirect('/news/getAll');
        })
        .catch((error) => {
            res.json(error);
        });
};
exports.getAll = async(req, res) => {
    const category = await Category.find()

    const result = await NEWS.find()
        .sort({ date: -1 })
        .populate(['category_ID'])
    res.render("./admin/news/index", {
        layout: "./admin",
        result,
        category

    });

};
exports.getOne = async(req, res, next) => {
    const result = await NEWS.findById(req.params.id)
    res.render("./admin/news/update", {
        layout: "./admin",
        result
    });
};
exports.getCall = async(req, res, next) => {

    const countRatingProduct = await NEWS.aggregate([{
            //  hamma ratinglarti ozining id si boyicha filter qilib olib keladi
            $match: {
                category_ID: new ObjectId(req.body.category_ID),
            },
        },
        //  bitta news id boyicha hamma ratingni qoshish
        {
            $group: {
                _id: "$category_ID",
                count: { $sum: 1 },

            },
        },
        //  hisoblash
        {
            $project: {
                _id: 1,
                count: 1,


            },
        },
    ]);
    //   yanglikni idsi boyicha topib   umumiy natijani rating ga yozish uchun
    const updateRating = await Category.findByIdAndUpdate(req.body.category_ID);
    if (countRatingProduct == "") {
        count = 0
    }
    //  saqlash
    updateRating.save();
    res.status(201).json({ message: "Successfully", data: countRatingProduct });









};
exports.updateImage = async(req, res) => {
    // eski faylni ochirish
    // await NEWS.findById({ _id: req.params.id })
    //     .exec((error, data) => {
    //         if (error) {
    //             res.status(404).json({ success: false, error: error })
    //         } else {
    //             let filePath = path.join(__dirname, '../public/convert/ ' + data.image)
    //             fs.unlink(filePath, () => {
    //                 []
    //             })
    //         }
    //     })
    let compressedFile = path.join(__dirname, '../public/convert', md5(new Date().getTime()) + '.jpg')
        // rasmni qirqish jarayoni
    await sharp(req.file.path) // req.file.path - bu original rasm
        .resize(400, 400)
        .jpeg({ quality: 100 })
        .toFile(compressedFile, (error) => {
            if (error) {
                res.send(error)
            }
            // origininal rasmni ochirib yuboradi
            fs.unlink(req.file.path)
        })
    const result = await NEWS.findByIdAndUpdate(req.params.id);
    result.image = path.basename(compressedFile);
    result
        .save()
        .then(() => {
            res.redirect('/news/getAll')
        })
        .catch((error) => {
            res.status(400).json({ message: "malumot ozgartirilmadi", data: error });
        });
};
exports.updateOne = async(req, res) => {
    // malumotni yangilash uchun
    const result = await NEWS.findByIdAndUpdate(req.params.id);
    result.category_ID = req.body.createOne;
    result.title = req.body.title;
    result.description = req.body.description;
    result.tag = req.body.tag;

    result
        .save()
        .then(() => {
            res.redirect('/news/getAll')
        })
        .catch((error) => {
            res.status(400).json({ message: "malumot ozgartirilmadi", data: error });
        });
};
exports.deleteOne = async(req, res) => {
    await NEWS.findById({ _id: req.params.id }).exec(async(error, data) => {
        if (error) {
            res.send(error);
        } else {
            const filePath = path.join(
                __dirname,
                "../public/convert/" + data.image
            );
            fs.unlink(filePath, async(err) => {

                await NEWS.findByIdAndDelete({ _id: req.params.id });
                res.redirect('/news/getAll')
            });
        }
    });
};