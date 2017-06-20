function setup(){
    createCanvas(800,700);
    
}

var x = 50;
var xb = 50;
var speed = 10;
var y = 190
var bxspeed = 2;
var byspeed = 2;
var value = "dodgerblue";

function draw(){
    background(100);
    fill(255);
    var board = rect(x,650, 150,10,20);
    fill(value)
    // ellipse(x,280,80,80);
    // ellipse(x+150,280,80,80)
    // x = x + speed;
    if(keyIsDown(LEFT_ARROW)){
        if(x>0){
            x = x-speed;
        }
    }
    
    if(keyIsDown(RIGHT_ARROW)){
        if(x<650){
            x = x+speed;
        }
    }
    
    var ball = ellipse(xb+75,y,20,20)
    y = y-byspeed;
    xb = xb + bxspeed;
    byspeed = byspeed * collide(xb,y,x);
    // if(y < 20){
    //     // if((xb > (x - 75))&&(xb < (x + 75))){
    //         byspeed= -1 * byspeed;
    //     // }
    //     // else{
    //     //     remove();
    //     // }
    // }
    // if(y > 635){
    //     byspeed= -1 * byspeed;
    // }
    if(xb > 650 || xb < 0){
        bxspeed = -1 * bxspeed
    }
    
    text("xb: " + xb,25,25)
    text("y: " + y,25,65)
    
}

function keyPressed(){
    if(keyCode == UP_ARROW){
        // if(speed>0){
        //     speed = speed + 1;
            
        // }
        // else{
        //     speed = speed - 1;
        // }
        if(byspeed>0){
            byspeed = byspeed + 1;
            
        }
        else{
            byspeed = byspeed - 1;
        }
        
    }
    if(keyCode == DOWN_ARROW){
    //   if(speed>0){
    //         speed = speed - 1;
            
    //     }
    //     else{
    //         speed = speed + 1;
    //     }
        if(byspeed>0){
            byspeed = byspeed - 1;
            
        }
        else{
            byspeed = byspeed + 1;
        }
    }
}
function collide(ballx,bally,barx){
    if(bally > 650){
        if((ballx > (barx - 75))&&(ballx < (barx + 75))){
            return -1;
        }
        else{
            remove();
        }
    }
    else if(bally < 20){
        return -1;
    }
    else{
        return 1;
    }
}