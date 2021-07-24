import pool from '../utils/pool';

export default class RootsAlbum {
    id;
    album;
    recordingLabel;
    releaseYear;

    constructor(row) {
        this.id = row.id;
        this.album = row.album;
        this.recordingLabel = row.recordingLabel;
        this.releaseYear = row.releaseYear;
    }

    static async insert({ album, recordingLabel, releaseYear }) {
        const { rows } = await pool.query(
        'INSERT into roots_albums (album, recording_label, release_year) VALUES ($1, $2, $3) RETURNING *',
        [album, recordingLabel, releaseYear]
    );
        return new RootsAlbum(rows[0]);
    }


}
