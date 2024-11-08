/*

    the array for restaurantData and holds the restaurants for the
    ejs file.

    11/7/2024 - edited by jtenorio
        changed all the functions to use pool

*/
import { pool } from "../config/database.js";

// let restaurantData = [
//     {
//         "id": 0,
//         "name": "Lorem Restaurant 0",
//         "phone": "(567)-364-786",
//         "address": "0000 Lorem wy, Ipsum, LM",
//         "photo": "images/restLorem0.jpg",
//     },
//     {
//         "id": 1,
//         "name": "Lorem Restaurant 1",
//         "phone": "(567)-364-786",  
//         "address": "0001 Lorem wy, Ipsum, LM",
//         "photo": "/images/restLorem1.jpg",
//     },
//     {
//         "id": 2,
//         "name": "Lorem Restaurant 2",
//         "phone": "(567)-364-786",
//         "address": "0010 Lorem wy, Ipsum, LM",
//         "photo": "/images/restLorem2.jpg",
//     },
//     {
//         "id": 3,
//         "name": "Lorem Restaurant 3",
//         "phone": "(567)-364-786",
//         "address": "0011 Lorem wy, Ipsum, LM",
//         "photo": "/images/restLorem3.jpg",
//     },
//     {
//         "id": 4,
//         "name": "Lorem Restaurant 4",
//         "phone": "(567)-364-786",
//         "address": "0100 Lorem wy, Ipsum, LM",
//         "photo": "/images/restLorem4.jpg",
//     },
//     {
//         "id": 5,
//         "name": "Lorem Restaurant 5",
//         "phone": "(567)-364-786",
//         "address": "0101 Lorem wy, Ipsum, LM",
//         "photo": "/images/restLorem5.jpg",
//     },
//     {
//         "id": 6,
//         "name": "Lorem Restaurant 6",
//         "phone": "(567)-364-786",
//         "address": "0110 Lorem wy, Ipsum, LM",
//         "photo": "/images/restLorem6.jpg",
//     },
//     {
//         "id": 7,
//         "name": "Lorem Restaurant 7",
//         "phone": "(567)-364-786",
//         "address": "0111 Lorem wy, Ipsum, LM",
//         "photo": "/images/restLorem7.jpg",
//     },
//     {
//         "id": 8,
//         "name": "Lorem Restaurant 8",
//         "phone": "(567)-364-786",
//         "address": "1001 Lorem wy, Ipsum, LM",
//         "photo": "/images/restLorem8.jpg",
//     }
// ];

/*

    the variable for the lastID of the restaurantData array.
    Used by the function getNextID().

*/
// let lastID = restaurantData.length - 1;

// function getNextID() {
//     return ++lastID;
// }


/*

    the function for the restaurantData array

*/
const getRestaurants = async () => {
    try{
        const results = await pool.query(`SELECT * FROM restaurants`);
        return results.rows;
    } catch(error){
        console.error(error.message);
    }
}

/*

    the function to search the restaurantData array for a specific
    restaurant by id.

*/
const getRestaurant = async (id) => {
    try{
        const results = await pool.query(`
            SELECT * FROM restaurants
            WHERE id=$1
            `, [id]);

        return results.rows[0];
    } catch (error) {
        console.error(error.message);
    }
}

/*

    the function to add a restarant and iterates the data into the 
    restaurantData array.

*/
const createRestaurant = async (newRestaurant) => { 
    try{
        const { name, phone, address, photo } = newRestaurant;
        const results = await pool.query(`
            INSERT INTO restaurants (name, phone, address, photo)
            VALUES ($1, $2, $3, $4)
            RETURNING *;
            `, [name, phone, address, photo])
        
        return results.rows[0];
    } catch (error) {
        console.error(error.message);
    }
}

/*

    deleteRestaurant() deletes the restauarnt given by the id as parameter.    

*/
const deleteRestaurant = async (id) => {
    try {
        const result = await pool.query(`
            DELETE FROM restaurants 
            WHERE id = $1
            `, [id]);

        return result.rows;
    } catch (error) {
        console.error(error.message);
    }
}

/*

    the function to search the restaurantData array for reviews for a specific
    restaurant by id.

*/
const reviewsForRestaurant = async (id) => {
    try {
        const result = await pool.query(`
            SELECT * FROM reviews WHERE restaurant_id = $1;
            `, [id]);

        return result.rows;
    } catch (error) {
        console.error(error.message);
    }
}

export { getRestaurants, getRestaurant, reviewsForRestaurant , createRestaurant, deleteRestaurant };