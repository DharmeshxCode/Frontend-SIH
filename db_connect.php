<?php
$host = "localhost";   // or your Supabase host if using Supabase
$user = "root";        // DB username
$pass = "";            // DB password (default empty for XAMPP)
$dbname = "student_login_db"; // your database name

$conn = new mysqli($host, $user, $pass, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
