import pool from '../utils/pool';

export default class Owl {
    id;
    owl;
    habitat;
    threats;

    constructor(row) {
        this.id = row.id;
        this.owl = row.owl;
        this.habitat = row.habitat;
        this.threats = row.threats;
    }

    static async insert({ owl, habitat, threats }) {
        const { rows } = await pool.query(
            'INSERT INTO owls (owl, habitat, threats) VALUES ($1, $2, $3) RETURNING *',
            [owl, habitat, threats]
        );
        return new Owl(rows[0]);
    }
}