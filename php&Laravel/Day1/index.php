<?php


for ($i = 0; $i < 8; $i++) {
    for ($y = 0; $y <= $i; $y++) {
        echo '*';
    }
    echo ' <br>';
}
$num = 4;
$fact = 1;
for ($i = 4; $i > 0; $i--) {
    $fact = $fact * $i;
}
echo $fact . '<br>';
$txt = 'php html js css ';
$arr = explode(' ', $txt);
foreach ($arr as $value) {
    echo $value . '<br> ';
}
