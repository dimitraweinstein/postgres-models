import pool from '../utils/pool';

export default class Student {
    id;
    firstName;
    lastName;
    status;

    constructor(row) {
        this.id = row.id;
        this.firstName = row.first_name;
        this.lastName = row.last_name;
        this.status = row.status;
    }

    static async insert({ firstName, lastName, status }) {
        const { rows } = await pool.query(
            'INSERT INTO students (first_name, last_name, status) VALUES ($1, $2, $3) RETURNING *',
            [firstName, lastName, status]
        );
        return new Student(rows[0]);
    }

    static async getAll() {
        const { rows } = await pool.query(
            'SELECT * FROM students',
            []
        );
        return rows.map((row) => new Student(row));
    }
}