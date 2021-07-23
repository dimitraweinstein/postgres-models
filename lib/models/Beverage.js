import pool from '../utils/pool';

export default class Beverage {
    id;
    name;
    category;
    type;

    constructor(row) {
        this.id = row.id;
        this.name = row.name;
        this.category = row.category;
        this.type = row.type;            
    }

    static async insert({ name, category, type }) {
        const { rows } = await pool.query(
            'INSERT INTO beverages (name, category, type) VALUES ($1, $2, $3)RETURNING *',
            [name, category, type]
        );
        return new Beverage(rows[0]);
    }
}