var nikud = 0, cntBomb = 0, time = 40;
var places = ["5vw", "20vw", "35vw", "50vw", "65vw", "80vw", "90vw"];
var presents = ["url('../IMG/fruits/presents/flower.png')",
    "url('../IMG/fruits/presents/gift-5.png')",
    "url('../IMG/fruits/presents/hat.png')"];
var speed = [0.1, 0.2, 1, 8, 0.1, 3, 2];
var img = ["url('../IMG/fruits/bomb_PNG28.png')",
    "url('../IMG/fruits/bumb.gif",
    "url('../IMG/fruits/bumb.gif",
    "url('../IMG/fruits/אננס.gif",
    "url('../IMG/fruits/אגס ירוק.gif",
    "url('../IMG/fruits/אגס.gif",
    "url('../IMG/fruits/בננה.gif",
    "url('../IMG/fruits/אפרסק.gif",
    "url('../IMG/fruits/דובדבן.gif",
    "url('../IMG/fruits/לימון.gif",
    "url('../IMG/fruits/מנגו.gif",
    "url('../IMG/fruits/משמש.gif",
    "url('../IMG/fruits/ענבים ירוקים.gif",
    "url('../IMG/fruits/ענבים.gif",
    "url('../IMG/fruits/קלמנטינה.gif",
    "url('../IMG/fruits/רימון.gif",
    "url('../IMG/fruits/שזיף.gif",
    "url('../IMG/fruits/תפוז.gif",
    "url('../IMG/fruits/תות.gif"];
function Start() {
    setTimeout(function () { document.getElementById("tostart").remove(); }, 2600);
    setTimeout(function () {
        document.getElementById("to_sakinim").style.display = "block";
        document.getElementById("myMark").style.display = "block";
        document.getElementById("mouseDiv").style.display = "block";
        document.getElementById("myClock").style.display = "block";
        setInterval(clock, 1000);
        setTimeout(Finish, 42000);
        if (localStorage.getItem("knife_img") == null) {
            document.getElementById("mouseDiv").style.backgroundImage = "url('../IMG/knifes/1.gif')";
        }
        else document.getElementById("mouseDiv").style.backgroundImage = localStorage.getItem("knife_img");
        document.onmousemove = moveBase;
        document.getElementById("to_sakinim").onclick = to_sakinim;
        RandomBalls();
        setInterval(RandomBalls, 600);
    }
        , 2500);
}
function moveBase() {
    // if (event.pageX>26)
    document.getElementById("mouseDiv").style.right = window.screen.width - (event.pageX) + "px";
    document.getElementById("mouseDiv").style.top = (event.pageY) + "px";
}
function RandomBalls() {
    var randImg = Math.round(Math.random() * 100) % 21;
    var randPlace = Math.round(Math.random() * 100) % 7;//לבדוק שלא צריך אחוז שש
    var randSpeed = speed[Math.round(Math.random() * 100) % 7];//לבדוק שלא צריך אחוז שש
    var div = document.createElement("div");
    if (randImg == 19 || randImg == 20) {
        // אם אתה מתנה
        var randPresent = Math.round(Math.random() * 100) % 3;
        div.style.backgroundImage = presents[randPresent];
        div.setAttribute("p", "yes");
    }
    else {
        // אתה לא מתנה
        div.style.backgroundImage = img[randImg];
        div.setAttribute("p", "no");
    }
    if (randImg == 0 || randImg == 1 || randImg == 2) {//אם אתה פצצה
        div.setAttribute("bomb", "yes");
    }
    else { div.setAttribute("bomb", "no"); }//אתה לא פצצה
    div.classList.add("moveFruit");
    var isPresent = div.getAttribute("p");
    var type = div.getAttribute("bomb");
    div.onmouseover = () => Check(div, type, isPresent);
    div.style.right = places[randPlace];
    div.moveInterval = setInterval(function () {
        //שולח לפונקציה שהיא בודקת האם יש מקום, אם כן מורידה עוד למטה
        if (moveFruit(div) == false && div.style.display != "none") {
            div.style.display = "none";
            return;
        }//כאשר מחזירה פאלס סימן שהגיעה לתחתית המסך 
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
function Check(div, type, isPresent) {
    if (isPresent == "yes") {
        document.getElementById("vv").play();
        nikud += 20;
        var t = document.createElement("img");
        t.classList.add("after_cut");
        t.src = "../IMG/סימנים/פלוס עשרים.gif";
        t.style.top = (event.pageY) + "px";
        t.style.right = (window.screen.width - event.pageX) + "px";
        setTimeout(() => noneT(t), 1200);
        document.body.appendChild(t);
    }
    else {
        if (type == "no") {
            document.getElementById("v").play();
            nikud += 5;
            var t = document.createElement("img");
            t.classList.add("after_cut");
            t.src = "../IMG/סימנים/פלוס חמש.gif";
            t.style.top = (event.pageY) + "px";
            t.style.right = (window.screen.width - event.pageX) + "px";
            setTimeout(() => noneT(t), 1200);
            document.body.appendChild(t);

        }
        else {
            var t = document.createElement("img");
            t.classList.add("after_cut");
            t.src = "../IMG/סימנים/מינוס עשר.gif";
            t.style.top = (event.pageY) + "px";
            t.style.right = (window.screen.width - event.pageX) + "px";
            setTimeout(() => noneT(t), 1200);
            document.body.appendChild(t);
            cntBomb++;
            document.getElementById("x").play();
            nikud -= 10;
            if (cntBomb == 3)
                Finish();
        }
    }
    document.getElementById("myMark").innerHTML = "";
    document.getElementById("myMark").innerHTML = nikud
    div.style.display = "none";
}
function Finish() {
    localStorage.setItem("mark", nikud);
    if (nikud < 100 || cntBomb >= 3)
        window.location = "LossFruits.html";
    else window.location = "WinFruits.html";
}
function to_sakinim() {
    window.location = "Knifes.html";
}
function noneT(t) {
    t.style.display = "none";
}
function clock() {
    if (time >= 0) {
        document.getElementById("myClock").innerHTML = "";
        if (time < 10)
            document.getElementById("myClock").innerHTML = "00:0" + time;
        else document.getElementById("myClock").innerHTML = "00:" + time;
        time--;
    }
}