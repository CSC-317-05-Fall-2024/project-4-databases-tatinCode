/*

 database.js - Establish the DB connection pool

    11/6/2024 - File was created by professor
    11/6/2024 - Edited by jtenorio (finished)
*/
import pg from 'pg';
import dotenv from 'dotenv';

//load environment variables from the .env file
dotenv.config();


//sets up the connection configuration
const config = {
    connectionString: process.env.CONNECTION_STRING,
};

export const pool = new pg.Pool(config);