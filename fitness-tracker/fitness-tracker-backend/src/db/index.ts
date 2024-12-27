import { Client } from 'pg';

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'fitness-tracker',
    password: 'root',
    port: 5432,
});

client.connect()
    .then(() => console.log('Connected to PostgreSQL'))
    .catch((err) => console.error('Connection error', err.stack));

export default client;
