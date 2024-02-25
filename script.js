body {
    margin: 0;
    padding: 0;
    background-color: white;
    user-select: none;
}

.container {
    width: 390px;
}

.items {
    display: grid;
    grid-template-columns: 1fr 1fr;
}

.item {
    text-align: center;
    margin-left: auto;
    margin-right: auto;
    height: 190px;
}

.img {
    width: 90px;
}

.add_remove_figure {
    border-radius: 20px;
    width: 90px;
    height: 35px;
    display: flex;
    align-items: center;
    background-color: #ffdaae;
    margin-top: 8px;
}

.btn_add {
    display: inline-block;
    background-color: gray;
    padding: 8px 8px 8px 8px;
    border: none;
    border-radius: 20px;
    width: 90px;
    height: 35px;
    color: #2d2d2d;
    background-color: #ffdaae;
    transition: background-color 0.1s linear;
    font-size: 13px;
}

.btn_add:hover, .btn_plus:hover, .btn_minus:hover {
    background: #ffe4c4;
}

.btn_plus {
    border: none;
    margin-left: 7px;
    border-radius: 3px 20px 20px 3px;
    width: 35px;
    height: 35px;
    color: #2d2d2d;
    background-color: #ffdaae;
    transition: background-color 0.1s linear;
    font-size: 15px;
}

.btn_minus {
    border: none;
    margin-right: 7px;
    border-radius: 20px 3px 3px 20px;
    width: 35px;
    height: 35px;
    color: #2d2d2d;
    background-color: #ffdaae;
    transition: background-color 0.1s linear;
    font-size: 15px;
}


.item_name {
    font-family: 'Open Sans', sans-serif;
    font-size: 15px;
    padding-top: 1px;
}

.item_cost {
    font-family: 'Open Sans', sans-serif;
    font-size: 13px;
    padding-top: 10px;
    color: #505050;
}

.order_item_label {
    width: 24px;
    font-size: 14px;
    font-family: 'Open Sans', sans-serif;
}

.choose_time_btn {
    width: 120px;
    height: 40px;
    position: fixed;
    margin-left: 135px;
    margin-right: auto;
    margin-bottom: auto;
    bottom: 0px;

    border: none;
    border-radius: 20px 20px 20px 20px;
    color: #2d2d2d;
    background-color: #ffbf74;
    transition: background-color 0.1s linear;
    font-size: 13px;
}


.choose_time_btn:hover {
    background: #ffd099;
}
