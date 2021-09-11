const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var rope,fruit,ground;
var fruit_con;
var fruit_con_2;
var fruit_con_3;
var rope3;
var bubble, bubble_img

var bg_img;
var food;
var rabbit;

var button,button2,button3;
var bunny;
var blink,eat,sad;
var mute_btn;

var fr;
var shelf;

var bk_song;
var cut_sound;
var sad_sound;
var eating_sound;
var air;
var canW;
var canH;

function preload()
{
  bg_img = loadImage('background.png');
  food = loadImage('melon.png');
  rabbit = loadImage('Rabbit-01.png');
  bubble_img = loadImage("bubble.png")

  bk_song = loadSound('sound1.mp3');
  sad_sound = loadSound("sad.wav")
  cut_sound = loadSound('rope_cut.mp3');
  eating_sound = loadSound('eating_sound.mp3');
  air = loadSound('air.wav');

  blink = loadAnimation("blink_1.png","blink_2.png","blink_3.png");
  eat = loadAnimation("eat_0.png" , "eat_1.png","eat_2.png","eat_3.png","eat_4.png");
  sad = loadAnimation("sad_1.png","sad_2.png","sad_3.png");
  
  blink.playing = true;
  eat.playing = true;
  sad.playing = true;
  sad.looping= false;
  eat.looping = false; 
}

function setup() 
{
  var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  if(isMobile){
    canW = displayWidth
    canH = displayHeight 
    createCanvas(displayWidth+80, displayHeight)
  }
  else{
    canW = windowWidth
    canH = windowHeight
    createCanvas(windowWidth,windowHeight)
  }
  
  frameRate(80);

  bk_song.play();
  bk_song.setVolume(0.5);

  engine = Engine.create();
  world = engine.world;
var fruit_options = {
  restituion:0.8
}

ground = new Ground(200,canH,600,20);


fruit = Bodies.circle(100,400,20,fruit_options);
  World.add(world,fruit)

bubble = createSprite(290,460,20,20)
bubble.addImage(bubble_img)
bubble.scale = 0.1

  //btn 1
  button = createImg('cut_btn.png');
  button.position(200,320);
  button.size(50,50);
  button.mouseClicked(drop);

   //btn 2
   button2 = createImg('cut_btn.png');
   button2.position(30,420);
   button2.size(60,60);
   button2.mouseClicked(drop2);

  mute_btn = createImg('mute.png');
  mute_btn.position(450,20);
  mute_btn.size(50,50);
  mute_btn.mouseClicked(mute);
  
  rope = new Rope(4,{x:230,y:330});
  rope2 = new Rope(4,{x:50,y:450});


  blink.frameDelay = 20;
  eat.frameDelay = 20;

  shelf = new Ground(300,170,100,10)

  bunny = createSprite(270,100,100,100);
  bunny.scale = 0.2;

  bunny.addAnimation('blinking',blink);
  bunny.addAnimation('eating',eat);
  bunny.addAnimation('crying',sad);
  bunny.changeAnimation('blinking');
  
  fruit_con = new Link(rope,fruit);
  fruit_con_2 = new Link(rope2,fruit);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  
}

function draw() 
{
  background(51);
  image(bg_img,0, 0, displayWidth+80, displayHeight);

  push();
  imageMode(CENTER);
  if(fruit!=null){
    image(food,fruit.position.x,fruit.position.y,70,70);
  }
  pop();

  rope.show();
  rope2.show();

  Engine.update(engine);
  ground.show();
  shelf.show();

  drawSprites();

  if(collide(fruit,bunny,80)==true)
  {
    remove_rope();
    bubble.visible = false
    eating_sound.play();
    World.remove(engine.world,fruit)
    fruit = null
    bunny.changeAnimation('eating');
  }
  if(collide(fruit,bubble,40)==true)
  {
   engine.world.gravity.y = -1
   bubble.position.x = fruit.position.x
   bubble.position.y = fruit.position.y
  }

  if(fruit!=null && fruit.position.y>=650)
  {
    bunny.changeAnimation('crying');
    bk_song.stop();
    sad_sound.play();
    fruit=null;
     
   }
   
}

function drop()
{
  cut_sound.play();
  rope.break();
  fruit_con.detach();
  fruit_con = null; 
}

function drop2()
{
  cut_sound.play();
  rope2.break();
  fruit_con_2.detach();
  fruit_con_2 = null;
}

function collide(body,sprite,x)
{
  if(body!=null)
        {
         var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
          if(d<=x)
            {
              World.remove(engine.world,fruit);
               fruit = null;
               return true; 
            }
            else{
              return false;
            }
         }
}


function mute()
{
  if(bk_song.isPlaying())
     {
      bk_song.stop();
     }
     else{
      bk_song.play();
     }
}

function remove_rope(){
  rope.break()
  fruit_con.deattach()
  fruit_con = null 
}


