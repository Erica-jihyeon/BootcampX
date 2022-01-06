const { Pool } = require('pg');
const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
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