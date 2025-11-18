let inputDir = {x: 0, y: 0};
const foodSound = new Audio("./assests/Music/food.mp3");
const gameOverSound = new Audio("./assests/Music/gameover.mp3");
const moveSound = new Audio("./assests/Music/move.mp3");
const backgroundSound = new Audio('./assests/Music/music.mp3');
let speed = 4;
let score = 0;
let lastPaintTime = 0;
const board = document.getElementById("board");
const scoreBox = document.getElementById("score");

// Initialize score display
scoreBox.innerHTML = score;

// snake ka definaiton
let snakeArr = [
    {x: 13, y: 15}
]

let food = {x: 1, y: 15};

//frame or fps section
function main(ctime){
    window.requestAnimationFrame(main);
    if((ctime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}
function isCollide(snake){
    //snake collide into itself
    for(let i=1; i<snake.length; i++){
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
    //snake collides into the wall
    if(snake[0].x <= 0 || snake[0].x > 20 || snake[0].y <=0 || snake[0].y > 20){
        return true;
    }   

}

function gameEngine(){
    //snake gameOver and reset logic
    if(isCollide(snakeArr)){
        gameOverSound.play();
        backgroundSound.pause();
        inputDir = {x: 0, y: 0};
        alert("Game Over, press any key to enter: ");
        snakeArr = [{x: 13, y: 15}];
        backgroundSound.play();
        score = 0;
        scoreBox.innerHTML = score;
    }
    
    //after food got eaten
    if(snakeArr[0].x === food.x && snakeArr[0].y === food.y){
        foodSound.play();
        //unshift funciton is used to add an segment 
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y});
        score += 1;
        scoreBox.innerHTML = score;
        let a = 2;
        let b = 17;
        food = {x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random())}
    }
    
    //moving snake
    for(let i=snakeArr.length - 2; i >= 0; i--){
        snakeArr[i+1] = {...snakeArr[i]};
    }
    if(inputDir.x !== 0 || inputDir.y !== 0){
        snakeArr[0].x += inputDir.x;
        snakeArr[0].y += inputDir.y;
    }



    //snake ke liye
    board.innerHTML = "";
    snakeArr.forEach((e, index) =>{

        //creation of snake
        snakeElement = document.createElement("div");

        //position of snake
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        
        //checking and logic
        if(index === 0){
            snakeElement.classList.add('head');
        }else{
            snakeElement.classList.add('snake');
        }

        //adding the snake
        board.appendChild(snakeElement);
    });

    //food ke liye
    //same as snake
    foodElement = document.createElement("div");
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}

window.requestAnimationFrame(main);
window.addEventListener('keydown', e=>{
    moveSound.play();
    switch(e.key){
        case "ArrowUp":
            console.log("arrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case "ArrowDown":
            console.log("arrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case "ArrowLeft":
            console.log("arrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case "ArrowRight":
            console.log("arrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;            
        default:
            break;    
    }
})


