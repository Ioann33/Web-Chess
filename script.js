function showBoard() {
    let color = '';
    let board = document.querySelector('.board');
    board.ondragover = allowDrop;
    board.innerText = '';
    for (let cord = 0; cord <64; cord++) {
        // console.log(cord%8+' and '+Math.floor(cord/8)+' and '+cord%8 + Math.floor(cord/8))
        color = isBlackSquare(cord)? 'black' : 'white';
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
        showFigure(cord, figures[cord])
    }
}
function showFigure(cord, figure) {
    let square = document.getElementById('s'+cord)
    square.innerHTML = `<div id="f${cord}" class="figure" ondragstart="setDraggable(${cord})" draggable="true">${getChessSymbol(figure)}</div>`
}

function isBlackSquare(cord) {
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

function setDraggable(id) {
    let figure = document.getElementById('f'+id)
    console.log(figure)
    let offsetX;
    let offsetY;
    // figure.ondragend = function (event){
    //     figure.style.left = event.clientX+'px';
    //     figure.style.right = event.clientY+'px';
    // }

    figure.addEventListener('dragstart', function (event) {
        offsetX = event.offsetX
        offsetY = event.offsetY
    })
    figure.addEventListener('dragend', function (el) {
        console.log(el.pageX, el.pageY)
        figure.style.top = (el.pageY-offsetY) + 'px';
        figure.style.left = (el.pageX-offsetX) + 'px';
    })

}





showBoard();
showAllFigures('rnbqkbnrpppppppp11111111111111111111111111111111PPPPPPPPRNBQKBNR')
