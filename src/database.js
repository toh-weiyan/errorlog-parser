import sql from 'mssql';

const dbConfig = {
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    server: process.env.DATABASE_HOST,
    database: process.env.DATABASE_NAME,
    port: parseInt(process.env.DATABASE_PORT),
    options: {
        encrypt: true, // for azure
        trustServerCertificate: true // change to true for local dev / self-signed certs
    }
};

function whatIsdbConfig() {
    console.log('dbConfig', dbConfig)
}

const poolPromise = new sql.ConnectionPool(dbConfig)
    .connect()
    .then(pool => {
        console.log('Connected to MSSQL');
        return pool;
    })
    .catch(err => console.error('Database connection failed!', err));


export {sql, whatIsdbConfig, poolPromise};