const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.set('strictQuery', true);

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp');
}

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '64398435588450f1df26a88a',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit in modi laudantium accusantium sed deserunt atque cum? Asperiores vitae obcaecati architecto dicta ducimus totam, minus, doloribus, fugiat quidem voluptatem error.',
            price,
            geometry: { type: 'Point', coordinates: [105.8544441, 21.0294498] },
            images: [
                {
                    url: 'https://res.cloudinary.com/dy5sjhmxn/image/upload/v1681809047/YelpCamp/hwhubyudrc6tuxzhmisi.jpg',
                    filename: 'YelpCamp/hwhubyudrc6tuxzhmisi'
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})