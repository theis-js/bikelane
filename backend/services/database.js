import mysql from "mysql2";
import dotenv from "dotenv";
import { error } from "console";
dotenv.config();

// Create a MySQL connection pool using environment variables for configuration
const pool = mysql
  .createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  })
  .promise();

// Function to authenticate a user by username and password
export async function loginUser(username, password) {
  // Query the users table for a matching username and password
  const [result] = await pool.query(
    "SELECT * FROM users WHERE username = ? AND password = ?",
    [username, password]
  );

  // If a user is found, return success and user data
  if (result.length > 0 && result[0].role === "admin") {
    console.log("User found: ", result[0].username, " ", result[0].id);
    return { success: true, user: result[0] };
  } else {
    // If no user is found, return failure message
    console.error(`Invalid username or password!; ${result[0]}`);
    return { success: false, message: "Invalid username or password" };
  }
}

// Function to create a new user in the database
export async function createUser(
  username,
  first_name,
  last_name,
  password,
  email
) {
  try {
    // Insert a new user record into the users table
    const [result] = await pool.query(
      "INSERT INTO users (username, first_name, last_name, password, email) VALUES (?, ?, ?, ?, ?)",
      [username, first_name, last_name, password, email]
    );

    console.log("User created successfully!");
    return { success: true, message: "User created successfully!" };
  } catch (error) {
    // Handle errors during user creation
    console.log("Error creating user: ", error);
    return { success: false, message: "Error creating user!" };
  }
}

// Function to update an existing user's information
export async function updateUser(
  username,
  first_name,
  last_name,
  password,
  email
) {
  try {
    // Update user details based on username
    const [result] = await pool.query(
      "UPDATE users SET first_name = ?, last_name = ?, password = ?, email = ? WHERE username = ?",
      [first_name, last_name, password, email, username]
    );
    const resultOfquery = result.affectedRows;

    // If a user was updated, return success
    if (resultOfquery > 0) {
      console.log("User updated successfully!");
      return {
        success: true,
        message: "User updated successfully!",
        resultOfquery: result,
      };
    }

    // If no user was updated, return failure
    if (resultOfquery === 0) {
      console.log("Error updating user!");
      return {
        success: false,
        message: "Error updating user!",
        resultOfquery: null,
      };
    }
  } catch (err) {}
}

// Function to delete a user from the database
export async function deleteUser(id) {
  try {
    // Delete user based on username and password
    const [result] = await pool.query(
      "DELETE FROM users WHERE id = ?",
      [id]
    );
    const resultOfquery = result.affectedRows;

    // If a user was deleted, return success
    if (resultOfquery > 0) {
      console.log("User deleted successfully!");
      return {
        success: true,
        message: "User deleted successfully!",
        resultOfquery: result,
      };
    }

    // If no user was deleted, return failure
    if (resultOfquery === 0) {
      console.log("Error deleting user!");
      return {
        success: false,
        message: "Error deleting user!",
        resultOfquery: null,
      };
    }
  } catch (err) {}
}

export async function getAllUsers() {
  try {
    const [data] = await pool.query("SELECT * FROM users;");
    return { result: data, success: true };
  } catch (err) {
    return { result: err, success: false };
  }
}
