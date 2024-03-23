let tg = window.Telegram.WebApp;
tg.expand();

let back_btn_show_orders = tg.BackButton;
back_btn_show_orders.show();

let url_addresses = {
    user_url: "https://api.npoint.io/df9386412941a86767d4"
};

async function get_data_from_server(url) {
    const response = await fetch(url);
    return await response.json();
}


let items_element = document.querySelector(".orders");
console.log(items_element);

get_data_from_server(url_addresses.user_url).then((data_from_server) => {
    let orders_length = data_from_server["orders"].length;
    let res_str = ""
    for (let i = 0; i < orders_length; ++i) {
        res_str += "---------- " + data_from_server["orders"][i]["orderId"] + " ----------\n";
        for (let item of data_from_server["orders"][i]["items"]) {
            res_str += item["item"]["itemName"] + ", " + "\n";
        }
    }
    let test_label = document.querySelector(".test_label");
    test_label.textContent = res_str;
});