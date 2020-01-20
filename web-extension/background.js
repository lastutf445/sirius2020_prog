"use strict"
 
var enabled = true;
 
// Check on sochisirius.ru and ngs.ru
const badDomains = [
        "doubleclick.com",
        "mc.yandex.ru",
        "google-analytics.com",
        "googletagmanager.com",
        "an.yandex.ru",
        "reklama.ngs.ru",
        "ads.adfox.ru",
        "www.tns-counter.com",
];

var rrr = new Map([]);
var total = 0

let handler = function(request, sender) {
        if (!request.msgid) return;
                                     
        if (request.msgid == 'adblocker1337_popupRequest') {
            chrome.runtime.sendMessage({
                msgid: "adblocker1337_popupResponse",
                total: total
            })
        }
        
        if (request.msgid == 'adblocker1337_popupStatReset') {
            total = 0;
            handler({msgid: "adblocker1337_popupRequest"}, '')
        }
        
        //console.log(request, sender);
}

let leetRequestFilter = function(details) {
        if (!enabled) return {};
        
        let block = false;
        let parsedUrl = new URL(details.url);
        
        const isBadDomain = -1 != badDomains.findIndex(host => {
            return (parsedUrl.host.endsWith(host));
        })
        
        block = isBadDomain;
        
        if (block) {
            console.log('ad-blocked', parsedUrl.host)
            rrr[parsedUrl.host] = (parsedUrl.host in rrr ? rrr[parsedUrl.host] + 1 : 1);
            total += 1;
            
            handler({msgid: "adblocker1337_popupRequest"}, '')
        }
        
        const response = {cancel: block};
        return response;
}
 
chrome.webRequest.onBeforeRequest.addListener(
        leetRequestFilter,
        {urls: ["http://*/*", "https://*/*"]},
        ["blocking"]  // Nothing continues until we decide to proceed.
);

chrome.runtime.onMessage.addListener(handler);
