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

function create_element(element_type, class_name = "", text_content = "", is_hidden = false) {
    let element_variable = document.createElement(element_type);
    if (class_name !== "") {
        element_variable.className = class_name;
    }
    if (text_content !== "") {
        element_variable.textContent = text_content;
    }
    if (is_hidden) {
        element_variable.classList.add("hidden");
    }
    return element_variable;
}


let items_element = document.querySelector(".orders");
console.log(items_element);

get_data_from_server(url_addresses.user_url).then((data_from_server) => {
    let orders_length = data_from_server["orders"].length;
    for (let i = 0; i < orders_length; ++i) {
        // res_str += "---------- " + data_from_server["orders"][i]["orderId"] + " ----------\n";
        // for (let item of data_from_server["orders"][i]["items"]) {
        //     res_str += item["item"]["itemName"] + ", " + "\n";
        // }
        let order_wrapper = create_element("div", "order_wrapper");
        for (let item of data_from_server["orders"][i]["items"]) {
            let order_item = create_element("div", "order_item");
            order_wrapper.appendChild(order_item);
        }
        items_element.appendChild(order_wrapper);

    }
    let test_label = document.querySelector(".test_label");
});