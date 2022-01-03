SELECT students.name as student, avg(assignment_submissions.duration) as average_assignment_duration, avg(assignments.duration) as average_estimated_duration
FROM students
JOIN assignment_submissions ON student_id = students.id
JOIN assignments ON assignments.id = assignment_id
WHERE end_date IS NULL
GROUP BY student
HAVING avg(assignment_submissions.duration) < avg(assignments.duration)
ORDER BY average_assignment_duration;

-- My answer, using subquery
-- SELECT students.name as student, avg(assignment_submissions.duration) as average_assignment_duration, (SELECT avg(duration) FROM assignments) as average_estimated_duration
-- FROM assignment_submissions
-- JOIN students ON students.id = student_id
-- WHERE students.end_date IS NULL
-- GROUP BY student
-- HAVING avg(assignment_submissions.duration) < (SELECT avg(duration) FROM assignments)
-- ORDER BY average_assignment_duration;