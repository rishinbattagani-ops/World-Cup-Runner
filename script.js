const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const scoreText = document.getElementById("scoreValue");

const WIDTH = canvas.width;
const HEIGHT = canvas.height;

const lanes = [380, 500, 620];

let score = 0;
let roadOffset = 0;

const player = {
    lane: 1,
    x: 500,
    y: 455,
    targetX: 500
};

document.addEventListener("keydown",(e)=>{

    if(e.key==="ArrowLeft" && player.lane>0){
        player.lane--;
    }

    if(e.key==="ArrowRight" && player.lane<2){
        player.lane++;
    }

});

function drawSky(){

    const sky = ctx.createLinearGradient(0,0,0,HEIGHT);

    sky.addColorStop(0,"#5ec8ff");
    sky.addColorStop(1,"#dff8ff");

    ctx.fillStyle = sky;
    ctx.fillRect(0,0,WIDTH,HEIGHT);

    // Sun
    ctx.fillStyle="#FFD84D";
    ctx.beginPath();
    ctx.arc(900,90,45,0,Math.PI*2);
    ctx.fill();

}

function drawCloud(x,y){

    ctx.fillStyle="white";

    ctx.beginPath();
    ctx.arc(x,y,22,0,Math.PI*2);
    ctx.arc(x+24,y-10,28,0,Math.PI*2);
    ctx.arc(x+54,y,22,0,Math.PI*2);
    ctx.fill();

}

function drawRoad(){

    ctx.fillStyle="#42c857";
    ctx.fillRect(0,430,WIDTH,170);

    ctx.fillStyle="#555";

    ctx.beginPath();
    ctx.moveTo(250,600);
    ctx.lineTo(750,600);
    ctx.lineTo(610,80);
    ctx.lineTo(390,80);
    ctx.closePath();
    ctx.fill();

    ctx.strokeStyle="gold";
    ctx.lineWidth=5;

    ctx.beginPath();
    ctx.moveTo(250,600);
    ctx.lineTo(390,80);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(750,600);
    ctx.lineTo(610,80);
    ctx.stroke();

    ctx.strokeStyle="white";
    ctx.lineWidth=4;

    for(let i=0;i<20;i++){

        let y=600-(i*45)+(roadOffset%45);

        let t=(600-y)/520;

        let w=500-(t*280);

        ctx.beginPath();
        ctx.moveTo(500-w/6,y);
        ctx.lineTo(500-w/6,y-25);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(500+w/6,y);
        ctx.lineTo(500+w/6,y-25);
        ctx.stroke();

    }

    roadOffset += 10;

}

function drawPlayer(){

    player.targetX = lanes[player.lane];

    player.x += (player.targetX-player.x)*0.15;

    // Shadow
    ctx.fillStyle="rgba(0,0,0,.25)";
    ctx.beginPath();
    ctx.ellipse(player.x,425,28,10,0,0,Math.PI*2);
    ctx.fill();

    // Legs
    ctx.strokeStyle="black";
    ctx.lineWidth=5;

    ctx.beginPath();
    ctx.moveTo(player.x-8,390);
    ctx.lineTo(player.x-16,430);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(player.x+8,390);
    ctx.lineTo(player.x+16,430);
    ctx.stroke();

    // Pants
    ctx.fillStyle="#7d4cff";
    ctx.fillRect(player.x-18,350,36,42);

    // Shirt
    ctx.fillStyle="#d60000";
    ctx.fillRect(player.x-22,295,44,58);

    // Arms
    ctx.beginPath();
    ctx.moveTo(player.x-22,305);
    ctx.lineTo(player.x-40,330);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(player.x+22,305);
    ctx.lineTo(player.x+40,330);
    ctx.stroke();

    // Neck
    ctx.fillStyle="#f2c8a0";
    ctx.fillRect(player.x-6,285,12,12);

    // Head
    ctx.beginPath();
    ctx.arc(player.x,265,22,0,Math.PI*2);
    ctx.fill();

    // Hair
    ctx.fillStyle="black";
    ctx.beginPath();
    ctx.arc(player.x,258,24,Math.PI,0);
    ctx.fill();

    // Hat
    ctx.fillStyle="#c40000";
    ctx.fillRect(player.x-34,232,68,18);

    ctx.fillStyle="white";
    ctx.font="8px Arial";
    ctx.fillText("WORLD CUP",player.x-28,243);
    ctx.fillText("EDITION",player.x-20,251);

}

function update(){

    score++;

    scoreText.textContent = score;

}

function render(){

    drawSky();

    drawCloud((roadOffset*0.3)%1200-100,90);
    drawCloud(((roadOffset*0.3)+300)%1200-100,140);
    drawCloud(((roadOffset*0.3)+700)%1200-100,110);

    drawRoad();

    drawPlayer();

}

function gameLoop(){

    update();

    render();

    requestAnimationFrame(gameLoop);

}

gameLoop();
