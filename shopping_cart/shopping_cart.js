import {
    create_element,
    create_input,
    create_image,
    seconds_to_time,
    hide_element_with_animation, push_plus_minus_button_animation
} from "../tools/graphical_tools.js";
import {get_data_from_server} from "../tools/networking_tools.js";
import {free_order_time_url} from "../URL_storage.js";
import {Catalog, Order} from "../main_classs.js";
import {animated_page_scroll} from "../tools/animated_page_scroll_tools.js";
import {show_error} from "../errors_handler/errors_handler.js";

animated_page_scroll(0, ".header_label_wrapper");

let back_btn = document.querySelector(".back_btn");
let checkout_btn = document.querySelector(".checkout_btn");
let order_comment = document.querySelector(".order_comment");

checkout_btn.textContent = "Выберите время";
checkout_btn.setAttribute('disabled', '');

let tg = window.Telegram.WebApp;
tg.expand();

function decrease_item_counter(i, object_to_delete, textField) {
    let new_number = order.user_order.get(i);
    if (new_number >= 2) {
        new_number--;
        order.user_order.set(i, new_number);
        textField.textContent = new_number;
    } else {
        order.user_order.delete(i);
        object_to_delete.style.animationDelay = "0s";
        hide_element_with_animation(object_to_delete, "show_order_items_appearance_animation_selector", "hide_order_item_animation_selector");

        object_to_delete.addEventListener('animationend', function () {
            object_to_delete.remove();
        });
    }
    order.order_cost -= +catalog.Items.get(i).item_cost;
}

function increase_item_counter(i, textField) {
    let new_number = order.user_order.get(i) + 1;
    order.user_order.set(i, new_number);
    order.order_cost += +catalog.Items.get(i).item_cost;
    textField.textContent = new_number;
}


function generate_data_for_send() {
    let data_for_send = {
        items: [], orderCost: 0, time: ""
    };

    let item_for_send = {
        itemName: "", itemId: "", itemCost: "", itemNumber: "", comment: ""
    };

    for (let key of order.user_order.keys()) {
        item_for_send = {
            itemName: "", itemId: "", itemCost: "", itemNumber: ""
        };

        item_for_send.itemName = catalog.Items.get(key).item_name;
        item_for_send.itemId = catalog.Items.get(key).item_id;
        item_for_send.itemCost = catalog.Items.get(key).item_cost;
        item_for_send.itemNumber = order.user_order.get(key);
        data_for_send.items.push(item_for_send);
    }

    data_for_send.orderCost = order.order_cost;
    data_for_send.time = order.order_time;
    data_for_send.comment = order.order_comment;

    data_for_send = JSON.stringify(data_for_send);

    return data_for_send;
}

let order = new Order();
let catalog = new Catalog();

catalog.get_data_from_cash();
order.get_data_from_cash();

if (order.order_comment !== "") {
    order_comment.value = order.order_comment;
}


function draw_free_time_in_shopping_cart(free_time_array) {
    let time_area = document.querySelector(".time_slider_area");
    for (let wrapper of time_area.children) {
        wrapper.remove();
    }

    let time_slider_area = document.querySelector(".time_slider_area");

    let buttons_wrapper = create_element("div", "buttons_wrapper");
    time_slider_area.appendChild(buttons_wrapper);

    let gap_for_animation = 0;

    for (let free_time of free_time_array) {
        let free_time_button = create_input("free_time_button", "free_time", "radio", free_time, free_time);
        let free_time_label = create_element("label", "free_time_label", seconds_to_time(free_time));
        free_time_label.htmlFor = free_time;
        free_time_label.classList.add("show_order_items_appearance_animation_selector");

        buttons_wrapper.appendChild(free_time_button);
        buttons_wrapper.appendChild(free_time_label);

        gap_for_animation += 0.03;
        free_time_label.style.animationDelay = `${gap_for_animation}s`;

        free_time_button.addEventListener("click", () => {
            checkout_btn.removeAttribute("disabled");
            checkout_btn.textContent = `Заказать к ${free_time_label.textContent} • ${order.order_cost} ₽`;
            order.order_time = +free_time_button.value;

            let time_buttons = buttons_wrapper.children;
            for (let time_button of time_buttons) {
                if (time_button.className.includes("free_time_label")) {
                    time_button.style.animationDelay = "0s";
                    time_button.classList.remove("show_free_time_label_animation_selector");
                    time_button.classList.add("hide_free_time_label_animation_selector");
                }
            }
            free_time_label.style.animationDelay = "0s";
            free_time_label.classList.add("show_free_time_label_animation_selector");
            free_time_label.classList.remove("hide_free_time_label_animation_selector");
        });
    }
}

checkout_btn.setAttribute('disabled', '');
checkout_btn.textContent = "Загрузка времени...";

get_data_from_server(free_order_time_url).then((data_from_server) => {
    let response_status = data_from_server[0];
    data_from_server = data_from_server[1];

    document.querySelector(".loading_image_wrapper").classList.add("hidden");
    if (response_status === 200) {
        checkout_btn.textContent = "Выберите время";

        let free_time_array = [];
        for (let free_time of data_from_server["times"]) {
            free_time_array.push(free_time);
        }

        draw_free_time_in_shopping_cart(free_time_array);
    } else {
        checkout_btn.textContent = "Не удалось загрузить";
        show_error(response_status);
    }
});

let shopping_cart_items = document.querySelector(".shopping_cart_items");
let gap_for_animation = 0.1;
for (let key of order.user_order.keys()) {
    let shopping_item = create_element("div", "shopping_item");
    gap_for_animation += 0.05;
    shopping_item.style.animationDelay = `${gap_for_animation}s`;
    shopping_item.classList.add("show_order_items_appearance_animation_selector");
    shopping_cart_items.appendChild(shopping_item);

    let shopping_cart_item_img = create_image("shopping_item_img", catalog.Items.get(key).item_img, "");
    let shopping_cart_item_name = create_element("div", "shopping_cart_item_name", catalog.Items.get(key).item_name);
    shopping_cart_item_name.classList.add("ellipsis_3_lines");
    let shopping_cart_item_cost = create_element("div", "shopping_cart_item_cost", catalog.Items.get(key).item_cost + " ₽/шт.");
    let shopping_cart_add_remove_figure = create_element("div", "shopping_cart_add_remove_figure");
    let buttons_and_cost_wrapper = create_element("div", "buttons_and_cost_wrapper");
    let shopping_cart_minus_btn = create_element("button", "shopping_cart_minus_btn", "-");
    let shopping_cart_item_label = create_element("label", "shopping_cart_item_label", order.user_order.get(key));
    let shopping_cart_plus_btn = create_element("button", "shopping_cart_plus_btn", "+");

    shopping_cart_add_remove_figure.appendChild(shopping_cart_minus_btn);
    shopping_cart_add_remove_figure.appendChild(shopping_cart_item_label);
    shopping_cart_add_remove_figure.appendChild(shopping_cart_plus_btn);

    shopping_item.appendChild(shopping_cart_item_img);
    shopping_item.appendChild(shopping_cart_item_name);
    buttons_and_cost_wrapper.appendChild(shopping_cart_add_remove_figure);
    buttons_and_cost_wrapper.appendChild(shopping_cart_item_cost);
    shopping_item.appendChild(buttons_and_cost_wrapper);

    if (order.user_order.size === 1) {
        document.querySelector(".shopping_item").classList.add("shopping_item_only_one");
    }

    shopping_cart_minus_btn.addEventListener("click", () => {
        push_plus_minus_button_animation(shopping_cart_minus_btn, "plus_minus_buttons_animation_selector");
        decrease_item_counter(key, shopping_item, shopping_cart_item_label);
        if (order.user_order.size === 0) {
            document.querySelector(".time_selection_and_checkout").classList.add("hidden");
            document.querySelector(".checkout_btn").classList.add("hidden");
            shopping_cart_items.classList.add("hidden");
            document.querySelector(".empty_shopping_cart_label").classList.remove("hidden");
            document.getElementById("back_btn_to_menu_svg_in_shopping_cart").classList.add("back_btn_to_menu_svg_appearance_animation_selector");
        } else if (order.user_order.size === 1) {
            for (let item of document.querySelector(".shopping_cart_items").querySelectorAll(".shopping_item")) {
                item.classList.add("shopping_item_only_one");
            }
        }
        if (checkout_btn.textContent !== "Выберите время" &&
            checkout_btn.textContent !== "Загрузка времени..." &&
            checkout_btn.textContent !== "Не удалось загрузить") {
            checkout_btn.textContent = `Заказать к ${seconds_to_time(order.order_time)} • ${order.order_cost} ₽`;
        }
        order.push_data_to_cash();
    });

    shopping_cart_plus_btn.addEventListener("click", () => {
        push_plus_minus_button_animation(shopping_cart_plus_btn, "plus_minus_buttons_animation_selector");
        increase_item_counter(key, shopping_cart_item_label);
        if (checkout_btn.textContent !== "Выберите время" &&
            checkout_btn.textContent !== "Загрузка времени..." &&
            checkout_btn.textContent !== "Не удалось загрузить") {
            checkout_btn.textContent = `Заказать к ${seconds_to_time(order.order_time)} • ${order.order_cost} ₽`;
        }
        order.push_data_to_cash();
    });
}

checkout_btn.addEventListener("click", () => {
    let order_comment = document.querySelector(".order_comment");
    order.order_comment = order_comment.value;
    localStorage.clear();
    tg.sendData(generate_data_for_send());
});

back_btn.addEventListener("click", () => {
    let order_comment = document.querySelector(".order_comment");
    order.order_comment = order_comment.value;
    order.push_data_to_cash();
});

let now_page_position_y = window.scrollY;

document.querySelector('.shopping_cart').addEventListener('touchstart', (event) => {
    if (!event.target.closest('.order_comment')) {
        now_page_position_y = window.scrollY;
        document.querySelector(".order_comment").tabIndex = -1;
        document.querySelector(".shopping_cart").tabIndex = 1;
        document.querySelector(".shopping_cart").focus();
        window.scrollTo(0, now_page_position_y);
    }
});
