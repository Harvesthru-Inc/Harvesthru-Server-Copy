// Import models
const User = require('../src/models/User');
const Farm = require('../src/models/Farm');
const connectDB = require('../config/db');

(async () => {
  // connect to database
  await connectDB();

  // Find user and insert farm
  User.find({ email: 'Luw055@ucsd.edu' }, (err, data) => {
    if (err) return console.log(err);
    if (data && data.length) {
      // Create new farm
      const title = "Howard's farm";
      const newFarm = new Farm({
        title,
        description:
          'Fuji Apples grown in Sally’s backyard. Pesticide-free. 20lbs left until 1/27. Eat fresh or use for baking!',
        hours: {
          monday: '7am - 8pm',
          tuesday: '8am - 9pm',
        },
        location: {
          lat: 30,
          latBearing: 'W',
          long: 40,
          longBearing: 'S',
        },
        rating: 4.5,
        ratingCount: 1,
        tags: ['organic', 'seed', 'plants'],
        photos: [
          'https://www.ft.com/__origami/service/image/v2/images/raw/http%3A%2F%2Fcom.ft.imagepublish.upp-prod-us.s3.amazonaws.com%2Fea5552cc-79af-11e9-8b5c-33d0560f039c?fit=scale-down&source=next&width=700',
        ],
        shareUrl: 'https://farms.harvesthru.com/howardsfarm',
        owner: data[0],
      });

      // Save farm
      newFarm.save((error) => {
        if (error) return console.log(err);
        return console.log(`${title} created!`);
      });

      return true;
    }

    return false;
  });
})();
