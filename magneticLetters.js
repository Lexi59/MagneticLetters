let keys = new Array();
var currentLetters = new Array();
var boxWidth, boxHeight, tileSize;

class Letter{
	constructor(x,y,l){
		this.x = x;
		this.y = y;
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
		textAlign(LEFT, TOP);
		text(this.letter,this.x,this.y);
	}
}
class key{
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
		fill(255);
	//rect(this.x,this.y,this.size, this.size);
		fill(this.fill);
		textSize(45);
		text(this.l, this.x, this.y)
	}
}

function setup(){
	createCanvas(windowWidth,windowHeight);
	background(240,240,240);
	textAlign(LEFT, TOP);


	fill(200,198,220);
	boxWidth = width/2;
	boxHeight = (3*height)/5;
	tileSize = boxWidth/13-6;
	rect(width/4, 25, boxWidth,boxHeight);

	for(var i = 0; i < 2; i++){
		for(var j = 0; j < 13; j++){
			keys.push(new key(width/4+tileSize*j+6*j,i*(height/15)+boxHeight+50, tileSize, String.fromCharCode(97+(i*13)+j)));
		}
	}

	for(var i = 0; i < keys.length; i++){
		keys[i].show();
	}
}

function draw(){
	clear();
	fill(200,198,220);
	boxWidth = width/2;
	boxHeight = (3*height)/5;
	tileSize = boxWidth/13-6;
	rect(width/4, 25, boxWidth,boxHeight);

	for(var i = 0; i < currentLetters.length; i++){
		currentLetters[i].show();
	}
	for(var i = 0; i < keys.length; i++){
		keys[i].show();
	}

	fill('red');
	ellipse(width/2,4*(height/15)+boxHeight, 50,50);
	fill(255);
	textSize(36);
	text('X',width/2-15,4*(height/15)+boxHeight-15);
}

function mousePressed(){
	for(var i = 0; i < keys.length; i++){
		if(mouseX < keys[i].x+keys[i].size && mouseX > keys[i].x && mouseY < keys[i].y + keys[i].size && mouseY > keys[i].y){
			if(currentLetters.length >= 70){
				console.log("Can't place anymore letters!");
				return;
			}
			var x = currentLetters.length % 10;
			var y = Math.floor(currentLetters.length / 10);
			currentLetters.push(new Letter(width/4+x*60, 25+y*60, keys[i].l));
		}
	}
	for(var i = 0; i < currentLetters.length; i++){
		if(mouseX < currentLetters[i].x + 60 && mouseX > currentLetters[i].x && mouseY < currentLetters[i].y + 60 && mouseY> currentLetters[i].y){
			currentLetters[i].active = true;
		}
		else{
			currentLetters[i].active = false;
		}
	}
	if(mouseX <width/2 + 25 && mouseX > width/2 - 25 && mouseY < 4*(height/15)+boxHeight + 25 && mouseY > 4*(height/15)+boxHeight -25){
		currentLetters = new Array();
	}
}

function mouseDragged(){
	for(var i = 0; i < currentLetters.length; i++){
		if(currentLetters[i].active){
			currentLetters[i].x = mouseX;
			currentLetters[i].y = mouseY;
			if(currentLetters[i].x < width/4 || currentLetters[i].x > width/4 + boxWidth || currentLetters[i].y > boxHeight || currentLetters[i].y < 25){
				currentLetters.splice(i,1);
			}
			break;
		}
	}
}
