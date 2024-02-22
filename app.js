let tg = window.Telegram.WebApp;

tg.expand();

tg.MainButton.textColor = '#FFFFFF';
tg.MainButton.color = '#2cab37';

let item = "";

let btn1 = document.getElementById("btn_add_1");
let btn2 = document.getElementById("btn_add_2");
let btn3 = document.getElementById("btn_add_3");
let btn4 = document.getElementById("btn_add_4");
let btn5 = document.getElementById("btn_add_5");
let btn6 = document.getElementById("btn_add_6");

tg.MainButton.show();
tg.MainButton.setText("Вы выбрали товар 1!");
item = "1";
tg.MainButton.show();

Telegram.WebApp.onEvent("mainButtonClicked", function(){
	tg.sendData(item);
});


let usercard = document.getElementById("usercard");

let p = document.createElement("p");

p.innerText = `${tg.initDataUnsafe.user.first_name}
${tg.initDataUnsafe.user.last_name}`;

usercard.appendChild(p);








