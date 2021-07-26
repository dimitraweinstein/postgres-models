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

    static async getById(id) {
        const { rows } = await pool.query(
            `SELECT * 
            FROM students
            WHERE id=$1`, [id]
        );
        return new Student(rows[0]);
    }

    static async updateById(id, { firstName, lastName, status }) {
        const existingStudent = await Student.getById(id);

        const newFirstName = firstName ?? existingStudent.firstName;
        const newLastName = lastName ?? existingStudent.lastName;
        const newStatus = status ?? existingStudent.status;

        const { rows } = await pool.query(
            `UPDATE students
            SET first_name=$1, last_name=$2, status=$3
            RETURNING *`,
            [newFirstName, newLastName, newStatus]
        );
        return new Student(rows[0]);
    }

    static async deleteById(id) {
        const { rows } = await pool.query(
            `DELETE FROM students
            WHERE id=$1
            RETURNING *`,
            [id]
        );
        return new Student(rows[0]);
    }
}