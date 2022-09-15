<?php


class DBStorage implements Storage
{
    public $connectDB;
    public function __construct($host, $port, $dbname, $user, $pass)
    {
        $connectString = "host=$host port=$port dbname=$dbname user=$user password=$pass";

        $this->connectDB = pg_connect($connectString);
        var_dump($this->connectDB);
    }

    public function save($figure)
    {
//        $this->connectDB
//            ->prepare('UPDATE storage SET figures = ?')
//            ->execute(array($figure));
//        return $this->load();
    }

    public function load()
    {

//        return $this->connectDB
//            ->query('SELECT figures FROM storage')
//            ->fetch()[0];
    }
}