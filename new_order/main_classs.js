export class ItemFromCatalog {
    constructor(item_id, item_name, item_img, item_cost) {
        this.item_id = item_id;
        this.item_name = item_name;
        this.item_img = item_img;
        this.item_cost = item_cost;
    }
}

export class Catalog {
    Items = new Map();
    size = 0;

    addItem(item_id, item_name, item_img, item_cost) {
        this.Items.set(item_id, new ItemFromCatalog(item_id, item_name, item_img, item_cost))
    }
}

export class Order {
    user_order = new Map();

    order_cost = 0;
    order_time = "";
    order_comment = "";
}
