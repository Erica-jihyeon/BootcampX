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
const limit = args[1];

pool.connect()
.then(() => console.log('db connected'))
.catch(err => console.error('db connection error', err.stack));

// pool.query(`
// SELECT students.id as student_id, students.name as name, cohorts.name as cohort
// FROM students
// JOIN cohorts ON cohorts.id = students.cohort_id
// LIMIT 5;
// `)
// .then(res => {
//   // console.log(res.rows);
//   res.rows.forEach(user => {
//     console.log(`${user.name} has an id of ${user.student_id} and was in the ${user.cohort} cohort`)
//   })
// })
// .catch(err => console.error('query error', err.stack));

const queryString = `
  SELECT students.id as student_id, students.name as name, cohorts.name as cohort
  FROM students
  JOIN cohorts ON cohorts.id = cohort_id
  WHERE cohorts.name LIKE $1
  LIMIT $2;
  `;

const values = [`%${cohort}%`, limit];

pool.query(queryString, values)
.then(res => {
  // console.log(res.rows);
  res.rows.forEach(user => {
    console.log(`${user.name} has an id of ${user.student_id} and was in the ${user.cohort} cohort`)
  })
})
.catch(err => console.error('query error', err.stack));