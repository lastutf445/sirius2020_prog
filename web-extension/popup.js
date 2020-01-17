"use strict"

var rrr = new Map();
 
window.onload = function () {
        function updateLabel() {
                const enabled = chrome.extension.getBackgroundPage().enabled;
                // FIXME! Toggle the button label: Disabled <-> Enabled
                document.getElementById('toggle_button').value = (enabled ? "Disable" : "Enable");
        }
        document.getElementById('toggle_button').onclick = function () {
                let background = chrome.extension.getBackgroundPage();
                background.enabled = !background.enabled;
                updateLabel();
        };
        updateLabel();
        
        let d = document.getElementById('oaoao');
        
        while (d.childElementCount) {
            d.removeChild(d.lastElementChild);
        }
        
        for (let p of rrr) {
            let q = document.createElement("p");
            q.innerText = p[1] + " " + p[0];
            d.append(q);
        }
}
