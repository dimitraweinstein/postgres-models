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

    static async updateById(id, { album, recordingLabel, releaseYear }) {
        const existingRootsAlbum = await Roots.getById(id);
        const newAlbumName = album ?? existingRootsAlbum.album;
        const newRecordingLabel = recordingLabel ?? existingRootsAlbum.recordingLabel;
        const newReleaseYear = releaseYear ?? existingRootsAlbum.releaseYear;

        const { rows } = await pool.query(
            `UPDATE roots_albums
            SET album=$1, recording_label=$2, release_year=$3
            RETURNING *`,
            [newAlbumName, newRecordingLabel, newReleaseYear]
        );
        return new Roots(rows[0]);
    }

    static async deleteById(id) {
        const { rows } = await pool.query(
            `DELETE FROM roots_albums
            WHERE id = $1
            RETURNING *`,
            [id]
        );
        return new Roots(rows[0]);
    }
    
}