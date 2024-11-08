/* 
 Initialize the data in the DB 

    11/6/2024 - File was created by professor
    11/6/2024 - Edited by jtenorio
    11/7/2024 - Edited by jtenorio
*/
import { pool } from './database.js';

const dropTables = async () => {
    try {
        const dropTablesQuery = `
            DROP TABLE IF EXISTS reviews;
            DROP TABLE IF EXISTS restaurants;
        `;
        await pool.query(dropTablesQuery);
        console.log("Successfully dropped tables for restaurants and reviews");
    } catch (error) {
        console.log(error)
    }
}

const createTables = async () => {
    try {
        const createTablesQuery = `
            CREATE TABLE IF NOT EXISTS restaurants (
                id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
                name TEXT NOT NULL,
                address TEXT NOT NULL,
                phone TEXT NOT NULL,
                photo TEXT NOT NULL
            );

            CREATE TABLE IF NOT EXISTS reviews (
                id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
                rating INT NOT NULL,
                content TEXT NOT NULL,
                restaurant_id INT REFERENCES restaurants(id) ON DELETE CASCADE
            );
        `;
        await pool.query(createTablesQuery);
        console.log("Successfully created tables for restaurants and reviews");
    } catch (error) {
        console.log(error)
    }
}

const insertData = async () => {
    try {
        const insertDataQuery = `
            INSERT INTO restaurants (name, phone, address, photo)
            VALUES
                ('Lorem Restaurant 1', '(567)-364-786', '0110 Lorem wy, Ipsum, LM', '/images/restLorem1.jpg'),
                ('Lorem Restaurant 2', '(567)-364-786', '0111 Lorem wy, Ipsum, LM', '/images/restLorem2.jpg'),
                ('Lorem Restaurant 3', '(567)-364-786', '1001 Lorem wy, Ipsum, LM', '/images/restLorem3.jpg'),
                ('Lorem Restaurant 4', '(567)-364-786', '0110 Lorem wy, Ipsum, LM', '/images/restLorem4.jpg'),
                ('Lorem Restaurant 5', '(567)-364-786', '0111 Lorem wy, Ipsum, LM', '/images/restLorem5.jpg'),
                ('Lorem Restaurant 6', '(567)-364-786', '0110 Lorem wy, Ipsum, LM', '/images/restLorem6.jpg'),
                ('Lorem Restaurant 7', '(567)-364-786', '0111 Lorem wy, Ipsum, LM', '/images/restLorem7.jpg'),
                ('Lorem Restaurant 8', '(567)-364-786', '1001 Lorem wy, Ipsum, LM', '/images/restLorem8.jpg');

            INSERT INTO reviews (restaurant_id, rating, content)
            VALUES
                (1, 5, 'Lorem lorem'),
                (2, 3, 'Ipsum ipsum'),
                (2, 4, 'Ipsum dolor'),
                (3, 1, 'Sit amet'),
                (4, 2, 'Consectetur adipisicing'),
                (4, 4, 'Adipisicing elit'),
                (7, 3, 'Amet consectetur'),
                (8, 3, 'Ipsum amet'),
                (5, 4, 'Elit consectetur');
        `;
        //Lorem ipsum dolor sit amet consectetur adipisicing elit
        await pool.query(insertDataQuery);
        console.log("Successfully inserted data into restaurants and reviews");
    } catch (error) {
        console.log(error)
    }
}

const setup = async () => {
    await dropTables();
    await createTables();
    await insertData();
}

setup();
