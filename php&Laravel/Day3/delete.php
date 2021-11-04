<?php
require 'db.connection.php';
session_start();
$message = '';
$id = $_GET['id'];

$id = filter_var($id, FILTER_SANITIZE_NUMBER_INT);
if (!filter_var($id, FILTER_VALIDATE_INT)) {
    echo 'not valid ID';
} else {
    $sql = 'DELETE FROM `users` WHERE `id`=' . $id;
    $op = mysqli_query($conn, $sql);
    if (!$op) {
        $message = ' cannot delete';
    } else {
        $message = 'user deleted';

        header('Location: read.php');
    }
    $_SESSION['message'] = $message;
}
