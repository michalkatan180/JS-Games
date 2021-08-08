var nikud = 0, cntBomb = 0;
var places = ["5vw", "20vw", "35vw", "50vw", "65vw", "80vw", "95vw"];
var speed = [0.1, 0.2, 1, 8, 0.1, 3, 2];
var img = [
    "url('../IMG/school/bumb.gif')",
    "url('../IMG/school/bomb_PNG28.png')",
    "url('../IMG/school/דף ועיפרון.gif')",
    "url('../IMG/school/ילקוט.gif')",
    "url('../IMG/school/מחברת.gif')",
    "url('../IMG/school/מחוגה.gif')",
    "url('../IMG/school/מחשבון.gif')",
    "url('../IMG/school/מרקר.gif')",
    "url('../IMG/school/נעץ.gif')",
    "url('../IMG/school/עט.gif')",
    "url('../IMG/school/עיפרון.gif')",
    "url('../IMG/school/תעודה.gif')",

];
function Start() {
    document.onmousemove = moveBase;
    RandomBalls();
    setTimeout(Finish, 17800);
    setInterval(RandomBalls, 800);
}
function moveBase() {
    // if (event.pageX>26)
    document.getElementById("mouseDiv").style.right = window.screen.width - (event.pageX) + "px";
}
function RandomBalls() {
    var randImg = Math.round(Math.random() * 100) % 12;
    var randPlace = Math.round(Math.random() * 100) % 6;
    var randSpeed = speed[Math.round(Math.random() * 100) % 6];
    var div = document.createElement("div");
    div.style.backgroundImage = img[randImg];
    div.classList.add("moveFruit");
    div.style.right = places[randPlace];
    if (randImg == 0 || randImg == 1) {
        div.setAttribute("bomb", "yes");
    }
    else { div.setAttribute("bomb", "no"); }

    div.moveInterval = setInterval(function () {
        var type = div.getAttribute("bomb");
        if (moveFruit(div) == false)//שולח לפונקציה שהיא בודקת האם יש מקום, אם כן מורידה עוד למטה
            Check(div, type);//כאשר מחזירה פאלס סימן שהגיעה לתחתית המסך ומופעלת בדיקה
    }, randSpeed);   //כל 4 אלפיות השניה יעשה את הפונקציה הזו
    document.getElementById("from").appendChild(div);

}
function moveFruit(div) {
    var top = div.offsetTop;
    if (top < window.screen.availHeight - 101) {
        top += 2;
        div.style.top = top + "px";
    }
    else { return false; }
}
function Check(div, type) {
    if (div.offsetLeft<document.getElementById("mouseDiv").offsetLeft + document.getElementById("mouseDiv").offsetWidth &&
        div.offsetLeft >= document.getElementById("mouseDiv").offsetLeft) {
        if (type == "no") {
            nikud += 5;
            document.getElementById("v").play();
        }
        else {
            cntBomb++;
            //document.getElementById("b" + cntBomb).remove();
            document.getElementById("x").play();
            nikud -= 10;
            if (cntBomb == 5)
                Finish_loss();
        }
        document.getElementById("myMark").innerHTML = "";
        document.getElementById("myMark").innerHTML = nikud;
    }
    div.style.display = "none";
}
function Finish_loss() {
    localStorage.setItem("mark", nikud);
    window.location = "Loss.html";
}
function Finish_win() {
    localStorage.setItem("mark", nikud);
    window.location = "Win.html";
}
function Finish() {
    if (nikud < 20)
        Finish_loss();
    else Finish_win();
}