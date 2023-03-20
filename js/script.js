const playBtn = document.getElementById('playBtn');



playBtn.addEventListener('click',play);


// Drawing cell
function drawCell (i, numCell){
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.style.width = `calc(100% / ${numCell})`;
    cell.style.height = cell.style.width;
    
    cell.innerHTML = `<p>${i}</p>`;
    return cell;
}



// Game function
function play(){

    const playground = document.getElementById('playground');
    playground.innerHTML = '';

    // bombs const
    let numBombs = 16;
    // take level difficulty
    const difficulty = document.getElementById('difficultySelect').value;
    console.log(difficulty);

    // change cell numbers for each difficulty
    let cellNumbers;

    switch (difficulty) {
        case 'easy':
            cellNumbers = 100;
            break;
        case 'medium':
            cellNumbers = 81;
            break;
        case 'hard':
            cellNumbers = 49;
            break;    
    };

    function setMessage (message){
        const scorePoints = document.getElementById('score');
        scorePoints.innerHTML = message;
    }

    function showAllBombs(bombsCounter){
        const cells = document.querySelectorAll('.cell');
        for(let cell of cells){
            if(bombsCounter.includes(parseInt(cell.innerText))){
                cell.classList.add('bomb');
            }
        }
    }
    

    // choosing how many cell there should be for each row
    let cellPerRow = Math.sqrt(cellNumbers);

    let bombsCounter = genBombs(numBombs,cellNumbers);
    
    let gameOver = false;

    let maxScore = parseInt(cellNumbers - numBombs);

    let score = parseInt(0);

    for (let i = 1; i <= cellNumbers; i++){
        const cell = drawCell(i, cellPerRow);
        cell.addEventListener('click', function(){
        let cellValue = parseInt(cell.innerText);

            if (!gameOver && !cell.classList.contains('safe')){

                if (bombsCounter.includes(cellValue)){
                    cell.classList.add('bomb')
                    message = `Hai perso, il tuo punteggio è: ${score}`;
                    gameOver = true;
                    showAllBombs(bombsCounter);
                }else{
                    cell.classList.add('safe')
                    score++;
                    message = score === maxScore ? `Hai vinto, il tuo punteggio è: ${score}`: `Il tuo punteggio è: ${score}`;
                }

                setMessage(message);
            }
                
        })
        playground.appendChild(cell);
    }
}


// Function to generate bombs
function genBombs(numBombs, cellNumbers){
    const bombs = [];
    while (bombs.length < numBombs) {
       const bomb = rndNumber (1, cellNumbers)
        if (!bombs.includes(bomb)){
            bombs.push(bomb);
        }
    }
    return bombs;
}



