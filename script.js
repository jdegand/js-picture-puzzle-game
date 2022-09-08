window.addEventListener('DOMContentLoaded', () => {
    const rows = 3;
    const columns = 3;
    for(var i = 0, top = 0, order = 0; i < rows; i++, top-=100){
        for(var j = 0, left=0; j < columns; j++, left-=100, order++){
            let div = document.createElement('div')
            div.setAttribute('class', `piece`)
            div.setAttribute('id', `${i}${j}`)
            div.setAttribute('data-order', `${order}`)
            div.style.setProperty('background-position', `${left}px ${top}px`)
            document.getElementById('puzzleContainer').append(div)
        }
    }

    document.getElementById('btnStart').addEventListener('click', ()=> {
        document.querySelectorAll('.piece').forEach(piece => {
            let leftPosition = Math.floor(Math.random() * 160) + "px"
            let topPosition = Math.floor(Math.random() * 160) + "px"
            piece.classList.add('draggablePiece')
            piece.style.setProperty('position', 'absolute')
            piece.style.setProperty('left', leftPosition)
            piece.style.setProperty('top', topPosition)
        })
        // run loop again to add borders to puzzle container
        for(var i = 0; i < rows; i++){
            for(var j = 0; j < columns; j++){
                let div = document.createElement('div')
                div.setAttribute('class', `piece droppablePiece ${i}${j}`)
                div.style.setProperty('background-image', "none")
                document.getElementById('puzzleContainer').append(div)
            }
        }
        document.getElementById('btnStart').style.display = 'none'
        document.getElementById('btnReset').style.display = 'initial'
        implementLogic()
    })

    document.getElementById('btnReset').addEventListener('click', ()=> {

        let puzzleContainer = document.getElementById('puzzleContainer');

        while (puzzleContainer.firstChild) {
            puzzleContainer.removeChild(puzzleContainer.firstChild);
        }

        const rows = 3;
        const columns = 3;
        for(var i = 0, top = 0, order = 0; i < rows; i++, top-=100){
            for(var j = 0, left=0; j < columns; j++, left-=100, order++){
                let div = document.createElement('div')
                div.setAttribute('class', `piece`)
                div.setAttribute('id', `${i}${j}`)
                div.setAttribute('data-order', `${order}`)
                div.style.setProperty('background-position', `${left}px ${top}px`)
                puzzleContainer.append(div)
            }
        }

        document.getElementById('btnReset').style.display = 'none';
        document.getElementById('btnStart').style.display = 'initial'
        document.getElementById('pieceContainer').innerText = ''
        
    })
    
    function implementLogic(){
        document.querySelectorAll('.draggablePiece').forEach(piece => {
            piece.setAttribute('draggable', 'true')
            piece.addEventListener("dragstart", dragStart); //click on image to drag
            piece.addEventListener("dragover", dragOver);   //drag an image
            piece.addEventListener("dragenter", dragEnter); //dragging an image into another one
            //piece.addEventListener("dragleave", dragLeave); //dragging an image away from another one
            piece.addEventListener("drop", dragDrop);       //drop an image onto another one
            //piece.addEventListener("dragend", dragEnd);      //after you completed dragDrop
        })
        
        document.querySelectorAll('.droppablePiece').forEach(piece => {
            piece.addEventListener("dragstart", dragStart);
            piece.addEventListener("dragover", dragOver); 
            piece.addEventListener("dragenter", dragEnter); 
            piece.addEventListener("drop", dragDrop);    
        })
        
    }

    //let dragItem = null

    function dragStart(e) {
        //dragItem = this
       e.dataTransfer.setData('text/plain', e.target.id);
    }
    
    function dragOver(e) {
        e.preventDefault();
    }
    
    function dragEnter(e) {
        e.preventDefault();
    }
    
    function dragDrop(e) {

       /*
       this.style.backgroundImage = 'url(rsz_stray.jpg)';
       this.style.backgroundPosition = dragItem.style.backgroundPosition;
       console.log(dragItem)
       document.getElementById(`${dragItem.id}`).remove()  // have to remove the image since it is not actually being placed inside the grid
       // cannot move pieces after being placed if misplaced have to restart
       */

       const data = e.dataTransfer.getData('text/plain');
       let tile = document.getElementById(data);

       // have to check if dropzone already has an image - return

       /* doesn't work after the first attempt it will stop two images in same div
       if(e.target.classList.contains('piecePresent')){
            console.log('here')
            return
       }
       */

       // 6 without any piece 
       // e.path.length > 7 then return
       // e.path is deprecated - e.composedPath()

       if(e.composedPath().length > 7){
            return;
        }

        tile.style.position = 'relative'
        tile.style.top = 0
        tile.style.left = 0
        tile.classList.add('droppedPiece')
        //e.target.replaceWith();
        e.target.append(tile)
        //e.target.classList.add('piecePresent')
        checkIfPuzzleSolved()
    }

    function checkIfPuzzleSolved(){
        if(document.querySelectorAll('.droppedPiece').length !== 9){
            return false;
        }

        let order = [];

        for( var k = 0; k < 9; k++){
            var item  = document.querySelectorAll('#puzzleContainer .droppedPiece')[k]

            order.push(item.getAttribute('data-order'))
        }
        if(order.toString() === '0,1,2,3,4,5,6,7,8') {
            document.getElementById('pieceContainer').innerText = 'Correct'
            return true
        } else {
            document.getElementById('pieceContainer').innerText = 'Try Again'
            return false
        }
    }

});