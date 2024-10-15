const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postgres_db', 'user', 'password', {
    host: 'localhost',
    dialect: 'postgres'
});

const connect = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

const createTable = async () => {
    await sequelize.query(`
        CREATE TABLE IF NOT EXISTS persons (id SERIAL NOT NULL PRIMARY KEY, name VARCHAR(10)); 
    `);
}

const insert = async () => {
    await sequelize.query(`
        INSERT INTO persons (name) VALUES ('Max');
    `);
}

const createCTE = async () => {
    await sequelize.query(`
        WITH testCTE AS (SELECT name FROM persons)
        SELECT * FROM testCTE;
    `);
}

const run = async () => {
    await connect();
    await createTable();
    await insert();
    await createCTE();
}

run();