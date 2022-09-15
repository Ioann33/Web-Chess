<?php

include_once 'Contracts'.DIRECTORY_SEPARATOR.'Storage.php';

spl_autoload_register(function($class){
    $class = str_replace('\\', DIRECTORY_SEPARATOR, $class);
    $classPath = 'Core'.DIRECTORY_SEPARATOR.$class.'.php';
    if(file_exists($classPath)){
        include_once $classPath;
        return true;
    }
    return false;
});
//$storage = new DBStorage('127.0.0.1', '5432', 'test-project', 'postgres', '');
$storage = new FileStorage('Storage/localStorage.txt');
//$storage = new SessionStorage('map');
$board = new Board($storage);

if (strlen($board->getFigures()) != 64){
    $board->startSession();
}

if(isset($_GET['getFigures'])){
    echo $board->getFigures();
}

if (isset($_GET['moveFigure'])) {
    $from = $_GET['from'];
    $to = $_GET['to'];
    echo $board->moveFigure($from, $to);
}

if(isset($_GET['die'])){
    $board->startSession();
    header('Location: http://localhost:8000');
}

