/*-----------------------Constants ----------------------*/
const winIdx = [ 
  [0,1,2], //horizontal
  [3,4,5],
  [6,7,8],
  
  [0,3,6], //vertical
  [1,4,7],
  [2,5,8],

  [6,4,2], //diagonals
  [0,4,8]
]
/*-------------------Variables (state) ------------------*/
let sqrArray = null
let turn = null 
let winner = null // 'X', 'O', or 'T'
let index = null

/*---------------Cached Element References --------------*/
let squares = document.querySelectorAll('div')
let board = document.querySelector('.board')
let gameStatus = document.getElementById('message') 
let reset = document.getElementById('btn')

/*--------------------Event Listeners -------------------*/
board.addEventListener('click', handleClick)
reset.addEventListener('click', init)

/*-----------------------Functions ----------------------*/
init()

function init(){
  //clear array
  sqrArray = new Array(9).fill(null)

  //clear squares of text and styling
  squares.forEach(square => square.textContent = null)
  squares.forEach(square => square.removeAttribute('class'))

  //clear message styling
  gameStatus.style.color = 'black'
  gameStatus.removeAttribute('class')
  
  //set variables & message
  winner = null
  turn = 1
  gameStatus.textContent = `It's ${turn === 1 ? 'X' : 'O'}'s turn`
}

function handleClick(e){
  let sqrIdx = parseInt(e.target.id.replace('sq', ''))
  sqrArray[sqrIdx] = turn 
  renderClick(sqrIdx)
  getWinner()
  renderWinner()
}

function renderClick(sqrIdx){
  if(turn === 1){
    squares[sqrIdx].textContent = 'X'
    squares[sqrIdx].style.color = 'red'
    gameStatus.textContent = "O's turn"
  }
  else {
    squares[sqrIdx].textContent = 'O'
    squares[sqrIdx].style.color = 'blue'
    gameStatus.textContent = "X's turn"
  }
}

function renderWinner(){ 
  if(winner === null){ 
      turn *= -1
    }
  if(winner === 'T'){ 
    //style message
    gameStatus.classList.add('wobble')
    gameStatus.textContent = "It's a tie!"
    
    //style board elements
    squares.forEach(square => {
      square.style.color = 'grey'
    })
    return
  }
  if(winner !== null){
    //style message
    gameStatus.classList.add('bounce')
    gameStatus.textContent = turn === 1 ?  `Congrats! X's won!` : `Congrats! O's won!`
    gameStatus.style.color = turn === 1 ? 'red' : 'blue'

    //style board elements
    const win = winIdx[index]
    let time = 300
    for(let i=0; i<3; i++){
      setTimeout(function(){
        squares[win[i]].style.color = 'green'
      },time)
      time += 300
    }
    confetti.start(2000)
    return
  }
}

function getWinner(){
  for(var i=0; i<winIdx.length; i++){
    const win = winIdx[i]
      let a = sqrArray[win[0]]
      let b = sqrArray[win[1]]
      let c = sqrArray[win[2]]
    if(a === b && b === c && a != null){
        winner = turn === 1  ? 'X' : 'Y'
        index = i
    }
  }
  if(!sqrArray.includes(null) && winner === null)
  {
    winner = 'T'
  }
}
