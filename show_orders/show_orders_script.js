let url_addresses = {
    catalog_url: "https://api.npoint.io/e8788c3df8ed585a512f",
    free_order_time_url: "https://api.npoint.io/bb051384b63b14a8cdd8"
};

async function get_data_from_server(url) {
    const response = await fetch(url);
    return await response.json();
}


let items_element = document.querySelector(".orders");
console.log(items_element);

get_data_from_server(url_addresses.catalog_url).then((data_from_server) => {
    console.log(data_from_server);
});