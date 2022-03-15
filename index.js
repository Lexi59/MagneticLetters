// drag outside board = erase
var boardLetters = [];
var letters = "abcdefghijklmnopqrstuvwxyz";
var board = document.getElementById("board");
var bkgnd = document.getElementById('bkgrnd');
var nextAvailID = 0;

//add letters to the bottom of the page
var letterSection = document.querySelector("#letters");
for(var i =0; i < letters.length; i++){
  var temp = document.createElement('div');
  temp.classList.add('bigLetter');
  temp.innerHTML = letters[i];
  if("aeiou".includes(letters[i])){temp.classList.add('vowel');}
  temp.setAttribute('onclick', 'addLetterToBoard("'+letters[i]+'")');
  letterSection.appendChild(temp);
}

function addLetterToBoard(letter){
  var letters = document.getElementsByClassName('letter').length
  if(letters < 24){
    new BoardLetter(letter);
  }
}

class BoardLetter{
  constructor(letter){
    this.id = nextAvailID;
    var div = document.createElement('div');
    div.textContent = letter;
    div.id = nextAvailID;
    div.classList.add('letter');
    if('aeiou'.includes(letter)){
      div.classList.add('vowel');
    }
    dragElement(div);
    board.appendChild(div); 

    var numLetters = document.getElementsByClassName('letter').length -1;
    var letterWidth = (bkgnd.offsetWidth/10)
    var top = 0;
    var left = nextAvailID * letterWidth;
    while(left + letterWidth > bkgnd.offsetWidth * 0.8){left -= bkgnd.offsetWidth * 0.8; top += letterWidth;}
    div.style.left = (div.offsetLeft +left) + 'px';
    div.style.top = (div.offsetTop +top) + 'px';
    nextAvailID++;
  }
}

function erase(){
  var letters = document.getElementsByClassName('letter');
  for(var i = letters.length-1; i >= 0; i--){
    deleteElement(letters[i]);
  }
  nextAvailID= 0;
}

function deleteElement(e){
  totalOffset -= e.offsetWidth;
  e.remove();
}

// Make the DIV element draggable:
function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    elmnt.onmousedown = dragMouseDown;
    elmnt.ontouchstart = dragFingerDown;

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.ontouchend = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
    document.ontouchmove = elementFingerDrag;
  }
  function dragFingerDown(e) {
    e = e || window.event;
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.ontouchend = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
    document.ontouchmove = elementFingerDrag;
  }
  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";

    if(parseInt(elmnt.style.top.split('px')[0]) > bkgnd.offsetTop + bkgnd.offsetHeight){
      deleteElement(elmnt);
      closeDragElement();
    }
    else if(parseInt(elmnt.style.top.split('px')[0]) < bkgnd.offsetTop){
      deleteElement(elmnt);
      closeDragElement();
    }
    else if(parseInt(elmnt.style.left.split('px')[0]) < bkgnd.offsetLeft){
      deleteElement(elmnt);
      closeDragElement();
    }
    else if(parseInt(elmnt.style.left.split('px')[0]) > bkgnd.offsetLeft + bkgnd.offsetWidth){
      deleteElement(elmnt);
      closeDragElement();
    }
  }
  function elementFingerDrag(e) {
    e = e || window.event;
    // calculate the new cursor position:
    pos1 = pos3 - e.touches[0].clientX;
    pos2 = pos4 - e.touches[0].clientY;
    pos3 = e.touches[0].clientX;
    pos4 = e.touches[0].clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";

    if(parseInt(elmnt.style.top.split('px')[0]) > bkgnd.offsetTop + bkgnd.offsetHeight){
      deleteElement(elmnt);
    }
    else if(parseInt(elmnt.style.top.split('px')[0]) < bkgnd.offsetTop){
      deleteElement(elmnt);
    }
    else if(parseInt(elmnt.style.left.split('px')[0]) < bkgnd.offsetLeft){
      deleteElement(elmnt);
    }
    else if(parseInt(elmnt.style.left.split('px')[0]) > bkgnd.offsetLeft + bkgnd.offsetWidth){
      deleteElement(elmnt);
    }
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.ontouchend = null;
    document.onmousemove = null;
    document.ontouchmove = null;
  }
}
