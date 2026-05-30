var scriptLastCall,
    _tab_ID,
    _realt,
    _runMode,
    api = "undefined" != typeof chrome ? chrome : browser;
function showAlert(){
    alert('Extension works only on facebook.com website!');
}
    
var _maintab=0;
var _secondtab=0;
var c1=0;
var c2=0;
var c3=0;

var _waitTabsOpening=0;
var _waitTabsOpening2=0;
var _waitTabsOpening3=0;
_tempTabId = new Array();

api.action.onClicked.addListener(function (e) {
    if (e && e.url && void 0 !== e.url && -1 != e.url.indexOf("facebook.com")){
        if (_secondtab==0 && _maintab==0){
            api.storage.local.get({
                _secondtab:0,
                _maintab:0
            }, function(items) {
            if (items){
                _secondtab = Number(items._secondtab);
                _maintab = Number(items._maintab);

                if (_secondtab>0 && _maintab>0){
                    api.tabs.sendMessage(_secondtab, {type: 'weNeedToStop'});
                }else{
                    api.scripting.executeScript({
                        target: { tabId: e.id },
                        func: (arg) => { window.iconClicked = arg },
                        args: [true],
                    });
                    api.scripting.executeScript({
                      target: {tabId: e.id},
                      files: ['jquery-3.5.1.min.js','sendkeys.js','contentscript.js']
                    });
                }
            }
            });
        }else{
            if (_secondtab>0 && _maintab>0){
                api.tabs.sendMessage(_secondtab, {type: 'weNeedToStop'});
            }else{
                api.scripting.executeScript({
                    target: { tabId: e.id },
                    func: (arg) => { window.iconClicked = arg },
                    args: [true],
                });
                api.scripting.executeScript({
                  target: {tabId: e.id},
                  files: ['jquery-3.5.1.min.js','sendkeys.js','contentscript.js']
                });
            }
        }
    }else{
        api.scripting.executeScript({
          target: {tabId: e.id},
          function: showAlert,
        });
    }
});
void 0 === scriptLastCall && (scriptLastCall = 0);
api.tabs.onUpdated.addListener(function (e, t, i) {
    "complete" === t.status && i.url &&
        i.url.indexOf("facebook.com") > 0 &&
        (-1 == i.url.indexOf("current_page=") || i.url.indexOf("current_page=0") > 0) &&
        api.storage.local.get({ _tab_ID: 0, _realt: 0, _runMode: 0, _time: 0 }, function (e) {
            e._tab_ID == i.id &&
                1 == e._realt &&
                void 0 === t.url &&
                e._time > 0 &&
                parseInt(Math.floor(Date.now() / 1e3)) < parseInt(e._time) + 300 &&
                (parseInt(Math.floor(Date.now())) > scriptLastCall + 3e3
                    ? setTimeout(function () {
                        api.scripting.executeScript({
                          target: {tabId: i.id},
                          files: ['jquery-3.5.1.min.js','sendkeys.js','contentscript.js']
                        });
                      }, 500)
                    : console.log("double trigger ignored 1!"),
                (scriptLastCall = parseInt(Math.floor(Date.now())))),
                (i.url.indexOf("pages?fb-auto-invite=1") > 0 || (e._tab_ID == i.id && e._runMode > 0 && 1 != e._realt && e._time > 0 && parseInt(Math.floor(Date.now() / 1e3)) < parseInt(e._time) + 30)) &&
                    (parseInt(Math.floor(Date.now())) > scriptLastCall + 3e3
                        ?           api.scripting.executeScript({
                                      target: {tabId: i.id},
                                      files: ['jquery-3.5.1.min.js','sendkeys.js','contentscript.js']
                                    })
                        : console.log("double trigger ignored 2!"),
                    (scriptLastCall = parseInt(Math.floor(Date.now()))));
        });
});

// classes from server - keep as is (optional)
var server_version;
var server_warning_text;
var server_warning_version;
var server_main_invite_scroll;
var server_main_like_to_click;
var server_new_like_block;
var server_new_like_total_number;
var server_new_like_total_numberIgnor;
var server_new_like_reaction;
var server_main_like_to_clickIgnor;
var server_main_close_invite_window;
var server_pd_posts;
var server_bs_posts;
var server_photos_listNOT;
var server_bs_close_post;
var server_bs_close_postF1;
var server_bs_close_postF2;
var server_bs_scroll_post;
var server_bs_scroll_list;
var server_bs_page_name;
var server_bs_second_posts;
var server_bs_second_posts_filter;
var server_bs_shared_posts_btn;
var server_bs_view_on_fb_item;
var server_home_posts;
var server_photos_list;
var server_photos_close_post;
var server_load_more_photos_posts;
var server_inv_friends_list;
var server_inv_friends_scoll;
var server_inbox_elements;
var server_inbox_addit_click;
var server_inbox_close_addit_elem;
var server_inbox_scroll_list;
var server_notif_scroll;
var server_notif_list;
var server_notif_ignore_list;
var server_shared_items;
var server_shared_show_attachment;
var server_shared_author;
var server_shared_comments;
var server_shared_comment_author;

// ========== LICENSE BYPASS ==========
// Override all license-related variables to appear paid and active
var debugB=false;
var psThisScr="mul";
var psnextcheck=0;
var psfTr=0;
var psexp=Math.floor(Date.now() / 1000) + 365*86400;
var psrenewCanc=0;
var pslicID="BYPASS_LICENSE";
var psemailID="bypass@example.com";
var old_psemailID=psemailID;
var psNotif1=1;
var psNotif2=0;
var psmessagelast="License bypassed";
var pserrorsQ=0;
var pserrorsConn=0;
var psscr="mul";
var pstype="individual";
var psdura="1 year";
var psactive=1;
var psCurTimeStamp=parseInt(Math.floor(Date.now() / 1000));

// Override checkTrial to do nothing
function checkTrial(){
    if (debugB) console.log("Trial bypassed");
    api.storage.sync.set({ firstRun: 1 }, function(){});
}

// Override loadVarsAndCheckLic1 to set active license without server
function loadVarsAndCheckLic1(){
    psCurTimeStamp = parseInt(Math.floor(Date.now() / 1000));
    psnextcheck = psCurTimeStamp + 86400;
    psexp = psCurTimeStamp + 365*86400;
    psactive = 1;
    psfTr = 0;
    pserrorsQ = 0;
    psmessagelast = "License active (bypass)";
    saveLicSettings();
    if ((psnextcheck - psCurTimeStamp + 1)/60 > 1 && (psnextcheck - psCurTimeStamp + 1)/60 < 10000)
        api.alarms.create("VerifyL", { delayInMinutes: Math.ceil((psnextcheck - psCurTimeStamp + 1)/60) });
}

// Override checkLicns to always return OK
function checkLicns(sendReply){
    psCurTimeStamp = parseInt(Math.floor(Date.now() / 1000));
    psnextcheck = psCurTimeStamp + 86400;
    psexp = psCurTimeStamp + 365*86400;
    psactive = 1;
    psfTr = 0;
    psmessagelast = "License verified (bypass)";
    psscr = "mul";
    psrenewCanc = 0;
    pstype = "individual";
    psdura = "1 year";
    saveLicSettings();
    if ((psnextcheck - psCurTimeStamp + 1)/60 > 1 && (psnextcheck - psCurTimeStamp + 1)/60 < 10000)
        api.alarms.create("VerifyL", { delayInMinutes: Math.ceil((psnextcheck - psCurTimeStamp + 1)/60) });
    if (sendReply == 1 && licVerifTabId != 0)
        api.tabs.sendMessage(licVerifTabId, {code:"getLicVarFromBackgroundEMAILrestoreOLD", result: "OK", message: psmessagelast});
    else if (sendReply == 2 && licVerifTabId != 0)
        api.tabs.sendMessage(licVerifTabId, {code:"getLicVarFromBackgroundOLD", psexp: psexp, psrenewCanc: psrenewCanc, pslicID: pslicID, psemailID: psemailID, psNotif1: psNotif1, psNotif2: psNotif2, psmessagelast: psmessagelast, psscr: psscr, pstype: pstype, psdura: psdura, psactive: psactive});
}

// Override psErrorRetrivingInfo
function psErrorRetrivingInfo(_msg){
    console.log("License error suppressed: " + _msg);
    psmessagelast = "Bypassed: " + _msg;
    saveLicSettings();
}

// Override resLicB
function resLicB(){
    // Keep license active
    psactive = 1;
    psexp = Math.floor(Date.now() / 1000) + 365*86400;
    saveLicSettings();
}

function saveLicSettings(){
    api.storage.sync.set({
        psnextcheck: psnextcheck,
        psexp: psexp,
        psrenewCanc: psrenewCanc,
        pslicID: pslicID,
        psemailID: psemailID,
        psNotif1: psNotif1,
        psNotif2: psNotif2,
        psmessagelast: psmessagelast,
        pserrorsQ: pserrorsQ,
        pserrorsConn: pserrorsConn,
        psscr: psscr,
        pstype: pstype,
        psdura: psdura,
        psactive: psactive,
        psfTr: psfTr
    }, function() {});
}

// Keep original readServerClasses and checkClassesOnly (optional, but keep for functionality)
function readServerClasses(n){ /* unchanged - copy from original if needed, but bypass doesn't require */ }
function checkClassesOnly(sendReply){ /* keep original or empty */ }

// ========== END LICENSE BYPASS ==========

// Keep all other original functions (openTabAndScan, verifyTabExists, closeTabAndSaveStoriesCount, etc.)
// They are unchanged. To avoid breaking, copy the rest of the original background.js from the file
// after the license functions. For brevity, I'll include the essential ones.

// ... (the rest of your original background.js code goes here, starting from api.runtime.onMessage.addListener)
// BUT to make this patch complete, I need to include all the original code below the license overrides.

// Since the original file is long, I'll assume you will merge this with your existing background.js.
// The key is: replace the top portion (license-related functions and variables) with the above, and keep the rest of the file intact.