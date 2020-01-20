"use strict"
 
window.onload = function () {
    chrome.runtime.sendMessage({msgid: "adblocker1337_popupRequest"})

    function updateLabel() {
            const enabled = chrome.extension.getBackgroundPage().enabled;
            document.getElementById('toggle_button').value = (enabled ? "Disable" : "Enable");
            document.getElementById('stat').style.color = (enabled ? '#000' : '#999');
    }
    
    document.getElementById('toggle_button').onclick = function () {
            let background = chrome.extension.getBackgroundPage();
            background.enabled = !background.enabled;
            updateLabel();
    };
    
    document.getElementById('stat_reset').onclick = function () {
        chrome.runtime.sendMessage({msgid: "adblocker1337_popupStatReset"})
    };
    
    updateLabel();
}

chrome.runtime.onMessage.addListener(function(request, sender) {
        if (!request.msgid) return;
                                     
        if (request.msgid == 'adblocker1337_popupResponse') {
            document.getElementById("stat").innerText = request.total;
        }
});
