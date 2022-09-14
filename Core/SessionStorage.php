<?php


class SessionStorage implements Storage
{
    public $name;
    public function __construct($name)
    {
        $this->name = $name;
        session_start();
    }

    public function save($figure)
    {
        $_SESSION[$this->name] = $figure;
    }

    public function load()
    {
        return $_SESSION[$this->name];
    }
}