/*
 server.js - 

    @Author: Justine Tenorio

    ???? - jtenorio
        - finished project 1

    ???? - jtenorio
        - finished project 2

    10/25/2024 - jtenorio
        - finished project 3, will try to add and document better next project

    11/6/2024 - jtenorio
        - Worked on project 4
    
    11/7/2024 - jtenorio
        - Finished project 4
*/
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { getRestaurants, getRestaurant, reviewsForRestaurant } from './data/restaurants.js';
import { backendRouter } from './routes/api.js';
import { pool } from "./config/database.js";

const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, 'public')));

/*

    To mount the API router on the /api path

*/
app.use(express.json());
app.use('/api', backendRouter);

/*

    Route for the Home Page or index.html

*/
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

/*

    Route for attractions.html

*/
app.get('/attractions', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'attractions.html'));
});

/*

    Route for restaurant.ejs when creating a new restaurant

*/
app.get('/new-restaurant', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'newRestaurant.html'));
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

/*

    Route for restaurants.ejs

*/
app.get('/restaurants', async (req, res) => {
    const restaurants = await getRestaurants();
    res.render('restaurants', { restaurants });
});

/*

    Route for restaurant-details.ejs when viewing a specific restaurant

*/
app.get('/restaurants/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const restaurant = await getRestaurant(id);
    const reviews = await reviewsForRestaurant(id);

    if (restaurant) {
        res.render('restaurant-details', { restaurant, reviews });
    } else {
        res.status(404).send(`Restaurant ${id} not found`);
    }
});



app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
