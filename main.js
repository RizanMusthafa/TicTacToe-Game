
// CREATE GLOBAL VARIABLE ------------------------------------------------------

var choice_div = document.getElementById('choice');
var choice_btn = document.querySelectorAll("#item-choice button");
var box_div = document.querySelectorAll('.box');
var res_div = document.getElementById('result');
var title_h1 = document.getElementById('title');
var userScore_div = document.getElementById('user-score');
var comScore_div = document.getElementById('com-score');
var ok_btn = document.getElementById('ok-btn');
var circle = '<i class="fa fa-circle-thin"></i>';
var cross = '<i class="fa fa-times"></i>';
var userItem = circle;
var userScore = 0;
var comItem = cross;
var comScore = 0;
var winOpt = ['123', '456', '789', '147', '258', '369', '159', '357'];
var boxes = {
  1: true, 2: true, 3: true,

  4: true, 5: true, 6: true,

  7: true, 8: true, 9: true,
};

// =============================================================================

function resetGame() {
  for(var j=1; j<10; j++) {
    document.getElementById(j).innerHTML = '';
    boxes[j]=true;
  }
  winOpt = ['123', '456', '789', '147', '258', '369', '159', '357'];
}

function checkRemainPlace() {
  var exp = /[1-9]/g
  if(winOpt.join("").match(exp)) {
    return true;
  }
  else {
    return false;
  }
}

function winMsg(p) {
  var title = "";
  if(p==='x') {
    title = "You Lost It ;(";
  }
  else if(p==="o"){
    title = "You Won It :)"
  }
  else {
    title = "It was a Draw :|";
  }
  title_h1.textContent = title;
  result.hidden = false;
}

function fillBoxes(p, q) {
  boxes[p] = false;
  winOpt.forEach(function(a,b,c) {
    var temp = a.split("");
    var i = temp.indexOf(p);
    if(i>-1) {
      temp.splice(i,1, q);
    }
    c[b] = temp.join("");
  });
}

function checkWin(p) {
  if(winOpt.indexOf(p)>-1) {
    return true;
  }
  return false;
 }

function getComWinORLost(p) {
  var x = 0;
  var exp1,exp2;
  if(p==='x') {
    exp1 = /[0-9]xx|x[0-9]x|xx[0-9]/;
    exp2 = /x/g
  }
  else if(p==='o') {
    exp1 = /[0-9]oo|o[0-9]o|oo[0-9]/;
    exp2 = /o/g
  }
  winOpt.forEach(function(a,b,c) {
    if(a.match(exp1)) {
      x = parseInt(a.replace(exp2, ''));
    }
  });
  return x;
 }

function getComDrawBox() {
  var t = 0;
  var x = 0;
  var boxOpts = [5,1,3,7,9,2,4,6,8];
  for(var i=0; i<9; i++) {
    var j = boxOpts[i];
    if(boxes[j]) {
      t = j;
      break;
    }
  }

  x = getComWinORLost('o');
  if(Boolean(x) && boxes[x]) {
    t = x;
  }

  x = getComWinORLost('x');
  if(Boolean(x) && boxes[x]) {
    t = x;
  }
  var tar = document.getElementById(t);
  return tar;
}

function makeDraw(tar, i) {
  if(tar===null || i===undefined) {
    return false;
  }
  var boxId = tar.id;
  var item = (i==='o')? userItem:comItem;
  if(boxes[boxId]) {
    tar.innerHTML = item;
    fillBoxes(boxId, i);
    return true;
  }
  return false;
}

function main() {
  // choice_div.hidden = false;
  choice_btn.forEach(function(a,b,c) {
    a.onclick = function(e) {
      var t = this.dataset.value;
      if(t==='x') {
        userItem = cross;
        comItem = circle;
      }
      choice_div.hidden = true;
    };
  });

  box_div.forEach(function(a) {
    a.onclick = function(e) {
      if(makeDraw(e.target, 'o')) {
        if(checkWin('ooo')) {
          winMsg('o');
          userScore++;
          return;
        }
        else if(!checkRemainPlace()) {
          winMsg('');
          return;
        }
        else {
          makeDraw(getComDrawBox(), 'x');
          if(checkWin('xxx')) {
            winMsg('x');
            comScore++;
            return;
          }
        }
      }
    };
  });

  ok_btn.onclick = function(e) {
    userScore_div.textContent = userScore;
    comScore_div.textContent = comScore;
    resetGame();
    res_div.hidden = true;
  };
}

main();
