const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

canvas.width = 1000;
canvas.height = 600;

const lanes = [350,500,650];

const player = {
    lane:1,
    x:500,
    y:430,
    width:70,
    height:120
};

let roadMove = 0;

function drawBackground(){

    // Sky
    ctx.fillStyle="#87CEEB";
    ctx.fillRect(0,0,1000,600);

    // Grass
    ctx.fillStyle="#46b44f";
    ctx.fillRect(0,420,1000,180);

    // Road
    ctx.fillStyle="#555";

    ctx.beginPath();
    ctx.moveTo(250,600);
    ctx.lineTo(750,600);
    ctx.lineTo(610,100);
    ctx.lineTo(390,100);
    ctx.closePath();
    ctx.fill();

    // Lane Lines
    ctx.strokeStyle="white";
    ctx.lineWidth=4;

    for(let i=0;i<20;i++){

        let y=600-(i*40)+(roadMove%40);

        let t=(600-y)/500;

        let width=500-(t*280);

        ctx.beginPath();
        ctx.moveTo(500-width/6,y);
        ctx.lineTo(500-width/6,y-20);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(500+width/6,y);
        ctx.lineTo(500+width/6,y-20);
        ctx.stroke();

    }

    roadMove+=8;

}

function drawPlayer(){

    player.x += (lanes[player.lane]-player.x)*0.18;

    // Shadow
    ctx.fillStyle="rgba(0,0,0,.25)";
    ctx.beginPath();
    ctx.ellipse(player.x,405,25,8,0,0,Math.PI*2);
    ctx.fill();

    // Legs
    ctx.strokeStyle="black";
    ctx.lineWidth=5;

    ctx.beginPath();
    ctx.moveTo(player.x-8,360);
    ctx.lineTo(player.x-14,400);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(player.x+8,360);
    ctx.lineTo(player.x+14,400);
    ctx.stroke();

    // Pants
    ctx.fillStyle="purple";
    ctx.fillRect(player.x-16,320,32,42);

    // Shirt
    ctx.fillStyle="red";
    ctx.fillRect(player.x-18,270,36,52);

    // Arms
    ctx.beginPath();
    ctx.moveTo(player.x-18,280);
    ctx.lineTo(player.x-34,305);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(player.x+18,280);
    ctx.lineTo(player.x+34,305);
    ctx.stroke();

    // Head
    ctx.fillStyle="#ffd7b5";
    ctx.beginPath();
    ctx.arc(player.x,245,20,0,Math.PI*2);
    ctx.fill();

    // Hair
    ctx.fillStyle="black";
    ctx.beginPath();
    ctx.arc(player.x,238,22,Math.PI,0);
    ctx.fill();

    // Hat
    ctx.fillStyle="#d60000";
    ctx.fillRect(player.x-30,214,60,18);

    ctx.fillStyle="white";
    ctx.font="8px Arial";
    ctx.fillText("World Cup",player.x-24,225);
    ctx.fillText("Edition",player.x-18,233);
}

function drawUI(){

    ctx.fillStyle="white";
    ctx.font="42px Arial";
    ctx.fillText("Rishi's Runner",25,55);

    ctx.font="20px Arial";
    ctx.fillText("by Rishi's Games",30,85);

}

document.addEventListener("keydown",e=>{

    if(e.key==="ArrowLeft" && player.lane>0)
        player.lane--;

    if(e.key==="ArrowRight" && player.lane<2)
        player.lane++;

});

function game(){

    drawBackground();
    drawPlayer();
    drawUI();

    requestAnimationFrame(game);

}

game();