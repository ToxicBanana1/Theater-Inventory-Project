const inventory = {
    "AC.1.12": { type: "Animal Costume", color: "Red", item: 12, status: "In Inventory"},
    // Add more inventory items here
};

updateInventory();

function processAction() {
    const tag = document.getElementById('tag').value.toUpperCase();
    const action = document.getElementById('action').value;

    if (!inventory[tag]) {
        return alert(`Costume ${tag} does not exist.`);
    }

    const item = inventory[tag];
    if (action === "checkout") {
        if (item.status === "In Inventory") {
            item.status = "Checked Out";
            alert(`Costume ${tag} has been Checked Out.`);
        } else {
            alert(`Costume ${tag} has already been Checked Out.`);
        }
    } else if (action === "return") {
        if (item.status === "Checked Out") {
            item.status = "In Inventory";
            alert(`Costume ${tag} has been returned.`);
        } else {
            alert(`Costume ${tag} is already in the inventory.`);
        }
    } else {
        alert(`An unforeseen error has occurred, please try again. (This shouldn't be possible) ${item.status}`);
    }

    updateInventory();
}

function updateInventory() {
    const spreadsheetId = '1ftHSFYK92nU51GhdS1t0xtxXcfh-MKld9bIliPbRAHk';
    const yourAPIKey = 'AIzaSyBu7PLnTjSsyXvMS64mkVGaA8Px8uTBuqU';
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/?key=${yourAPIKey}&includeGridData=true`;
    axios.get(url)
    .then(function (response) {
        let values = [];
        let totalRows = response['data']['sheets'][0]['data'][0]['rowData'].length;
        for (let row = 0; row < totalRows; row++) {
            const rowData = response['data']['sheets'][0]['data'][0]['rowData'][row];
            values.push(rowData['values']);
        }

        let columns = [];
        for (let i = 0; i < values[0].length; i++) {
            columns.push(values.map(row => row[i] ? row[i].formattedValue : ''));
        }
        
        console.log(columns);
    })
    .catch(function (error) {
        console.log(error);                                                                                                                                                       
    }); 
}

function onScanSuccess(decodedText) {
    document.getElementById('tag').value = decodedText;
}

const qrboxFunction = (viewfinderWidth, viewfinderHeight) => {
    const minEdgeSize = Math.min(viewfinderWidth, viewfinderHeight);
    const qrboxSize = Math.floor(minEdgeSize * 0.7);
    return { width: qrboxSize, height: qrboxSize };
};

const html5QrcodeScanner = new Html5QrcodeScanner("qr-reader", { fps: 10, qrbox: qrboxFunction });
html5QrcodeScanner.render(onScanSuccess);
