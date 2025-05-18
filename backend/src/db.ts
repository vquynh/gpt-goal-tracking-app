import { Pool } from 'pg';

const pool = new Pool(
    {
        user: '',
        password: 'postgres',
        host: 'localhost',
        port: 5432,
        database: 'postgres',
    }
);

export default pool;