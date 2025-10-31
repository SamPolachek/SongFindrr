import { Pool } from 'pg';
import { supabase } from '../../lib/supabaseClient';

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
});

export default async function handler(req, res) {
    try {
        const result = await pool.query('SELECT NOW()');
        res.status(200).json({ success: true, time: result.rows[0].now });
    } catch(error) {
        console.error(error);
        res.status(500).json({ success: false, error: error.message });
    }
}

export default async function handler2(req, res) {
  const { data, error } = await supabase.from('test_items').select('*');

  if (error) return res.status(500).json({ error: error.message });

  res.status(200).json(data);
}