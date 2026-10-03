import type { LabSpec } from './types';

// Built-in starter labs so the practice environment is useful immediately, before lesson-specific labs are
// authored. Each seeds a small sample database. These are static content (no secrets, no network), safe to ship.

const EMPLOYEES_SEED = `
CREATE TABLE employees (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  department TEXT NOT NULL,
  salary INTEGER NOT NULL,
  hired TEXT NOT NULL
);
INSERT INTO employees (id, name, department, salary, hired) VALUES
  (1, 'Amina Yusuf',   'Engineering', 95000, '2021-03-01'),
  (2, 'Rahul Verma',   'Engineering', 82000, '2022-07-15'),
  (3, 'Sara Khan',     'Marketing',   61000, '2020-01-20'),
  (4, 'Diego Morales', 'Sales',       73000, '2019-11-05'),
  (5, 'Mei Chen',      'Engineering', 110000,'2018-06-30'),
  (6, 'Omar Farouk',   'Sales',       68000, '2023-02-11'),
  (7, 'Lena Petrova',  'Marketing',   72000, '2021-09-09');
`.trim();

export const BUILTIN_LABS: LabSpec[] = [
  {
    id: 'sql-playground',
    engine: 'sql',
    title: 'SQL playground',
    instructions: [
      'A sample **`employees`** table is loaded for you (columns: `id`, `name`, `department`, `salary`, `hired`).',
      '',
      'Run any SQL you like — `SELECT`, `INSERT`, `CREATE`, joins, aggregates. The database resets on every run, so experiment freely.',
    ].join('\n'),
    seedSql: EMPLOYEES_SEED,
    starterCode: 'SELECT name, department, salary\nFROM employees\nORDER BY salary DESC;',
    solutionCode: 'SELECT name, department, salary\nFROM employees\nORDER BY salary DESC;',
    checks: [],
  },
  {
    id: 'sql-filter',
    engine: 'sql',
    title: 'Challenge: high earners',
    instructions: [
      '**Task:** Return the `name` and `salary` of every employee in the **Engineering** department who earns **more than 90000**, ordered by `salary` descending.',
      '',
      'The `employees` table is already loaded. Press **Run** to check your answer.',
    ].join('\n'),
    seedSql: EMPLOYEES_SEED,
    starterCode: '-- Write a SELECT that returns name and salary\nSELECT\nFROM employees;',
    solutionCode:
      "SELECT name, salary\nFROM employees\nWHERE department = 'Engineering' AND salary > 90000\nORDER BY salary DESC;",
    checks: [
      {
        name: 'Returns the correct high earners',
        sql: "SELECT name, salary FROM employees WHERE department = 'Engineering' AND salary > 90000 ORDER BY salary DESC;",
        expect: [
          ['Mei Chen', 110000],
          ['Amina Yusuf', 95000],
        ],
      },
    ],
  },
  {
    id: 'sql-aggregate',
    engine: 'sql',
    title: 'Challenge: average salary by department',
    instructions: [
      '**Task:** Return each `department` and its **average salary** as a column named `avg_salary`, ordered by `department` ascending.',
      '',
      'Tip: use `GROUP BY` and `AVG(...)`. Alias the average with `AS avg_salary`.',
    ].join('\n'),
    seedSql: EMPLOYEES_SEED,
    starterCode: 'SELECT department, /* ... */\nFROM employees\nGROUP BY department;',
    solutionCode:
      'SELECT department, AVG(salary) AS avg_salary\nFROM employees\nGROUP BY department\nORDER BY department ASC;',
    checks: [
      {
        name: 'Correct averages per department',
        sql: 'SELECT department, AVG(salary) AS avg_salary FROM employees GROUP BY department ORDER BY department ASC;',
        expect: [
          ['Engineering', 95666.66666666667],
          ['Marketing', 66500],
          ['Sales', 70500],
        ],
      },
    ],
  },
];
