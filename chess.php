<?php

session_start();
if (strlen($_SESSION['map']) != 64){
    $_SESSION['map'] = 'rnbqkbnrpppppppp11111111111111111111111111111111PPPPPPPPRNBQKBNR';
}

if(isset($_GET['getFigures'])){
    echo $_SESSION['map'];
}

if (isset($_GET['moveFigure'])){

    $from = $_GET['from'];
    $to = $_GET['to'];
    $figure = $_SESSION['map'][$from];
    $_SESSION['map'][$from] = '1';
    $_SESSION['map'][$to] = $figure;
    echo $_SESSION['map'];
}

if(isset($_GET['die'])){
    $_SESSION['map'] = 'rnbqkbnrpppppppp11111111111111111111111111111111PPPPPPPPRNBQKBNR';
}

