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
let sqrArray = new Array(8).fill(0)
let turn = null 
let winner = [] // X, O, or T
let count 

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
  squares.forEach(square => square.textContent = '')
  turn = 1
  winner = null
  gameStatus.textContent = `It's ${turn === 1 ? 'X' : 'O'}'s turn`
  count = 0
}

function handleClick(e){
  let sqrIdx = parseInt(e.target.id.replace('sq', ''))
  sqrArray[sqrIdx] = turn // where is turn being stores in squares[]? node tree not array
  renderClick(sqrIdx)
  getWinner()
  renderWinner()
  count ++
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

function renderWinner(){ //append to render later
  console.log('you render')
  if(winner === null){ 
      turn *= -1
    }
  if(winner === 'T'){ 
    gameStatus.textContent = "It's a tie!"
    return
  }
  if(winner !== null){
    gameStatus.textContent = turn === 1 ?  `Congrats! X's won!` : `Congrats! O's won!`
    return
  }
}

function getWinner(){
  console.log(`This is the windex ${winIdx[1][0]}`)
  console.log(`This is the sqarray of windex ${sqrArray[3]}`)
  console.log(`Does this even work like sqarray of windex ${sqrArray[winIdx[1][0]]}`)
  
  for(let i=0; i<winIdx.length; i++){
    for(let j=0; j<3; j++){
      let index = winIdx[i][j]
      console.log(`This is ${index} index`)
      if(sqrArray[winIdx[i][j]] === sqrArray[winIdx[i][j+1]] === sqrArray[winIdx][i][j+2] === 1 || -1){
        console.log('holy shit if statement is true')
        winner = turn === 1  ? 'X' : 'Y'
        console.log('we have a winnnnner')
      }else{
        console.log('hm. disappointing')
      }
    }
  }
     
      
    
  

  if(count === 9 &&  winner === null)
  {
    console.log('omg its a tie')
    winner = 'T'
  }

}
