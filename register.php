<?php
    $firstName = $_POST['firstName'];
    $lastName = $_POST['lastName'];
    $userName = $_POST['userName'];
    $email = $_POST['email'];
    $gender = $_POST['gender'];
    $password = $_POST['password'];

    $conn = new mysqli('localhost','root','12345','registration');
    if ($conn->connect_error){
        die('Connection Failed : '.$conn->connect_error);
    }
    else{
        $stmt = $conn->prepare("insert into person_info(firstName, lastName, userName, email, gender, password)
        values (?, ?, ?, ?, ?, ?) ");
        $stmt-> bind_param("ssssss",$firstName, $lastName, $userName, $email, $gender, $password);
        $stmt->execute();
        header("Location: succesfulReg.html");
        $stmt->close();
        $conn->close();
    }

?>