import pool from '../utils/pool';

export default class Beanie {
    id;
    name;
    theme;
    animal;
    releaseYear;

    constructor(row) {
        this.id = row.id;
        this.name = row.name;
        this.theme = row.theme;
        this.animal = row.animal;
        this.releaseYear = row.release_year;
    }

    static async insert({ name, theme, animal, releaseYear }) {
    const { rows } = await pool.query(
        'INSERT INTO beanies (name, theme, animal, release_year)  VALUES ($1, $2, $3, $4)RETURNING *',
        [name, theme, animal, releaseYear]
    );
        return new Beanie(rows[0]);
    }
    
}


