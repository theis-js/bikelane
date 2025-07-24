-- Table structure for the database
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL UNIQUE,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created TIMESTAMP NOT NULL DEFAULT NOW(),
    role VARCHAR(50) NOT NULL DEFAULT "user"
);

-- Mock data for users
INSERT INTO users (username, first_name, last_name, email, password, role)
VALUES 
('t', 'John', 'Doe', 'd@example.com', 'g', 'admin');

INSERT INTO users (username, first_name, last_name, email, password)
VALUES 
('test1', 'John', 'Doe', 'jdoe@example.com', '1test'),
('test2', 'Alice', 'Smith', 'asmith@example.com', '2test'),
('test3', 'Bob', 'Johnson', 'bjohnson@example.com', '3test'),
('test4', 'Carol', 'Williams', 'cwilliams@example.com', '4test'),
('test5', 'David', 'Brown', 'dbrown@example.com', '5test'),
('test6', 'Eve', 'Davis', 'edavis@example.com', '6test'),
('test7', 'Frank', 'Miller', 'fmiller@example.com', '7test'),
('test8', 'Grace', 'Wilson', 'gwilson@example.com', '8test'),
('test9', 'Hank', 'Moore', 'hmoore@example.com', '9test'),
('test10', 'Ivy', 'Taylor', 'itaylor@example.com', '10test'),
('test11', 'Jack', 'Anderson', 'janderson@example.com', '11test'),
('test12', 'Kathy', 'Thomas', 'kthomas@example.com', '12test'),
('test13', 'Leo', 'Jackson', 'ljackson@example.com', '13test'),
('test14', 'Mona', 'White', 'mwhite@example.com', '14test'),
('test15', 'Nina', 'Harris', 'nharris@example.com', '15test'),
('test16', 'Oscar', 'Martin', 'omartin@example.com', '16test'),
('test17', 'Paul', 'Thompson', 'pthompson@example.com', '17test'),
('test18', 'Quinn', 'Garcia', 'qgarcia@example.com', '18test'),
('test19', 'Rita', 'Martinez', 'rmartinez@example.com', '19test'),
('test20', 'Sam', 'Robinson', 'srobinson@example.com', '20test'),
('test21', 'Tina', 'Clark', 'tclark@example.com', '21test'),
('test22', 'Uma', 'Rodriguez', 'urodriguez@example.com', '22test'),
('test23', 'Vince', 'Lewis', 'vlewis@example.com', '23test'),
('test24', 'Wendy', 'Lee', 'wlee@example.com', '24test'),
('test25', 'Xander', 'Walker', 'xwalker@example.com', '25test'),
('test26', 'Yara', 'Hall', 'yhall@example.com', '26test'),
('test27', 'Zane', 'Allen', 'zallen@example.com', '27test'),
('test28', 'Amy', 'Young', 'ayoung@example.com', '28test'),
('test29', 'Ben', 'King', 'bking@example.com', '29test'),
('test30', 'Cathy', 'Wright', 'cwright@example.com', '30test'),
('test31', 'Dan', 'Scott', 'dscott@example.com', '31test'),
('test32', 'Ella', 'Green', 'egreen@example.com', '32test'),
('test33', 'Finn', 'Baker', 'fbaker@example.com', '33test'),
('test34', 'Gina', 'Adams', 'gadams@example.com', '34test'),
('test35', 'Hugo', 'Nelson', 'hnelson@example.com', '35test'),
('test36', 'Iris', 'Carter', 'icarter@example.com', '36test'),
('test37', 'Jake', 'Mitchell', 'jmitchell@example.com', '37test'),
('test38', 'Kara', 'Perez', 'kperez@example.com', '38test'),
('test39', 'Liam', 'Roberts', 'lroberts@example.com', '39test'),
('test40', 'Mia', 'Turner', 'mturner@example.com', '40test'),
('test41', 'Noah', 'Phillips', 'nphillips@example.com', '41test'),
('test42', 'Olga', 'Campbell', 'ocampbell@example.com', '42test');