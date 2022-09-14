<?php

class Board
{
    protected $storage;

    public function __construct(Storage $storage)
    {
        $this->storage = $storage;
    }

    public function startSession(){
        $this->storage->save('rnbqkbnrpppppppp11111111111111111111111111111111PPPPPPPPRNBQKBNR');
        return $this->storage->load();
    }

    public function getFigures(){
        return $this->storage->load();
    }

    public function moveFigure($from, $to){
        $map = $this->storage->load();
        $figure = $map[$from];
        $figureTo = $map[$to];
        if (!$this->getAllowedMove($figure,$figureTo)){
            return $map;
        }
        $map[$from] = '1';
        $map[$to] = $figure;
        $this->storage->save($map);
        return $this->storage->load();
    }

    public function getAllowedMove($fromFigure, $toFigure){

        if (strpos('Kk', $toFigure) !== false){
            return false;
        }

        $fromColor = $this->getFigureColor($fromFigure);
        $toColor = $this->getFigureColor($toFigure);

        if ($fromColor === $toColor){
            return false;
        }else{
            return true;
        }

    }

    public function getFigureColor($figure){

        if (strpos('RNBQKP', $figure) !== false){
            return 'white';
        }

        if (strpos('rnbqkp', $figure) !== false){
            return 'black';
        }

        return 'empty';
    }

}