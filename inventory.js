const inventory = {
    "AC.1.12": { type: "Animal Costume", color: "Red", item: 12, status: "In Inventory", damaged: false, damageDescription: "" },
    // Add more inventory items here
};
// Initial inventory update
updateInventory();

function processAction() {
    const tag = document.getElementById('tag').value.toUpperCase();
    const action = document.getElementById('action').value;
    const damageDescription = document.getElementById('damageDescription').value;

    if (inventory[tag]) {
        // Displays to user the result of their action
        if (action === "checkout" && inventory[tag].status === "In Inventory") {
            inventory[tag].status = "Checked Out";
            alert(`Costume ${tag} has been Checked Out.`);
        } else if (action === "return" && inventory[tag].status === "Checked Out") {
            inventory[tag].status = "In Inventory";
            alert(`Costume ${tag} has been returned.`);

            // Update damage status and description, if applicable
            inventory[tag].damaged = damageDescription.trim() !== "" || inventory[tag].damaged;
            if (damageDescription.trim() !== '' || !inventory[tag].damaged) {
                inventory[tag].damageDescription = damageDescription.trim();
            }
        } else if (action == "checkout" && inventory[tag].status === "Checked Out") {
            alert(`Costume ${tag} has already been Checked Out.`);
        } else if (action == "return" && inventory[tag].status === "In Inventory") {
            alert(`Costume ${tag} is already in the inventory.`);
        } else {
            alert(`An unforeseen error has occurred, please try again. (This shouldn't be possible) ${inventory[tag].status}`);
        }
    } else {
        alert(`Costume ${tag} does not exist.`);
    }

    updateInventory();
}

function updateInventory() {
    const inventoryList = document.getElementById('inventory-list');
    inventoryList.innerHTML = '';

    for (const tag in inventory) {
        const item = inventory[tag];
        const listItem = document.createElement('li');
        listItem.textContent = `${tag}: ${item.type}, ${item.color}, Item ${item.item} - ${item.status}${item.damaged ? ', Damaged: ' + item.damageDescription : ''}`;
        inventoryList.appendChild(listItem);
    }
}

function onScanSuccess(decodedText, decodedResult) {
    document.getElementById('tag').value = decodedText;
}

let qrboxFunction = function(viewfinderWidth, viewfinderHeight) {
    let minEdgePercentage = 0.7; // 70%
    let minEdgeSize = Math.min(viewfinderWidth, viewfinderHeight);
    let qrboxSize = Math.floor(minEdgeSize * minEdgePercentage);
    return {
        width: qrboxSize,
        height: qrboxSize
    };
}

let html5QrcodeScanner = new Html5QrcodeScanner(
    "reader",
    { fps: 10, qrbox: qrboxFunction },
    /* verbose= */ false);
html5QrcodeScanner.render(onScanSuccess);