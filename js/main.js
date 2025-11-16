const API = "https://9o3f790vnk.execute-api.us-east-2.amazonaws.com/items";

window.onload = () => loadItems();

export async function loadItems() {
  const table = document.getElementById("item-table");
  table.innerHTML = "<tr><td colspan='4'>Loading...</td></tr>";

  const res = await fetch(API);
  const data = await res.json();

  if (!data || data.length === 0) {
    table.innerHTML = "<tr><td colspan='4'>No items in database</td></tr>";
    return;
  }

  table.innerHTML = "";

  data.forEach(item => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.id}</td>
      <td>${item.name}</td>
      <td>${item.price}</td>
      <td><button onclick="deleteItem('${item.id}')">Delete</button></td>
    `;
    table.appendChild(row);
  });
}

export async function addItem() {
  const id = document.getElementById("new-id").value;
  const name = document.getElementById("new-name").value;
  const price = document.getElementById("new-price").value;

  if (!id || !name || !price) {
    alert("Fill all fields!");
    return;
  }

  await fetch(API, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, name, price: Number(price) })
  });

  loadItems();
}

export async function deleteItem(id) {
  await fetch(`${API}/${id}`, { method: "DELETE" });
  loadItems();
}


window.loadItems = loadItems;
window.addItem = addItem;
window.deleteItem = deleteItem;
