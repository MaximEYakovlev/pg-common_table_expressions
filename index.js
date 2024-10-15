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

async function calculateSum() {
    try {
        const [result, metadata] = await sequelize.query(`
            WITH RECURSIVE t(n) AS (
                VALUES (1)
              UNION ALL
                SELECT n+1 FROM t WHERE n < 100
            )
            SELECT sum(n) FROM t;
        `);
        console.log('sum:', result[0].sum);
    } catch (error) {
        console.error('error executing query:', error);
    }
}

const run = async () => {
    await connect();
    await createTable();
    await insert();
    await createCTE();
    await calculateSum();
}

run();