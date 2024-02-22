let tg = window.Telegram.WebApp;

// Расширяем на весь экран
tg.expand();

tg.MainButton.textColor = "#2d2d2d";
tg.MainButton.color = "#ffbf72";

let item_id = "";

let btn_add_1 = document.querySelector("#btn_add_1");
btn_add_1.addEventListener("click", () => {
    console.log("Btn 1 clicked");
    if (tg.MainButton.isVisible) {
        tg.MainButton.hide();
    } else {
        tg.MainButton("Выбрано блюдо 1");
        tg.MainButton.show();
        item_id = "1";
    }
})

let btn_add_2 = document.querySelector("#btn_add_2");
btn_add_2.addEventListener("click", () => {
    console.log("Btn 2 clicked");
    if (tg.MainButton.isVisible) {
        tg.MainButton.hide();
    } else {
        tg.MainButton("Выбрано блюдо 2");
        tg.MainButton.show();
        item_id = "2";
    }
})

let btn_add_3 = document.querySelector("#btn_add_3");
btn_add_3.addEventListener("click", () => {
    console.log("Btn 3 clicked");
    if (tg.MainButton.isVisible) {
        tg.MainButton.hide();
    } else {
        tg.MainButton("Выбрано блюдо 3");
        tg.MainButton.show();
        item_id = "3";
    }
})

let btn_add_4 = document.querySelector("#btn_add_4");
btn_add_4.addEventListener("click", () => {
    console.log("Btn 4 clicked");
    if (tg.MainButton.isVisible) {
        tg.MainButton.hide();
    } else {
        tg.MainButton("Выбрано блюдо 4");
        tg.MainButton.show();
        item_id = "4";
    }
})

let btn_add_5 = document.querySelector("#btn_add_5");
btn_add_5.addEventListener("click", () => {
    console.log("Btn 5 clicked");
    if (tg.MainButton.isVisible) {
        tg.MainButton.hide();
    } else {
        tg.MainButton("Выбрано блюдо 5");
        tg.MainButton.show();
        item_id = "5";
    }
})

let btn_add_6 = document.querySelector("#btn_add_6");
btn_add_6.addEventListener("click", () => {
    console.log("Btn 6 clicked");
    if (tg.MainButton.isVisible) {
        tg.MainButton.hide();
    } else {
        tg.MainButton("Выбрано блюдо 6");
        tg.MainButton.show();
        item_id = "6";
    }
})

Telegram.WebApp.onEvent("mainButtonClicked", () => {
    tg.sendData(item_id);
})
