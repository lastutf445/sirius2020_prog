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

//var rrr = new Map([]);

let leetRequestFilter = function(details) {
        if (!enabled) return {};
 
        //console.log("Trying to load: ", details.url);
 
        let block = false; // TODO: FIXME!
        
        let parsedUrl = new URL(details.url);
        
        //console.log(parsedUrl);
        
        const isBadDomain = -1 != badDomains.findIndex(host => {
            return (parsedUrl.host.endsWith(host));
        })
        
        block = isBadDomain;
        
        if (block) {
            console.log('ad-blocked', parsedUrl.host)
        }
        
        rrr[parsedUrl.host] = (parsedUrl.host in rrr ? rrr[parsedUrl.host] + 1 : 1);
       
        const response = {cancel: block};
        return response;
}
 
chrome.webRequest.onBeforeRequest.addListener(
        leetRequestFilter,
        {urls: ["http://*/*", "https://*/*"]},
        ["blocking"]  // Nothing continues until we decide to proceed.
);
