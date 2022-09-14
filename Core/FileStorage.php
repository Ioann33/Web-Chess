<?php


class FileStorage implements Storage
{
    public $filename;
    public function __construct($filename)
    {
        $this->filename = $filename;
    }

    public function save($figure)
    {
        file_put_contents($this->filename, $figure);
    }

    public function load()
    {
        return file_get_contents($this->filename);
    }
}