const mongoose = reuqire('mongoose');
const Schema = mongoose.Schmea;

const reviewSchema = new Schema({
    body: String,
    rating: Number
});

module.exports = mongoose.model("Review", reviewSchema)