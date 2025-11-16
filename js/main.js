const API_URL = "https://9o3f790vnk.execute-api.us-east-2.amazonaws.com/items";

window.onload = loaded;

function loaded() {
    console.log("Page loaded");
    getItems();
}

async function getItems() {
    const res = await fetch(API_URL);
    const data = await res.json();
    console.log("Items:", data);
}

async function putItem(id, name, price) {
    const res = await fetch(API_URL, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, name, price })
    });

    console.log(await res.json());
}

async function deleteItem(id) {
    const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    console.log(await res.json());
}
