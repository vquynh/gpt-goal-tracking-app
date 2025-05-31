import { Pool } from 'pg';

const pool = new Pool(
    {
        user: process.env.PGUSER || '',
        password: process.env.PGPASSWORD,
        host: process.env.PGHOST,
        port: process.env.PGPORT ? parseInt(process.env.PGPORT, 10) : 5432,
        database: process.env.PGDATABASE,
    }
);

export default pool;