function onSave() {
    let inputElement = <HTMLInputElement>document.getElementById("url_input");
    let equipmentNameElement = <HTMLInputElement>document.getElementById("equipment_name");
    browser.storage.local.set({
        syncManagerServerUrl: inputElement.value,
        equipmentName: equipmentNameElement.value
    }).then(() => {
        window.close();
    }).catch(e => console.error(e))

}
browser.storage.local.get(["syncManagerServerUrl"]).then(res => {
    let inputElement = <HTMLInputElement>document.getElementById("url_input");
    inputElement.value = res["syncManagerServerUrl"];
})
browser.storage.local.get(["equipmentName"]).then(res => {
    let inputElement = <HTMLInputElement>document.getElementById("equipment_name");
    if (res["equipmentName"]) {
        inputElement.value = res["equipmentName"]
    } else {
        let equipmentName = "New_" + Math.round(Math.random() * 10000);
        inputElement.value = equipmentName;
        browser.storage.local.set({
            equipmentName: equipmentName
        }).catch(e => console.error(e))

    }
})
document.getElementById("save_button").addEventListener("click", onSave);