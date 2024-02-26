let tg = window.Telegram.WebApp;
let buy = document.getElementById("buy");
let order = document.getElementById("order");
tg.expand();

buy.addEventListener("click", () => {
    document.getElementById("main").style.display = "none";
    document.getElementById("form").style.display = "block";
    document.getElementById("user_name").value = tg.initDataUnsafe.user.first_name;
});


let lbl = document.createElement("label");
lbl.className = "lbl";
lbl.textContent = tg.initDataUnsafe.user.first_name;
document.getElementById("main").appendChild(lbl);

order.addEventListener("click", () => {
    let name = document.getElementById("user_name").value;
    console.log(typeof name)
    let email = document.getElementById("user_email").value;
    let phone = document.getElementById("user_phone").value;

    let data = {
        name: name,
        email: email,
        phone: phone,
        test_data: name
    }
    tg.sendData(JSON.stringify(data));

    tg.close();
});
