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
    
    static async getAll() {
        const { rows } = await pool.query(
            'SELECT * FROM beanies',
            []
        );
        return rows.map((row) => new Beanie(row));
    }

    static async getById(id) {
        const { rows } = await pool.query(
            'SELECT * FROM beanies WHERE id=$1', [id]);
        
        return new Beanie(rows[0]);
    }

    static async updateById(id, { name, theme, animal, releaseYear }) {
        const existingBeanie = await Beanie.getById(id);
        const newName = name ?? existingBeanie.name;
        const newTheme = theme ?? existingBeanie.theme;
        const newAnimal = animal ?? existingBeanie.animal;
        const newReleaseYear = releaseYear ?? existingBeanie.releaseYear;

        const { rows } = await pool.query(
            `UPDATE beanies
            SET name=$1, theme=$2, animal=$3, release_year=$4
            RETURNING *`,
            [newName, newTheme, newAnimal, newReleaseYear]
        );

        return new Beanie(rows[0]);
    }

    static async deleteById(id) {
        const { rows } = await pool.query(
        `DELETE FROM beanies 
        WHERE id=$1
        RETURNING *`, [id]
        );
        
        return new Beanie(rows[0]);
    }
}


