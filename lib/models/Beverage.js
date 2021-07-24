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

    static async getAll() {
    const { rows } = await pool.query(
        'SELECT * FROM beverages',
        []
    );
    return rows.map((row) => new Beverage(row));
    }

    static async getById(id) {
        const { rows } = await pool.query(
            'SELECT * FROM beverages WHERE id=$1',
            [id]);
        
        return new Beverage(rows[0]);
    }

    static async updateById(id, { name, category, type }) {
        const existingBeverage = await Beverage.getById(id);
        const newName = name ?? existingBeverage.name;
        const newCategory = category ?? existingBeverage.category;
        const newType = type ?? existingBeverage.type;
        
        const { rows } = await pool.query(
            `UPDATE beverages
            SET name=$1, category=$2, type=$3
            RETURNING *`,
            [newName, newCategory, newType]
        );
        return new Beverage(rows[0]);
    }
}

  