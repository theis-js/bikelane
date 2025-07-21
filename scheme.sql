-- Table structure for the database
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL UNIQUE,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Mock data for users
INSERT INTO users (username, first_name, last_name, email, password)
VALUES 
('test1', 'John', 'Doe', 'jdoe@example.com', '1test'),
('t', 'John', 'Doe', 'd@example.com', 'g'),
('test2', 'Alice', 'Smith', 'asmith@example.com', '2test');