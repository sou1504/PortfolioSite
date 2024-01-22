console.log("helloworld");

const SCREEN_SIZE_W = 166;
const SCREEN_SIZE_H = 140;

//仮想画面
let vcan = document.createElement("canvas"); //ここのcanvas名は自由じゃなくて決まっている
let vcon = vcan.getContext("2d");

//実画面
let can = document.getElementById("canvas");
let con = can.getContext("2d");

//画面サイズ設定
vcan.width = SCREEN_SIZE_W;
vcan.height = SCREEN_SIZE_H;

can.width = SCREEN_SIZE_W*3;
can.height = SCREEN_SIZE_H*3;

document.oncontextmenu = function(){ return false; };
document.body.oncontextmenu = "return false;"

//靄がかからないようにする
con.mozimageSmoothingEnabled = false;
con.msimageSmoothingEnabled = false;
con.webkitimageSmoothingEnabled = false;
con.imageSmoothingEnabled = false;



//メインループ呼び出し 60FPS
setInterval(mainLoop, 1000/60);



//初期化///////////////////////////////////////////////////////////////////////////////////////////////////////////

    let chPosX = 20;
    let chPosY = 64;
    let speed = 3;
    let Kspeed = 1;
    let wall = 0;
    let sCount = 0;
    let sNumber = 1;
    let moon = 180;
    let ms = 0;

    let chImg = new Image();
    chImg.src = "dot.png";  //画像読み込み
    chImg.onload = draw;    //読み込み終わったらdraw関数を呼ぶ
    let wallImg = new Image();
    wallImg.src = "haikei.png";
    wallImg.onload =draw;


//メインループ//////////////////////////////////////////////////////////////////////////////////////////////////////
function mainLoop()
{

    //処理
    update();

    //描画
    draw();

}


//変数/////////////////////////////////////////////////////////////////////////////////////////////////////////////
let countDown = 0;

document.onkeydown = keydown; // 入力処理の指定


//スプライト制御////////////////////////////////////////////////////////////////////////////////////////////////////
function Csprite()
{
    if(sNumber == 1)
    {
        vcon.drawImage(chImg, 32, 0, 16, 32, chPosX, chPosY, 16, 32);
    }
    
    if(sNumber == 2)
    {
        vcon.drawImage(chImg, 48, 0, 16, 32, chPosX, chPosY, 16, 32);
    }

    if(sNumber == 3)
    {
        vcon.drawImage(chImg, 64, 0, 16, 32, chPosX, chPosY, 16, 32);
    }
    
}

//オーディオ再生////////////////////////////////////////////////////////////////////////////////////////////////////
//let ad = new Audio("00.wav");
//ad.play();
//ad.loop = true;


//キーボード入力////////////////////////////////////////////////////////////////////////////////////////////////////
function keydown(e)
{
    if (e.keyCode == 32 && chPosY >= 64)
    {
     speed = -10;
     Kspeed = 1;
    }
}


//デバッグ情報
function debug()
{
    vcon.font ="12px monospace";
    vcon.fillStyle = "#9bbc0f";
    vcon.fillText("X:" + chPosX, 1, 10, );
    vcon.fillText("J:" + chPosY, 1, 20, );
    vcon.fillText("Y:" + wall, 1, 30, );
    vcon.fillText("S:" + sNumber, 1, 40, );
    
    vcon.fillStyle = "#0f380f";
    vcon.fillText("..", 1, 135, );
}
//処理/////////////////////////////////////////////////////////////////////////////////////////////////////////////
function update()
{
    wall = wall -1; //背景処理
    if(wall < -166)
    {
        wall = 0;
    }

    /*chPosX = chPosX + 1; //移動処理

    if(chPosX > 166)
    {
        chPosX = -16;
    }*/

    speed = speed + Kspeed; //ジャンプ処理
    chPosY = chPosY + speed;

    if(chPosY > 64)
    {
        chPosY = 64;
        speed = 0;
        Kspeed = 0;
    }

    sCount ++; //スプライト処理

    if(sCount == 5)
    {
        sNumber ++;
        sCount = 0;
    }
    if(sNumber == 4)
    {
        sNumber = 1;
    }

    ms  ++; //月
    if(ms > 100)
    {
        ms = 0;
        moon = moon - 1;
    }
    if(moon < -32)
    {
        moon = 200;
    }




}


//描画/////////////////////////////////////////////////////////////////////////////////////////////////////////////
function draw()
{

    //キャンバスに仮想から拡大表示
    con.drawImage(vcan, 0, 0, SCREEN_SIZE_W, SCREEN_SIZE_H,  0, 0, SCREEN_SIZE_W*3, SCREEN_SIZE_H*3); 

    //背景色
    vcon.fillStyle = "#0f380f";
    vcon.fillRect(0, 0, SCREEN_SIZE_W, SCREEN_SIZE_H);
    
    //地面
    vcon.drawImage(wallImg, 0, 0, 332, 140, wall, 0, 332, 140);

    vcon.drawImage(chImg, 0, 48, 32, 32, moon, 20, 32, 32);



    //デバッグ情報
    debug();

    //スプライト表示テスト
    Csprite();

}