let keys = new Array();
var currentLetters = new Array();
var myFont, mybgn;
var boxWidth, boxHeight, tileSize;

function preload(){
	myFont = loadFont('KGMissKindergarten.ttf');
	mybgn = loadImage('bkgrnd.png');
}

class Letter{
	constructor(x,y,l){
		this.x = x+20;
		this.y = y+20;
		this.letter = l;
		if(l == 'a' || l == 'e' || l == 'i' || l == "o" || l == "u"){
			this.fill = 'red';
		}
		else{
			this.fill = 'blue';
		}
		this.active = false;
	}
	show(){
		stroke(0);
		fill(this.fill);
		textSize(72);
		textStyle(BOLD);
		textAlign(CENTER, CENTER);
		//rect(this.x-35, this.y-25, 70,85);
		text(this.letter,this.x,this.y);
	}
}
class Key{
	constructor(x,y,s,l){
		this.x = x;
		this.y = y;
		this.size = s;
		this.l = l;
		if(l == 'a' || l == 'e' || l == 'i' || l == "o" || l == "u"){
			this.fill = 'red';
		}
		else{
			this.fill = 'blue';
		}
	}
	show(){
		stroke(0);
		fill(this.fill);
		textSize(45);
		textStyle(BOLD);
		text(this.l, this.x, this.y);
		//rect(this.x -20,this.y-30, this.size, this.size);
	}
}

function setup(){
	createCanvas(windowWidth,windowHeight);
	background(240,240,240);
	textAlign(CENTER, CENTER);
	textFont(myFont);

	fill(200,198,220);
	boxWidth = width/2;
	boxHeight = (3*height)/5;
	tileSize = boxWidth/13-6;
	//rect(width/4, 25, boxWidth,boxHeight);

	for(var i = 0; i < 2; i++){
		for(var j = 0; j < 13; j++){
			keys.push(new Key(width/4+tileSize*j+10*j+30,i*(height/10)+boxHeight+170, tileSize, String.fromCharCode(97+(i*13)+j)));
		}
	}

	for(var i = 0; i < keys.length; i++){
		keys[i].show();
	}
}

function draw(){
	clear();
	mybgn.resize(2*width/3,4*height/5);
	image(mybgn, width/4-90, 0);
	//fill(200,198,220);
	noFill();
	boxWidth = 11*width/20;
	boxHeight = height/2;
	tileSize = boxWidth/13-6;
	//rect(width/4, 170, boxWidth,boxHeight);

	for(var i = 0; i < currentLetters.length; i++){
		currentLetters[i].show();
	}
	for(var i = 0; i < keys.length; i++){
		keys[i].show();
	}

	fill('red');
	ellipse(width/2,4*(height/13)+boxHeight-25, 50,50);
	fill(255);
	textSize(36);
	text('X',width/2,4*(height/13)+boxHeight-30);
}

function mouseReleased(){
	console.log(mouseX + ","+ mouseY);
	for(var i = 0; i < currentLetters.length; i++){
		if(mouseX < currentLetters[i].x + 35 && mouseX > currentLetters[i].x -35 && mouseY < currentLetters[i].y + 60 && mouseY> currentLetters[i].y-25){
			currentLetters[i].active = true;
		}
		else{
			currentLetters[i].active = false;
		}
	}
	if(mouseX <width/2 + 25 && mouseX >width/2 - 25 && mouseY < 4*(height/13)+boxHeight && mouseY > 4*(height/13)+boxHeight -75){
		currentLetters = new Array();
	}
	for(var i = 0; i < keys.length; i++){
		if(mouseX < keys[i].x-20 +keys[i].size && mouseX > keys[i].x - 20 && mouseY < keys[i].y -30 + keys[i].size && mouseY > keys[i].y - 30){
			if(currentLetters.length >= 60){
				console.log("Can't place anymore letters!");
				return;
			}
			var x = currentLetters.length % 12;
			var y = Math.floor(currentLetters.length / 12);
			currentLetters.push(new Letter(width/4+x*70, 170+y*70, keys[i].l));
		}
	}
}

function mouseDragged(){
	for(var i = 0; i < currentLetters.length; i++){
		if(currentLetters[i].active){
			currentLetters[i].x = mouseX;
			currentLetters[i].y = mouseY;
			if(currentLetters[i].x < width/4 || currentLetters[i].x > width/4 + boxWidth || currentLetters[i].y > boxHeight + 150 || currentLetters[i].y < 140){
				currentLetters.splice(i,1);
			}
			break;
		}
	}
}
function touchStarted(){

}
