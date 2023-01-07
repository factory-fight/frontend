var objImage = null;
var jump_vel = null;
var is_jump = null;
var gravity = null;
y_vel = 0;


var bulletCount = 0
class Bullet {
  constructor(is_left, shooter_id, y, x) {
    const bullet = document.createElement("img");
    bullet.src = "./assets/objects/bullet.png"
    bullet.id = "bullet-" + bulletCount
    bullet.style.position = "relative"
    document.getElementById("bg").appendChild(bullet);
    var new_bullet = document.getElementById("bullet-" + bulletCount)
    new_bullet.style.height = "10px"
    if (is_left == 0) {
      new_bullet.style.transform = "scaleX(1)"
    } else if (is_left == 1) {
      new_bullet.style.transform = "scaleX(-1)"
    }
    this.bullet = new_bullet
    this.shooter = shooter_id
    this.bullet.style.top = y
    this.bullet.style.left = x

    this.is_left = is_left
    bulletCount += 1
  }
  initiateBullet() {
    for (var i = 0; i < 500; i++) {
      var left_val = (parseInt(this.bullet.style.left) + 10) + "px";
      console.log(left_val)
      this.bullet.style.left = left_val
    }
  }
}

class life{
  constructor(life_count,id,is_left){
    this.life_count = life_count
    const life_set = document.createElement("div");
    life_set.style.position = "relative"

    life_set.id = "life_set"+id
    life_set.style.top = 10
    if(is_left){
      life_set.style.left = (parseInt(screen.width)- parseInt(life_set.clientWidth)-10)+"px"
    }else{
      life_set.style.left = "50px"
    }

    document.getElementById("bg").appendChild(life_set);
    for(var i =0;i<life_count;i++ ){
      const life = document.createElement("img");
      life.id = "life_set"+id+"_"+i
      life.src = "./assets/objects/life.png"
      life.style.height = "40px"
      document.getElementById("life_set"+id).appendChild(life);
    }
    for(var i =life_count;i<5;i++ ){
      const life = document.createElement("img");
      life.id = "life_set"+id+"_"+i
      life.src = "./assets/objects/life-gone.png"
      life.style.height = "40px"
      document.getElementById("life_set"+id).appendChild(life);
    }
  }
}


class Player {
  constructor(player_id, char_base) {
    this.objImage = document.getElementById(player_id);
    this.char_base = char_base
    this.char_pos = 0;
    this.char_addr = char_base + this.char_pos + ".png";
    this.speed = screen.width / 100;
    this.jump_vel = screen.height / 20;
    this.gravity = this.jump_vel / 5;
    this.is_jump = false;
    this.player_id = player_id
    this.initiatePlayer()
  }

  initiatePlayer() {
    this.objImage.style.position = "relative";
    this.objImage.style.left = "50px";
    this.objImage.style.top =
      parseInt(screen.height) * 0.7 - parseInt(this.objImage.clientHeight) + "px";
    this.objImage.src = this.char_addr;
  }

  //jumping
  async jump() {
    if (!this.is_jump) {
      this.is_jump = true;
      var y_vel = -this.jump_vel;
      this.jumpInner(y_vel);
      this.is_jump = false;
    }
  }
  async jumpInner(y_vel) {
    if (y_vel <= this.jump_vel) {
      y_vel += this.gravity;
      setTimeout(async () => { this.jumpInner(y_vel) }, 60);
      console.log("y_vel " + y_vel);
      var y_val = parseInt(this.objImage.style.top) + y_vel;
      y_val =
        y_val > parseInt(screen.height) * 0.7 - parseInt(this.objImage.clientHeight)
          ? parseInt(screen.height) * 0.7 - parseInt(this.objImage.clientHeight)
          : y_val;
      this.objImage.style.top = y_val + "px";
    }
  }

  moveLeft() {
    if (parseInt(this.objImage.style.left) > 0) {
      this.objImage.src = this.char_base + (++this.char_pos % 6) + ".png";
      this.objImage.style.transform = "scaleX(-1)";
      var val = parseInt(this.objImage.style.left) - this.speed;
      this.objImage.style.left = val < 0 ? 0 : val + "px";
    }
  }
  moveUp() {
    if (parseInt(this.objImage.style.top) > 0) {
      var val = parseInt(this.objImage.style.top) - this.speed;
      this.objImage.style.top = val < 0 ? 0 : val + "px";
    }
  }
  moveRight() {
    if (
      parseInt(this.objImage.style.left) <
      parseInt(screen.width) - parseInt(this.objImage.clientWidth)
    ) {
      this.objImage.src = this.char_base + (++this.char_pos % 6) + ".png";
      this.objImage.style.transform = "scaleX(1)";
      var val = parseInt(this.objImage.style.left) + this.speed;
      this.objImage.style.left =
        val > parseInt(screen.width) - parseInt(this.objImage.clientWidth)
          ? parseInt(screen.width) - parseInt(this.objImage.clientWidth)
          : val + "px";
    }
  }
  moveDown() {
    var val = parseInt(this.objImage.style.top) + this.speed;
    if (
      parseInt(this.objImage.style.top) <
      parseInt(screen.height) * 0.7 - parseInt(this.objImage.clientHeight)
    ) {
      objImage.style.top =
        val > parseInt(screen.height) * 0.7 - parseInt(this.objImage.clientHeight)
          ? parseInt(screen.height) * 0.7 - parseInt(this.objImage.clientHeight)
          : val + "px";
    }
  }

  shoot() {
    var bullet = new Bullet(this.objImage.style.transform == "scaleX(-1)" ? 1 : 0, this.player_id, this.objImage.style.top, this.objImage.style.left)
    bullet.initiateBullet()
  }
}
// var char_base = "./assets/cyborg run/";
// var char_pos = 0;





var map = {}



function getKeyAndMove(e) {
  var key_code = e.which || e.keyCode;
  map[key_code] = e.type == 'keydown';
  console.log(map)
  if (map[37]) {
    player_1.moveLeft();
  }
  if (map[38]) {
    player_1.jump();
  }
  if (map[39]) {
    player_1.moveRight();
  }
  if (map[40]) {
    // player_1.moveDown();
    player_1.shoot()
  }
  if (map[65]) {
    player_2.moveLeft();
  }
  if (map[87]) {
    player_2.jump();

  }
  if (map[68]) {
    player_2.moveRight();
  }
  if (map[83]) {
    player_2.moveDown();
  }
}


var player_1 = null
var player_2 = null
var life_1 = null
var life_2 = null
function init() {
  player_1 = new Player("image1", "./assets/cyborg run/")
  player_2 = new Player("image2", "./assets/punk run attack/")
  life_1 = new life(3,1,false)
  life_2 = new life(3,1,true)
  
}





window.onload = init;
