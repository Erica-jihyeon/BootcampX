SELECT assignments.id, name, day, chapter, count(assistance_requests) as total_requests
FROM assignments
JOIN assistance_requests ON assignments.id = assignment_id
GROUP BY assignments.id
ORDER BY total_requests DESC;


-- the other way
-- SELECT id, name, day, chapter, total_requests
-- FROM(
-- SELECT assignment_id, count(*) as total_requests
-- FROM assistance_requests
-- WHERE assignment_id IS NOT NULL
-- GROUP BY assignment_id
-- ORDER BY total_requests DESC) as requests_table
-- JOIN assignments ON requests_table.assignment_id = assignments.id;