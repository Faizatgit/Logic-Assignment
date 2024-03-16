const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/cafe_places', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Define cafe and places schema
const cafeSchema = new mongoose.Schema({
    name: String,
    location_id: String
});
const Cafe = mongoose.model('Cafe', cafeSchema);

const placesSchema = new mongoose.Schema({
    id: String,
    street_no: String,
    locality: String,
    postal_code: String,
    lat: String,
    long: String
});
const Place = mongoose.model('Place', placesSchema);

// Define routes
app.get('/cafes', async (req, res) => {
    try {
        const cafes = await Cafe.find();
        res.json(cafes);
    } catch (error) {
        console.error('Error fetching cafes:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Fetch places from backend
app.get('/places', async (req, res) => {
    try {
        const places = await Place.find({}, { _id: 0 }); // Exclude _id field from the response
        res.json(places);
    } catch (error) {
        console.error('Error fetching places:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// Populate cafes and places data
app.get('/populate', async (req, res) => {
    try {
        // Clear existing data
        await Cafe.deleteMany({});
        await Place.deleteMany({});

        // Insert new cafes and places data
        await Cafe.insertMany([
            { name: "Bazaar Cafe", location_id: "kjk234g4gcvfx8usg1l33pi" },
            { name: "Ashley's Cafe", location_id: "asjdh8hftys0kght2yskyvy" },
            { name: "Avenue Cafe", location_id: "skjd86svvfdrsv55svbvf3f" },
            { name: "Hi-Lo Cafe", location_id: "mjdhgetr4pojfyts22fzfsh" },
            { name: "California Chicken Cafe", location_id: "12hydbdf76sljfts87sbfis" },
            { name: "Corner Bakery Cafe", location_id: "jahgde7wgdiau8ewsahgosd" },
            { name: "Philz Coffee", location_id: "urhw3837ehalod7w02b7835" },
            { name: "The Alma Gathering Cafe", location_id: "mjdhgetr4pojfyts22fzfsh" },
            { name: "Lakeland Memory Cafe", location_id: "jahgde7wgdiau8ewsahgosd" },
            { name: "Baron Memory Cafe", location_id: "kjk234g4gcvfx8usg1l33pi" },
            { name: "Lakeshores Memory Cafe", location_id: "mjdhgetr4pojfyts22fzfsh" },
            { name: "Monarch Memory Cafe", location_id: "jahgde7wgdiau8ewsahgosd" }
        ]);

        await Place.insertMany([
            { id: "jahgde7wgdiau8ewsahgosd", street_no: "60H", locality: "Solomos Island Road", postal_code: "20688", lat: "36.7783 N", long: "119.4179 W" },
            { id: "12hydbdf76sljfts87sbfis", street_no: "1B", locality: "Macarthur Blvd", postal_code: "20619", lat: "38.1781 N", long: "118.4171 W" },
            { id: "kjk234g4gcvfx8usg1l33pi", street_no: "45250", locality: "Worth Avenue, Unit A", postal_code: "20619", lat: "36.1152", long: "117.521" },
            { id: "saswe3s6yydtdr52hsd72yst", street_no: "1X", locality: "Macarthur Blvd", postal_code: "20687", lat: "36.7783", long: "119.4179" },
            { id: "skjd86svvfdrsv55svbvf3f", street_no: "7S", locality: "Three Notch Road", postal_code: "20619", lat: "36.83", long: "119.6" },
            { id: "asjdh8hftys0kght2yskyvy", street_no: "1B", locality: "Ambey Mantion", postal_code: "29087", lat: "31.21", long: "119.7" },
            { id: "mjdhgetr4pojfyts22fzfsh", street_no: "22803", locality: "Gunston Dr Lexington Park", postal_code: "20688", lat: "35.7788", long: "119.979" },
            { id: "urhw3837ehalod7w02b7835", street_no: "225", locality: "Macarthur Blvd", postal_code: "20687", lat: "35.77813", long: "119.41791" }
        ]);

        res.json({ message: 'Data populated successfully' });
    } catch (error) {
        console.error('Error populating data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
