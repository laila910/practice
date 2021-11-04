<?PHP
function cleanInputs($input)
{
    $input = trim($input);
    $input = stripslashes($input);
    $input = htmlspecialchars($input);
    return $input;
}


if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    echo 'hello there';
    $nameMe = cleanInputs($_POST['name']);
    if (empty($nameMe)) {
        echo 'your name is empty ';
    } elseif (strlen($nameMe) < 6) {
        echo 'your name must be more than 6 characters';
    } elseif (!filter_var($nameMe, FILTER_SANITIZE_STRING)) {
        echo 'your name is not string';
    }
    $emaily = cleanInputs($_POST['email']);
    if (empty($emaily)) {
        echo 'your email is empty';
    } else if (!filter_var($emaily, FILTER_VALIDATE_EMAIL)) {
        $emaily = filter_var($emaily, FILTER_SANITIZE_EMAIL);
        if (!filter_var($emaily, FILTER_VALIDATE_EMAIL)) {
            echo 'not valid email';
        }
    }

    $pass = cleanInputs($_POST['password']);
    if (empty($pass)) {
        echo 'your password is empty ';
    } elseif (strlen($pass) < 6) {
        echo 'your password must be more than 6 characters';
    }
    echo '<p width="50%" height="50%">your name is ' . $nameMe . '<br>' . 'your email is ' . $emaily . '<br>' . 'your password is ' . $pass . '</p>';
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
    <form method="post" action="<?php echo htmlspecialchars($_SERVER['PHP_SELF']) ?>">
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

        <button type="submit" class="btn btn-primary">Submit</button>
    </form>

    <script src="" async defer></script>
</body>

</html>