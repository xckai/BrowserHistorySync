function onSave() {
    let inputElement = <HTMLInputElement>document.getElementById("url_input");
    browser.storage.sync.set({
        syncManagerServerUrl: inputElement.value
    }).then(() => {
        window.close();
    })

}
browser.storage.sync.get(["syncManagerServerUrl"]).then(res => {
    let inputElement = <HTMLInputElement>document.getElementById("url_input");
    inputElement.value = res["syncManagerServerUrl"];
})
document.getElementById("save_button").addEventListener("click", onSave);