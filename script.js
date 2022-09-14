let map = new Array(64)
let isDragging = false;

function showBoard() {
    let color = '';
    let board = document.querySelector('.board');
    board.ondragover = allowDrop;
    board.innerText = '';
    for (let cord = 0; cord <64; cord++) {
        // console.log(cord%8+' and '+Math.floor(cord/8)+' and '+cord%8 + Math.floor(cord/8))
        color = computedColorSquare(cord)? 'black' : 'white';
        board.insertAdjacentHTML('beforeend', `
         <div id="s${cord}" class="square ${color}"></div>
        `);

    }
}

function allowDrop(event) {
    event.preventDefault()
}
function showAllFigures(figures) {
    for (let cord =0; cord < 64; cord++){
        console.log('rewrite 1')
        showFigure(cord, figures[cord])
    }
}
function showFigure(cord, figure) {

    if (map[cord] === figure){
        return
    }

    map[cord] = figure
    console.log('rewrite 2')

    let square = document.getElementById('s'+cord)
    square.innerHTML = `<div id="f${cord}" class="figure"  onmousedown="dragAndDrop(${cord})" draggable="true">${getChessSymbol(figure)}</div>`
}

function computedColorSquare(cord) {
    return (cord%8 + Math.floor(cord/8))%2 ;
}

function getChessSymbol(figure) {
    switch (figure) {
        case 'K' : return  '&#9812';
        case 'Q' : return  '&#9813';
        case 'R' : return  '&#9814';
        case 'B' : return  '&#9815';
        case 'N' : return  '&#9816';
        case 'P' : return  '&#9817';
        case 'k' : return  '&#9818';
        case 'q' : return  '&#9819';
        case 'r' : return  '&#9820';
        case 'b' : return  '&#9821';
        case 'n' : return  '&#9822';
        case 'p' : return  '&#9823';
        default : return '';
    }
}

function moveFigure(from, to){
    console.log('move from '+from+' to '+to)
    let figure = map[from]
    showFigure(from, '1')
    showFigure(to, figure)

}

function dragAndDrop(id) {
    let figure = document.getElementById('f'+id)
    // console.log(figure)
    let offsetX;
    let offsetY;
    let start;

    figure.addEventListener('dragstart', function (event) {
        isDragging = true
        // console.log(figure.parentNode)
        start = figure.parentNode.id.substring(1)
        console.log('dragstart')
        offsetX = event.offsetX
        offsetY = event.offsetY
        figure.style.position = 'absolute'
        setTimeout(function (){
            figure.style.visibility = 'hidden'
        },0)

    })

    figure.addEventListener('dragend', function (event) {
        console.log('dragend')
        isDragging = false
        // console.log(el.pageX, el.pageY)
        figure.style.top = (event.pageY-offsetY) + 'px'
        figure.style.left = (event.pageX-offsetX) + 'px'
        figure.style.visibility = 'visible'
        console.log(map)
    })

    let squares = document.querySelectorAll('.square')
    squares.forEach(function (square) {
        square.ondrop = function (){
            // console.log('from '+start+' to '+square.id.substring(1))
            moveFigurePHP(start, square.id.substring(1))
            moveFigure(start, square.id.substring(1))
        }

    })


}

function getBoardMap(){

    if (isDragging){
        return
    }

    console.log('showphp')
    fetch('chess.php?getFigures')
        .then(res => res.text())
        .then(res => {
            showAllFigures(res)
        })

}

function moveFigurePHP(from, to){
    console.log('attempt 200')
    fetch(`chess.php?moveFigure&from=${from}&to=${to}`)
        .then(res => res.text())
        .then(res => {
            showAllFigures(res)
        })
}

getBoardMap()
setInterval(getBoardMap, 500)
showBoard();

