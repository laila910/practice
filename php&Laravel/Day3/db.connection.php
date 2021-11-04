<?php
$server = 'localhost';
$user = 'root';
$pass = '';
$dbname = 'nti';

$conn = mysqli_connect($server, $user, $pass, $dbname);
if (!$conn) {
    die('Error Message ' . mysqli_connect_error());
}
