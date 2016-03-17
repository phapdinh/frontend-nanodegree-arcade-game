// Enemies our player must avoid
var Enemy = function(x,y,speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
	this.x = x;
	this.y = y;
	this.speed = speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
	this.x = this.x + dt * this.speed;
	if(this.x > 420) this.x = 0;
	if((this.x - 70 < player.x && player.x < (this.x + 75)) && ((this.y - 50) < player.y && player.y < (this.y + 70))) {
		player.x = 200;
		player.y = 340;
	}
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x,y) {
	this.x = x;
	this.y = y;
	this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function() {
	if(this.y === 60) {
		this.x = 200;
		this.y = 340;
	}
};

Player.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key) {
	if(key === "left" && (this.x > 0)) {
		this.x = this.x - 10;
	}
	else if(key === "up" && (this.y >= 60)) {
		this.y = this.y - 10;
	}
	else if(key === "right" && (this.x < 420)) {
		this.x = this.x + 10;
	}
	else if(key === "down" && (this.y < 347)) {
		this.y = this.y + 10;
	}
	
	if(key === 'h') {
		this.sprite = 'images/char-cat-girl.png';
	}
	else if(key === 'j') {
		this.sprite = 'images/char-horn-girl.png';
	}
	else if(key === 'k') {
		this.sprite = 'images/char-pink-girl.png';
	}
	else if(key === 'l') {
		this.sprite = 'images/char-princess-girl.png';
	}
	else if(key === 'g') {
		this.sprite = 'images/char-boy.png';
	}
};

var Star = function() {
	this.numStars = 0;
	this.sprite = 'images/Star.png';
};

Star.prototype.render = function() {
	for (col = 0; col < this.numStars; col++) {
        ctx.drawImage(Resources.get(this.sprite), col * 101, 455);
    }
}

var Key = function() {
	this.x = Math.floor(Math.random() * 420);
	this.y = Math.floor(Math.random() * 200 + 60);
	this.sprite = 'images/Key.png'
}

Key.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Key.prototype.update = function() {
	if((this.x - 70 < player.x && player.x < (this.x + 75)) && ((this.y - 50) < player.y && player.y < (this.y + 70))) {
		key.x = Math.floor(Math.random() * 420);;
		key.y = Math.floor(Math.random() * 160 + 60);
		if(star.numStars < 6) {
			star.numStars++;
		}
	}
}
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
allEnemies.push(new Enemy(0,60,30));
allEnemies.push(new Enemy(100,140,80));
allEnemies.push(new Enemy(100,220,50)); 
var player = new Player(200,340);
var star = new Star();
var key = new Key();
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
		72: 'h',
		74: 'j',
		75: 'k',
		76: 'l',
		71: 'g'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
