<?php
session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $userName = $_POST['userName'];
    $password = $_POST['password'];

    $host = "localhost";
    $dbusername = "root";
    $dbpassword = "12345";
    $dbname = "registration";

    // Create connection
    $conn = new mysqli($host, $dbusername, $dbpassword, $dbname);

    // Check connection
    if ($conn->connect_error) {
        die("Connection Failed: " . $conn->connect_error);
    }

    // Original query to find the user
    $query = "SELECT * FROM person_info WHERE userName='$userName' AND password='$password'";
    $result = $conn->query($query);

    // If user is found
    if ($result->num_rows == 1) {
        $row = $result->fetch_assoc();

        // Set session variables based on role
        $_SESSION['userName'] = $userName;
        $_SESSION['role'] = $row['role']; // Assume 'role' column exists in person_info

        // Redirect based on role
        if ($row['role'] === 'admin') {
            $_SESSION['isAdmin'] = true; // Only set for admins
            header("Location: index.php");
        } else {
            header("Location: Account_Landing.html?userName=" . urlencode($userName)); // Redirect to user page for regular users
        }
        exit();
    } else {
        // Redirect to the error page if login fails
        header("Location: account_error.html");
        exit(); 
    }

    // Close the connection
    $conn->close();
}

// if ($_SERVER["REQUEST_METHOD"] == "POST") {
//     $userName = $_POST['userName'];
//     $password = $_POST['password'];

//     $host = "localhost";
//     $dbusername = "root";
//     $dbpassword = "12345";
//     $dbname = "registration";

//     $conn = new mysqli($host, $dbusername, $dbpassword, $dbname);

//     if ($conn->connect_error) {
//         die("Connection Failed: " . $conn->connect_error);
//     }

//     $query = "SELECT * FROM person_info WHERE userName='$userName' AND password='$password'";
//     $result = $conn->query($query);

//     if ($result->num_rows == 1) {
//         header("Location: Account_Landing.html?userName=" . urlencode($userName));
//         exit(); 
//     } else {
//         header("Location: account_error.html");
//         exit(); 
//     }

//     $conn->close();
// }
?>
