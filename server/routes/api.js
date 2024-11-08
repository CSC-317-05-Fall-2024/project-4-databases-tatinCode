/*

    This file contains the routes for the backend of the application.

*/
import express from 'express';
import { getRestaurants, getRestaurant, createRestaurant, deleteRestaurant } from '../data/restaurants.js';

const router = express.Router();

/*
        
    gets the restaurantData array. using the function getRestaurants().
    
*/
router.get('/restaurants', (req, res) => {
    res.json(getRestaurants());
});

/*
        
    Search the restaurantData array for a specific restaurant by id. using
    the function getRestaurant().
        
*/
router.patch('/restaurants/:id', (req, res) => {
    const restaurantID = parseInt(req.params.id);
    const restaurant = getRestaurant(restaurantID);

    if(restaurant){
        res.render('restaurant-details', { restaurant });
    }
    else{
        res.status(404).send(`Restaurant ${restaurantID} not found`);
    }
});

/*

    Adds a restaurant to the restaurantData array by calling 
    the function createRestaurant().

*/
router.post('/restaurants', express.json(), (req, res) => {
    const newRestaurant = req.body;
    const createdRestaurant = createRestaurant(newRestaurant);
    res.status(201).json(createdRestaurant);
});

/* 
    
    Deletes a restaurant by id from the restaurantData array by calling
    the function deleteRestaurant().
    
*/
router.delete('/restaurants/:id', (req, res) => {
    const restaurantID = parseInt(req.params.id);
    const message = deleteRestaurant(restaurantID);
    res.status(200).send(message);

    if (isDeleted) {
        res.status(200).send(`Restaurant ${restaurantID} deleted successfully`);
    } else {
        res.status(404).send(`Restaurant ${restaurantID} not found`);
    }
});


export {router as backendRouter};