import pool from '../utils/pool';

export default class RootsAlbums {
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

    
}