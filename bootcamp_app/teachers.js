require('dotenv').config();

const { Pool } = require('pg');
const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT
});

const args = process.argv.slice(2);
const cohort = args[0];


pool.connect()
.then(() => console.log('db connected'))
.catch(err => console.error('db connection error', err.stack));


const queryString = `SELECT DISTINCT teachers.name as teacher, cohorts.name as cohort
FROM assistance_requests
JOIN students ON students.id = student_id
JOIN cohorts ON cohorts.id = cohort_id
JOIN teachers ON teachers.id = teacher_id
WHERE cohorts.name = $1
ORDER BY teacher;
`;

pool.query(queryString, [cohort])
.then(res => {
    // console.log(res.rows);
    res.rows.forEach(row => {
      console.log(`${row.cohort}: ${row.teacher}`)
    })
  }
)
.catch(err => console.error('query error', err.stack));