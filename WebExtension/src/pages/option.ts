function onSave() {
    let dataServerUrlInputElement = <HTMLInputElement>document.getElementById("data_server_url_input");
    let fontendServerUrlInputElement = <HTMLInputElement>document.getElementById("fontend_server_url_input");
    let equipmentNameInputElement = <HTMLInputElement>document.getElementById("equipment_name");
    browser.storage.local.set({
        dataServerUrl: dataServerUrlInputElement.value,
        fontendServerUrl: fontendServerUrlInputElement.value,
        equipmentName: equipmentNameInputElement.value
    }).then(() => {
        window.close();
    }).catch(e => console.error(e))

}
browser.storage.local.get(["dataServerUrl", "equipmentName", "fontendServerUrl"]).then(res => {
    let dataServerUrlInputElement = <HTMLInputElement>document.getElementById("data_server_url_input");
    dataServerUrlInputElement.value = res["dataServerUrl"] ?? "https://";
    let fontendServerUrlInputElement = <HTMLInputElement>document.getElementById("fontend_server_url_input");
    fontendServerUrlInputElement.value = res["fontendServerUrl"] ?? "https://";
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