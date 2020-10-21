// Import models
const Farm = require('../src/models/Farm');
const Listing = require('../src/models/Listing');
const connectDB = require('../config/db');

(async () => {
  // connect to database
  await connectDB(process.env.MONGO_URI);

  const title = "Howard's farm";

  Farm.find({ title }, (err, data) => {
    if (err) return console.log(err);
    if (data && data.length) {
      const findFarm = data[0];

      // Save Listing
      const newListing = new Listing({
        name: 'Fuji Apples',
        description:
          'Fuji Apples grown in Sally’s backyard. Pesticide-free. 20lbs left until 1/27. Eat fresh or use for baking!',
        unit: 'lbs',
        pricePerUnit: 5.99,
        coverPhoto:
          'https://images.all-free-download.com/images/graphiclarge/fresh_red_apple_stock_photo_167147.jpg',
        tags: ['organic'],
        status: 'AVAILABLE',
        quantity: 10,
        farm: findFarm,
      });

      // Save listing
      newListing.save((error, result) => {
        if (error) return console.log(err);

        // Push listing to farm
        Farm.findOne({ title }, (err, farm) => {
          farm.listings.push(result);
          farm.save();
        });

        console.log(`Listing created, and added to ${title}!`);
      });
    }

    return false;
  });
})();
