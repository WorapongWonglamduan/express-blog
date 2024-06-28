import mysql from "mysql";
import path from "path";
import { fileURLToPath } from "url";

// Convert import.meta.url to __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const caCertPath = path.resolve(__dirname, "path/to/ca-cert.pem"); // Adjust the path as needed

// Create a MySQL connection pool
export const db = mysql.createPool({
  connectionLimit: 10,
  host: "gateway01.ap-southeast-1.prod.aws.tidbcloud.com",
  user: "d4rn89886WyLoCC.root",
  password: "P3EGNs1U3AuGFoIa",
  database: "db_blog_app",
  port: 4000,
  ssl: {
    rejectUnauthorized: false,
    ca: caCertPath,
  },
});

db.getConnection((err, connection) => {
  if (err) {
    console.error("Error connecting to the database:", err.message);
    return;
  }
  if (connection) {
    console.log("Connected to the database successfully!");
    connection.release(); // Release the connection back to the pool
  }
});

// Handle connection loss
db.on("error", (err) => {
  console.error("Database error:", err);
  if (err.code === "PROTOCOL_CONNECTION_LOST") {
    console.error("Attempting to reconnect...");
    // Recreate the connection pool
    db = mysql.createPool({
      connectionLimit: 10,
      host: "gateway01.ap-southeast-1.prod.aws.tidbcloud.com",
      user: "d4rn89886WyLoCC.root",
      password: "P3EGNs1U3AuGFoIa",
      database: "db_blog_app",
      port: 4000,
      ssl: {
        rejectUnauthorized: false,
        ca: caCertPath,
      },
    });
  } else {
    throw err; // Throw the error if it is not related to connection loss
  }
});
