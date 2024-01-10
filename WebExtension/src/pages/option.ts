let dataServerUrlInputElement = <HTMLInputElement>(
  document.getElementById("data_server_url_input")
);
let equipmentNameInputElement = <HTMLInputElement>(
  document.getElementById("equipment_name")
);
let delayUploadTimeInputElement = <HTMLInputElement>(
  document.getElementById("delay_upload_time")
);
let repalceNewTabInputElement = <HTMLInputElement>(
  document.getElementById("replace_new_opened_tab")
);
repalceNewTabInputElement.onchange = function () {
  browser.storage.local
    .set({
      replaceNewTab: repalceNewTabInputElement.checked,
    })
    .catch((e) => console.error(e));
};
let password = <HTMLInputElement>document.getElementById("password");
function onSave(e: Event) {
  e.stopImmediatePropagation();
  e.preventDefault();
  if (!dataServerUrlInputElement.value) {
    alert("Please input server url");
    return;
  }
  if (!equipmentNameInputElement.value) {
    alert("Please input equipment name");
  }
  let dataServerUrl = dataServerUrlInputElement.value.endsWith("/")
    ? dataServerUrlInputElement.value.substring(
        0,
        dataServerUrlInputElement.value.length - 1
      )
    : dataServerUrlInputElement.value;
  browser.storage.local
    .set({
      dataServerUrl: dataServerUrl,
      fontendServerUrl: dataServerUrl,
      equipmentName: equipmentNameInputElement.value,
      delayUploadTime: delayUploadTimeInputElement.value,
    })
    .then(() => {
      fetch(dataServerUrl + "/api/Auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `secret=${password.value}`,
      })
        .then((resp) => {
          if (!resp.ok) {
            resp
              .text()
              .then((str) =>
                str ? alert(str) : alert("Response status code: " + resp.status)
              )
              .catch((err) => alert("Response status code: " + resp.status));
          } else {
            browser.runtime.sendMessage({ type: "normal", action: "setIcon" });
            setTimeout(window.close, 500);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((e) => {
      console.error(e);
      alert("Save to storage error!");
    });
}

window.onload = function () {
  browser.storage.local
    .get([
      "dataServerUrl",
      "equipmentName",
      "fontendServerUrl",
      "delayUploadTime",
      "replaceNewTab",
    ])
    .then((res) => {
      if (res["equipmentName"]) {
        equipmentNameInputElement.value = res["equipmentName"];
      } else {
        let equipmentName = "New_" + Math.round(Math.random() * 10000);
        equipmentNameInputElement.value = equipmentName;
        browser.storage.local
          .set({
            equipmentName: equipmentName,
          })
          .catch((e) => console.error(e));
      }
      if (res["delayUploadTime"]) {
        delayUploadTimeInputElement.value = res["delayUploadTime"];
      }
      if (res["dataServerUrl"]) {
        dataServerUrlInputElement.value = res["dataServerUrl"];
      } else {
        dataServerUrlInputElement.value = "https://";
      }
      repalceNewTabInputElement.checked = res["replaceNewTab"] ?? false;
    });
};
document.getElementById("save_button").addEventListener("click", onSave);
