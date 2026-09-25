//aborted when this script is orphaned (extension reloaded/updated/removed)
const listeners = new AbortController();
const opts = {capture: true, signal: listeners.signal};

//an orphaned content script keeps running in already-open tabs but loses chrome.runtime,
//so unhook everything instead of throwing and swallowing left-edge clicks for nothing
function send(msg) {
  if(!chrome.runtime?.id) {
    listeners.abort();
    return;
  }
  chrome.runtime.sendMessage(msg);
}

function stopProp(e) {
  if(e.screenX === 0 && e.screenY !== 0) {
    e.preventDefault();
    e.stopPropagation();
  }
}

let mouseDown = false;  //avoids drag and drop accidental activation

//needs onmouseup on Chrome because "onclick" fails upon mousedown suppression
window.addEventListener("mouseup", e => {
  if(mouseDown && e.screenX === 0 && e.screenY !== 0) {
    send({
      clickAction: e.button
    });
    stopProp(e);
  }
  mouseDown = false;
}, opts);

window.addEventListener("mousedown", e => {
  mouseDown = false;
  if(e.screenX === 0 && e.screenY !== 0) {
    if(e.buttons === 3) {  //left+right button concurrently pressed
      stopProp(e);
      send({
        clickAction: e.buttons
      });
    } else {
      mouseDown = true;
      if(e.button === 1) stopProp(e);
    }
  }
}, opts);

window.addEventListener("wheel", e => {
  if(e.screenX === 0 && e.screenY !== 0) {
    send({
      scrollAction: (e.deltaY > 0) ? 1 : -1
    });
    //stopProp(e);
  }
}, opts);

//suppresses link navigation and open in new tabs on Firefox
window.addEventListener("click", stopProp, opts);

//suppresses middle click open in new tabs
window.addEventListener("auxclick", stopProp, opts);

//mouseUp on Windows, mouseDown on Linux
window.addEventListener("contextmenu", stopProp, opts);
