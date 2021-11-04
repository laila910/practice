<?PHP

require 'db.connection.php';

function cleanInputs($input)
{
    $input = trim($input);
    $input = stripslashes($input);
    $input = htmlspecialchars($input);
    return $input;
}
$errormessages = array();

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // echo 'hello there';
    $nameMe = cleanInputs($_POST['name']);
    if (empty($nameMe)) {
        $errormessages['name'] = 'your name is empty ';
    } elseif (strlen($nameMe) < 3) {
        $errormessages['name'] = 'your name must be more than 3 characters';
    } elseif (!filter_var($nameMe, FILTER_SANITIZE_STRING)) {
        $errormessages['name'] = 'your name is not string';
    }
    $emaily = cleanInputs($_POST['email']);
    if (empty($emaily)) {
        $errormessages['email'] = 'your email is empty';
    } else if (!filter_var($emaily, FILTER_VALIDATE_EMAIL)) {
        $emaily = filter_var($emaily, FILTER_SANITIZE_EMAIL);
        if (!filter_var($emaily, FILTER_VALIDATE_EMAIL)) {
            $errormessages['email'] = 'not valid email';
        }
    }

    $pass = cleanInputs($_POST['password']);
    if (empty($pass)) {
        $errormessages['password'] = 'your password is empty ';
    } elseif (strlen($pass) < 6) {
        $errormessages['password'] = 'your password must be more than 6 characters';
    }
    if (!empty($_FILES['uploadedfile']['name'])) {
        $name = $_FILES['uploadedfile']['name'];
        $size = $_FILES['uploadedfile']['size'];
        $tmp_name = $_FILES['uploadedfile']['tmp_name'];
        $type = $_FILES['uploadedfile']['type'];
        // echo $name . '<br>' . $tmp_name . '<br>' . $type . '<br>' . $size;
        $arrayfile = explode('.', $name);
        $fileExtension = strtolower($arrayfile[1]);
        // echo $fileExtension;
        $allowedExtentension = ['jpg', 'npg', 'jpeg'];
        $finalName = rand() * time() . '.' . $fileExtension;
        // echo $finalName;
        if (in_array($fileExtension, $allowedExtentension)) {

            $filePath = './uploads/';
            $fileLocation = $filePath . $finalName;
            $status = move_uploaded_file($tmp_name, $fileLocation);
            if (!$status) {
                $errormessages['file'] = 'please upload file';
            }
        }
    } else {
        $errormessages['file'] = 'please upload file';
    }
    // echo '<p width="50%" height="50%">your name is ' . $nameMe . '<br>' . 'your email is ' . $emaily . '<br>' . 'your password is ' . $pass . '</p>';
    if (!$errormessages) {
        // echo 'data entered';
        $sql = "INSERT INTO `users`( `name`, `email`, `password`, `image`) VALUES ('$nameMe','$emaily','$pass','$finalName')";

        $op = mysqli_query($conn, $sql);
        // mysqli_error($conn);
        if (!$op) {
            echo 'failed to insert data ,please try again';
        } else {
            header('Location: read.php');
        }
    } else {
        foreach ($errormessages as $key => $value) {
            echo $key . ':' . $value . '<br>';
        }
    }
}

?>
<!DOCTYPE html>

<html>

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title></title>
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="">
    <!-- CSS only -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.2/dist/css/bootstrap.min.css" rel="stylesheet">
</head>

<body class="container">
    <form method="post" action="<?php echo htmlspecialchars($_SERVER['PHP_SELF']) ?>" enctype="multipart/form-data">
        <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Email address</label>
            <input type="email" class="form-control" name="email" id="exampleInputEmail1" aria-describedby="emailHelp">

        </div>
        <div class="mb-3">
            <label class="form-label">Name</label>
            <input type="name" name="name" class="form-control">

        </div>

        <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">Password</label>
            <input type="password" name="password" class="form-control" id="exampleInputPassword1">
        </div>
        <div class="mb-3">
            <label class="form-label">upload file</label>
            <input type="file" name="uploadedfile">
        </div>

        <button type="submit" class="btn btn-primary">Submit</button>
    </form>

    <script src="" async defer></script>
</body>

</html>