
var nikud, mone;



var r = parseInt(localStorage.getItem("level"));
var vecInput = [r]; // החלונות שהמשתמש בחר vecInput[i]="num"+i
var vec = [r]; //החלונות שהמחשב בחר vec[i]=מספר מוגרל
// id="num"+i
// number="num"+i

function CreateWindows() {
    for (var i = 0; i < (r * r); i++) {
        if (i % r == 0 && i > 0) {
            var br = document.createElement("br");
            binyan.appendChild(br);
        }
        var div = document.createElement("div");
        div.classList.add("w");
        div.id = "num" + i;
        div.setAttribute("number", ("num" + i));
        document.getElementById("binyan").appendChild(div);
    }
    setTimeout(Finish, 101000);
    nikud = 0;
    StartGame();
}
function StartGame() {
    vx.backgroundImage = "";
    vx.style.visibility = "hidden";
    var num;
    for (var i = 0; i < r; i++) {
        do { num = Math.round(Math.random() * 100 % (r * r - 1)); }
        while (vec.indexOf(num) != -1);
        document.getElementById("num" + num).style.backgroundColor = "yellow";
        vec[i] = num;
    }
    setTimeout(Func1, (r * 360));
    function Func1() {
        for (var i = 0; i < r; i++) {// החזרת המסומנים לקדמותם
            document.getElementById("num" + vec[i]).style.backgroundColor = "";
        }
        for (var i = 0; i < (r * r); i++) {
            document.getElementById("num" + i).onclick = WindowClick;
            document.getElementById("num" + i).style.cursor = "pointer";
        }
    }
    mone = 0;
    // רק מעכשיו: בעת לחיצה על חלון, תופל הפונקציה קליקווינדואו
    // כדי שלא ילחצו על החלונות לפני הזמן

}
function WindowClick() {
    event.target.style.backgroundColor = "#f4f473";
    vecInput[mone++] = event.target.getAttribute("number");
    if (mone == r) {
        mone = 0;
        // מעכשיו לא יעזור שילחצו על חלון
        // הפונקציה לא מקושרת לחלונות
        for (var i = 0; i < (r * r); i++) {
            document.getElementById("num" + i).onclick = "";
            document.getElementById("num" + i).style.cursor = "unset";
        }
        Check();
    }
}
function Check() {
    var flag = 0;
    for (var i = 0; i < vecInput.length; i++) { // להחזיר את המסומנים כבחירה לקדמותם
        document.getElementById(vecInput[i]).style.backgroundColor = "";
    }
    for (var i = 0; i < vec.length; i++) {// בדיקה ועדכון ציון
        if (vecInput.indexOf("num" + vec[i]) == -1) {
            flag = 1;
        }
        else nikud += r;
    }
    if (flag == 0) {
        vx.style.backgroundImage = "   url('../IMG/סימנים/וי.gif')";
        vx.style.visibility = "visible";
    }
    else {
        vx.style.backgroundImage = "url('../IMG/סימנים/איקס.gif')";
        vx.style.visibility = "visible";
    }
    myMark.innerHTML = "";
    myMark.innerHTML = nikud;

    setTimeout(StartGame, 1000);
}
function Finish() {
    localStorage.setItem("mark", nikud);
    if (r == 4 && nikud > 250) { window.location = "Win.html"; }
    else if (r == 5 && nikud > 300) { window.location = "Win.html"; }
    else if (r == 6 && nikud > 400) { window.location = "Win.html"; }
    else window.location = "Loss.html";
}

