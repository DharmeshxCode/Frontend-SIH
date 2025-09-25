<?php
header('Content-Type: application/json');

// Include the database connection file
require_once 'db_connect.php';

// Get the POST data from the frontend
$data = json_decode(file_get_contents("php://input"));

if (isset($data->email) && isset($data->password)) {
    $email = $conn->real_escape_string($data->email);
    $password = $data->password;

    // Password validation (you can add more complex rules)
    if (strlen($password) < 6) {
        http_response_code(400);
        echo json_encode(["message" => "Password must be at least 6 characters long."]);
        $conn->close();
        exit();
    }

    // Hash the password securely
    $password_hash = password_hash($password, PASSWORD_DEFAULT);

    // Start a transaction to ensure both inserts succeed or fail together
    $conn->begin_transaction();

    try {
        // Prepare and execute the query to insert into user_credentials
        $stmt1 = $conn->prepare("INSERT INTO user_credentials (email, password_hash) VALUES (?, ?)");
        $stmt1->bind_param("ss", $email, $password_hash);
        $stmt1->execute();
        
        // Get the ID of the newly created user
        $user_id = $conn->insert_id;

        // Prepare and execute the query to insert a new row in the students table
        $stmt2 = $conn->prepare("INSERT INTO students (student_id) VALUES (?)");
        $stmt2->bind_param("i", $user_id);
        $stmt2->execute();

        // If all queries were successful, commit the transaction
        $conn->commit();

        http_response_code(201);
        echo json_encode(["message" => "Account created successfully!"]);

    } catch (mysqli_sql_exception $exception) {
        $conn->rollback(); // Rollback on error
        http_response_code(409); // Conflict
        echo json_encode(["message" => "Email already exists or a database error occurred."]);

    } finally {
        // Close statements and connection
        $stmt1->close();
        $stmt2->close();
        $conn->close();
    }

} else {
    http_response_code(400);
    echo json_encode(["message" => "Invalid input."]);
}
?>
