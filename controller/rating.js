 const RATING = require('../module/rating')
 const ObjectId = require("mongodb").ObjectID;
 const NEWS = require('../module/news')

 exports.createOne = async(req, res, next) => {
     const result = new RATING({
         rating: req.body.rating,
         news_ID: req.body.news_ID,
     });

     result
         .save()
         .then(async() => {
             const countRatingProduct = await RATING.aggregate([{
                     //  hamma ratinglarti ozining id si boyicha filter qilib olib keladi
                     $match: {
                         news_ID: new ObjectId(req.body.news_ID),
                     },
                 },
                 //  bitta news id boyicha hamma ratingni qoshish
                 {
                     $group: {
                         _id: "$news_ID",
                         count: { $sum: 1 },
                         totalSum: { $sum: "$rating" },
                     },
                 },
                 //  hisoblash
                 {
                     $project: {
                         _id: 1,
                         count: 1,
                         totalSum: {
                             $round: [{ $divide: ["$totalSum", "$count"] }, 1],
                         },
                     },
                 },
             ]);
             //   yanglikni idsi boyicha topib   umumiy natijani rating ga yozish uchun
             const updateRating = await NEWS.findByIdAndUpdate(req.body.news_ID);
             if (countRatingProduct == "") {
                 updateRating.rating = req.body.rating;

             } else {
                 updateRating.rating = countRatingProduct[0].totalSum;
             }
             //  saqlash
             updateRating.save();
             res.status(201).json({ message: "Successfully", data: countRatingProduct });
         })
         .catch((err) => {
             res.status(400).json({ message: "Unsuccessfully", data: err });
         });

 };

 exports.getAll = async(req, res, next) => {
     const result = await RATING.find();
     res.json(result);
 }

 exports.deleteOne = async(req, res, next) => {
     await RATING.findByIdAndRemove(req.params.id);
     res.status(200).json({ success: true, data: [] });
 }