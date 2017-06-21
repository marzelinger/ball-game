//initialize empty array of bricks


function setup(){
    createCanvas(800,700);
}

//make a ball object
function ball(){
    this.xloc = 115;
    this.yloc = 190;
    this.xspeed = 1;
    this.yspeed = 1;
    this.display = function(){
        fill(this.xloc,this.yloc,Math.random()*255)
        ellipse(this.xloc,this.yloc,20,20)
    }
}
//make a brick object
function brick(){
    this.xloc = Math.random()*600 + 100
    this.yloc = Math.random()*200 + 50
    this.height = Math.random()*15 + 50
    this.width = Math.random()*15 + 50
    this.health = level;
    var r = Math.random()*255
    var g = Math.random()*255
    var b = Math.random()*255
    this.display = function(){
        fill(r,g,b,90)
        rect(this.xloc,this.yloc,this.width,this.height)
    }
}

function bar(){
    this.xloc = 250
    this.speed = 10;
    this.display = function(){
        fill(255)
        rect(this.xloc,650,150,10,20)
    }
    
}


function bricks(numBlocks){
    var arr = []
    for(var i = 0;i<numBlocks;i++){
        arr.push(new brick())
    }
    return arr;
}

// var brick = new brick();
var value1 = 3
var value2 = 2
var ball = new ball();
var bar = new bar();
var level = 1
var bricks = new bricks(Math.random()*value1 + value2)
var game_state = true

function draw(){
    clear()
    background(150);
    for(var i = 0;i<bricks.length;i++){
        if(bricks[i].health<=0){
            bricks.splice(i,1)
        }
        else{
        bricks[i].display()
        }
    }
    ball.display();
    // brick.display();
    bar.display();
    if(keyIsDown(LEFT_ARROW)){
        if(bar.xloc>0){
            bar.xloc = bar.xloc-bar.speed;
        }
    }
    
    if(keyIsDown(RIGHT_ARROW)){
        if(bar.xloc<650){
            bar.xloc = bar.xloc+bar.speed;
        }
    }
    if (ydirection()==0){
        //ball.fill(0);
        fill("pink")
        textSize(32)
        text("YOU LOST, MOVE BAR TO PLAY AGAIN",100,200)
        game_state=false;
    }
    if(bricks.length==0){
        fill("pink")
        textSize(32)
        text("YOU WON, MOVE BAR TO PLAY NEXT LEVEL",100,200)
        ball.yloc = -5
        game_state=false;
    }
    ball.xloc = ball.xloc + ball.xspeed
    ball.yloc = ball.yloc - ball.yspeed
    ball.yspeed = ball.yspeed * ydirection();
    if(ball.xloc > 790 || ball.xloc < 10 || inside()){
        ball.xspeed = -1 * ball.xspeed
    }
    // text("y of ball: " + ball.yloc,25,25)
    // text("x of ball: " + ball.xloc,25,65)
    // text("y of brick: " + bricks[0].yloc,300,25)
    // text("x of ball: " + bricks[0].xloc,300,65)
    
}

function keyPressed(){
    if(keyCode == UP_ARROW){
        if(ball.yspeed>0){
            ball.yspeed = ball.yspeed + 1;
        }
        else{
            ball.yspeed = ball.yspeed - 1;
        }
        
    }
    if(keyCode == DOWN_ARROW){
        if(ball.yspeed>0){
            ball.yspeed = ball.yspeed - 1;
            
        }
        else{
            ball.yspeed = ball.yspeed + 1;
        }
    }
    if(keyCode==LEFT_ARROW || keyCode==RIGHT_ARROW){
        if(!game_state){
            ball.yloc=Math.floor((Math.random()*500)+100);
            ball.yspeed = 5;
            level = level + 1;
            value2 = value2 + 5
            for(var i = 0;i<Math.random()*value1 + value2;i++){
                bricks.push(new brick())
                
            }
            game_state=true
        }
    }
}

function ydirection(){
    if(ball.yloc > 650){
        if((ball.xloc >= bar.xloc) && (ball.xloc <= (bar.xloc + 150))){
            return -1;
        }
        else{
            return 0;
        }
    }
    else if(ball.yloc < 23){
        return -1;
    }
    else if(collide()){
        return -1;
    }
        return 1;
}

function collide(){
    // var value = false;
    for(var j = 0;j<bricks.length;j++){
        if((ball.xloc >= bricks[j].xloc-17) && (ball.xloc <= (bricks[j].xloc + bricks[j].width+17)) && (ball.yloc >= bricks[j].yloc-17) && (ball.yloc <= (bricks[j].yloc + bricks[j].height+17))){
            // text(j,25,25)
            // text(bricks.length,100,100)
            bricks[j].health = bricks[j].health-1;
            return true
        }

    }
    return false;
}

function inside(){
    for(var j = 0;j<bricks.length;j++){
        if((ball.xloc > bricks[j].xloc-5) && (ball.xloc < (bricks[j].xloc + bricks[j].width+5)) && (ball.yloc > bricks[j].yloc-5) && (ball.yloc < (bricks[j].yloc + bricks[j].height+5))){
            // text(j,25,25)
            // text(bricks.length,100,100)
            return true
        }

    }
    return false;
    
}

