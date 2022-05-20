
function onSave() {
    let dataServerUrlInputElement = <HTMLInputElement>document.getElementById("data_server_url_input");
    let equipmentNameInputElement = <HTMLInputElement>document.getElementById("equipment_name");
    let password = <HTMLInputElement>document.getElementById("password");
    if (!dataServerUrlInputElement.value) {
        alert("Please input server url");
        return;
    }
    if (!equipmentNameInputElement.value) {
        alert("Please input equipment name");
    }
    let dataServerUrl = dataServerUrlInputElement.value.endsWith("/") ? dataServerUrlInputElement.value.substring(0, dataServerUrlInputElement.value.length - 1) : dataServerUrlInputElement.value
    browser.storage.local.set({
        dataServerUrl: dataServerUrl,
        fontendServerUrl: dataServerUrl,
        equipmentName: equipmentNameInputElement.value
    }).then(() => {
        fetch(dataServerUrl + "/api/Auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `secret=${password.value}`
        }).then(resp => {
            console.log(resp)
            if (!resp.ok) {
                console.log(resp)
                resp.text().then(str => alert(str)).catch(err => alert(resp.statusText))
            } else {
                window.close();
            }
        }).catch(err => { console.log(err); alert("Network error!") })
    }).catch(e => { console.error(e); alert("Save to storage error!"); })


}
browser.storage.local.get(["dataServerUrl", "equipmentName", "fontendServerUrl"]).then(res => {
    let dataServerUrlInputElement = <HTMLInputElement>document.getElementById("data_server_url_input");
    dataServerUrlInputElement.value = res["dataServerUrl"] ?? "https://";
    let equipmentNameInputElement = <HTMLInputElement>document.getElementById("equipment_name");
    if (res["equipmentName"]) {
        equipmentNameInputElement.value = res["equipmentName"]
    } else {
        let equipmentName = "New_" + Math.round(Math.random() * 10000);
        equipmentNameInputElement.value = equipmentName;
        browser.storage.local.set({
            equipmentName: equipmentName
        }).catch(e => console.error(e))
    }
})

document.getElementById("save_button").addEventListener("click", onSave);