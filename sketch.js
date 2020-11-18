var database;
var ball;
var position;
var ballPos;

function setup(){
    createCanvas(500,500);

    database = firebase.database();

    ball = createSprite(250,250,20,20);
    ball.shapeColor = "red";

    ballPos = database.ref('ball/position');
    ballPos.on("value", readPosition, showError);

}

function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        writePosition(-5,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(5,0);
    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-5);
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+5);
    }
    drawSprites();
}

function writePosition(x,y){
    database.ref('ball/position').set({
        x : position.x + x,
        y : position.y + y
    })
    
    
}

function readPosition(data){
    position = data.val();
    console.log(position);

    ball.x = position.x;
    ball.y = position.y;
}

function showError(){
    console.log("Error in the database");
}