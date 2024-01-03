const word = ["DOG", "RIVER", "STUDENT"];
const choices = ["DETOTHURYGRFSR", "HRQUWIFVFFERUR", "STGUSHDUSEDRNT"];
const images = [
    ["image/DOG1.png", "image/DOG2.png", "image/DOG3.png"],
    ["image/RIVER1.png","image/RIVER2.png","image/RIVER3.png"],
    ["image/STUDENT1.png","image/STUDENT2.png","image/STUDENT3.png"]
];

var BGM_Intro = document.getElementById("BGM_Intro");
var BGM_Game = document.getElementById("BGM_Game");
var BGFX_Click = document.getElementById("BGFX_Click");
var BGFX_Wrong = document.getElementById("BGFX_Wrong");
var BGFX_Correct = document.getElementById("BGFX_Correct");

BGM_Intro.play();

let layout1 = document.getElementById("layout1");
let layout2 = document.getElementById("layout2");
let layout3 = document.getElementById("layout3");

let allAnswersElemets = document.querySelectorAll(".answers-elements");
let allChoicesElemets = document.querySelectorAll(".choices-elements");
let allImagesElemets = document.querySelectorAll(".image-elements");

let levelTxt = document.getElementById("level");
let backBtn = document.getElementById("backBtn").addEventListener("click", menu);
let shuffleBtn = document.getElementById("shuffleBtn").addEventListener("click", levelHandler);
let clearBtn = document.getElementById("clearBtn").addEventListener("click", clearOnly);

let finalScore = document.getElementById("score");

let lvl = 0;
let letterCount = 0;
let count = 0;
let answer = ['','','','','','',''];
let score = [];
let isPlaying = false;
let timer = 0;
let recentScores = [];

let ans1 = document.getElementById("ans1");
let ans2 = document.getElementById("ans2");
let ans3 = document.getElementById("ans3");
let ans4 = document.getElementById("ans4");
let ans5 = document.getElementById("ans5");
let ans6 = document.getElementById("ans6");
let ans7 = document.getElementById("ans7");

ans1.addEventListener("click", function(){eraseClick(ans1.innerHTML);ans1.innerHTML = "";moveText();});
ans2.addEventListener("click", function(){eraseClick(ans2.innerHTML);ans2.innerHTML = "";moveText();});
ans3.addEventListener("click", function(){eraseClick(ans3.innerHTML);ans3.innerHTML = "";moveText();});
ans4.addEventListener("click", function(){eraseClick(ans4.innerHTML);ans4.innerHTML = "";moveText();});
ans5.addEventListener("click", function(){eraseClick(ans5.innerHTML);ans5.innerHTML = "";moveText();});
ans6.addEventListener("click", function(){eraseClick(ans6.innerHTML);ans6.innerHTML = "";moveText();});
ans7.addEventListener("click", function(){eraseClick(ans7.innerHTML);ans7.innerHTML = "";moveText();});

function eraseClick(text){
    BGFX_Click.play();
    allChoicesElemets.forEach(element => {
        if (element.classList.contains("hide") && element.innerHTML == text) {
            element.classList.remove("hide");
            count--;
        }
    });
}
function moveText(){
    for (let x=0; x<6; x++){
        if(allAnswersElemets[x].innerHTML == "" && allAnswersElemets[x+1].innerHTML != undefined) {
            allAnswersElemets[x].innerHTML = allAnswersElemets[x+1].innerHTML;
            answer[x] = answer[x+1];
            try {
                allAnswersElemets[x+1].innerHTML = "";
                answer[x+1] = '';
            } catch (error) {
                console.log(error);
            }
        }
    }
}

let choices1 = document.getElementById("choices1");
let choices2 = document.getElementById("choices2");
let choices3 = document.getElementById("choices3");
let choices4 = document.getElementById("choices4");
let choices5 = document.getElementById("choices5");
let choices6 = document.getElementById("choices6");
let choices7 = document.getElementById("choices7");
let choices8 = document.getElementById("choices8");
let choices9 = document.getElementById("choices9");
let choices10 = document.getElementById("choices10");
let choices11 = document.getElementById("choices11");
let choices12 = document.getElementById("choices12");
let choices13 = document.getElementById("choices13");
let choices14 = document.getElementById("choices14");

choices1.addEventListener("click", function(){choices1.classList.add("hide");setClcik(choices1.innerHTML);});
choices2.addEventListener("click", function(){choices2.classList.add("hide");setClcik(choices2.innerHTML);});
choices3.addEventListener("click", function(){choices3.classList.add("hide");setClcik(choices3.innerHTML);});
choices4.addEventListener("click", function(){choices4.classList.add("hide");setClcik(choices4.innerHTML);});
choices5.addEventListener("click", function(){choices5.classList.add("hide");setClcik(choices5.innerHTML);});
choices6.addEventListener("click", function(){choices6.classList.add("hide");setClcik(choices6.innerHTML);});
choices7.addEventListener("click", function(){choices7.classList.add("hide");setClcik(choices7.innerHTML);});
choices8.addEventListener("click", function(){choices8.classList.add("hide");setClcik(choices8.innerHTML);});
choices9.addEventListener("click", function(){choices9.classList.add("hide");setClcik(choices9.innerHTML);});
choices10.addEventListener("click", function(){choices10.classList.add("hide");setClcik(choices10.innerHTML);});
choices11.addEventListener("click", function(){choices11.classList.add("hide");setClcik(choices11.innerHTML);});
choices12.addEventListener("click", function(){choices12.classList.add("hide");setClcik(choices12.innerHTML);});
choices13.addEventListener("click", function(){choices13.classList.add("hide");setClcik(choices13.innerHTML);});
choices14.addEventListener("click", function(){choices14.classList.add("hide");setClcik(choices14.innerHTML);});

function play(){
    BGFX_Click.play();
    BGM_Intro.pause();
    BGM_Game.curentTime=0;
    BGM_Game.play();
    layout1.classList.add("hide");
    layout2.classList.remove("hide");
    lvl = 0;
    timer = 0;
    levelHandler();
}

function menu(){
    BGM_Intro.curentTime=0;
    BGM_Intro.play();
    layout1.classList.remove("hide");
    layout2.classList.add("hide");
    layout3.classList.add("hide");
}

function setClcik(x){
    BGFX_Click.play();
    allAnswersElemets[count].innerHTML=x;
    answer[count] = x;
    count++;
    if (count == letterCount) {
        setTimeout(function() {
            if(answer.join('') == word[lvl]) {
                isPlaying = false;
                BGFX_Correct.play();
                allAnswersElemets.forEach(element => {
                    element.classList.add("correctAnimation");
                });
                setTimeout(function(){
                    allAnswersElemets.forEach(element => {
                        element.classList.remove("correctAnimation");
                    });
                    lvl++;
                    levelHandler();
                }, 2000);
            } else {
                BGFX_Wrong.play();
                allAnswersElemets.forEach(element => {
                    element.classList.add("incorrectAnimation");
                });
                setTimeout(function(){
                    levelHandler();
                    allAnswersElemets.forEach(element => {
                        element.classList.remove("incorrectAnimation");
                    });
                }, 500);
            }
        },200)
    }
}

function levelHandler() {
    if(lvl == 3){
        menu2();
        return 0;
    }
    isPlaying = true;
    clear();
    levelTxt.innerHTML = "Lvl: " + (lvl+1);
    letterCount = word[lvl].length;
    let shuffledWord = shuffle(choices[lvl]);

    for (let i = 0; i < choices[lvl].length; i++) {
        if (i<3) {
           allImagesElemets[i].style.backgroundImage = "url('"+images[lvl][i]+"')";
           allImagesElemets[i].classList.remove("hide");
        }
        if (i<word[lvl].length) {
            if(allAnswersElemets[i].classList.contains("hide")){
                allAnswersElemets[i].classList.remove("hide");
            }
        }
        allChoicesElemets[i].classList.remove("hide");
        allChoicesElemets[i].innerHTML = shuffledWord[i];
    }
}

function menu2(){
    let x = score[0]+score[1]+score[2];
    let txt1 = Math.floor(score[0]/10) +":"+ String(score[0]).slice(-1)+" || "+ Math.floor(score[1]/10) +":"+ String(score[1]).slice(-1)+" || "+ Math.floor(score[2]/10) +":"+ String(score[2]).slice(-1)+" || "+ Math.floor(x/10) +":"+ String(x).slice(-1);
    let txt2 = "Level 1 : "+ Math.floor(score[0]/10) +":"+ String(score[0]).slice(-1)+"<br>Level 2 : "+ Math.floor(score[1]/10) +":"+ String(score[1]).slice(-1)+"<br>Level 3 : "+ Math.floor(score[2]/10) +":"+ String(score[2]).slice(-1)+"<br><br>TOTAL : "+ Math.floor(x/10) +":"+ String(x).slice(-1);
    recentScores.push(txt1);
    console.log(txt1);
    finalScore.innerHTML = "Final Score : <br>";
    finalScore.innerHTML = finalScore.innerHTML + txt2;
    document.getElementById("recentScore").innerHTML = "Recent Scores : <br>";
    recentScores.forEach(element => {
        document.getElementById("recentScore").innerHTML = document.getElementById("recentScore").innerHTML + element + "<br>";
    });
    BGM_Intro.pause();
    BGM_Game.curentTime=0;
    BGM_Game.play();
    timer = 0;
    layout3.classList.remove("hide");
    layout2.classList.add("hide");
}

function clear(){
    BGFX_Click.play();
    allImagesElemets.forEach(element => {
        if (!(element.classList.contains("hide"))){
            element.classList.add("hide");
        }
    });
    allChoicesElemets.forEach(element => {
        if (!(element.classList.contains("hide"))){
            element.classList.add("hide");
        }
    });
    allAnswersElemets.forEach(element => {
        if (!(element.classList.contains("hide"))){
            element.classList.add("hide");
        }
        element.innerHTML = "";
    });
    count = 0;
    answer = ['','','','','','',''];
}

function clearOnly(){
    BGFX_Click.play();
    allChoicesElemets.forEach(element => {
        if ((element.classList.contains("hide"))){
            element.classList.remove("hide");
        }
    });
    allAnswersElemets.forEach(element => {
        element.innerHTML = "";
    });
    count = 0;
    answer = ['','','','','','',''];
}

function shuffle (text){
    text = text.split('');
    let tmp;
    for (let i = 0; i < 14; i++) {
        let rand = Math.floor(Math.random()*13);
        tmp = text[i];
        text[i] = text[rand];
        text[rand] = tmp;
    }
    text.join();
    return text;
}

setInterval(function(){
    if (isPlaying){
        timer++;
        document.getElementById("timer").innerHTML = Math.floor(timer/10) +":"+ String(Math.floor(timer)).slice(-1);
    } else {
        if(timer != 0) {
            score[lvl] = timer;
            timer = 0;
        }
    }
},100);