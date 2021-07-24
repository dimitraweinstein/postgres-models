import pool from '../utils/pool';

export default class Roots {
    id;
    album;
    recordingLabel;
    releaseYear;

    constructor(row) {
        this.id = row.id;
        this.album = row.album;
        this.recordingLabel = row.recording_label;
        this.releaseYear = row.release_year;
    }

    static async insert({ album, recordingLabel, releaseYear }) {
        const { rows } = await pool.query(
            'INSERT INTO roots_albums (album, recording_label, release_year) VALUES ($1, $2, $3) RETURNING *',
            [album, recordingLabel, releaseYear]
        );
        return new Roots(rows[0]);
    }

    static async getAll() {
        const { rows } = await pool.query(
            'SELECT * FROM roots_albums', []
        );
        return rows.map((row) => new Roots(row));
    }

    static async getById(id) {
        const { rows } = await pool.query(
            `SELECT *
            FROM roots_albums
            WHERE id=$1`, [id]);
        
        return new Roots(rows[0]);
    }
}