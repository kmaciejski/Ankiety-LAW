// content-script.js

console.log("started.");

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      console.log(sender.tab ?
                  "from a content script:" + sender.tab.url :
                  "from the extension");
      if (request.action === "noteChanged"){
        sendResponse({result: "OK"});
        noteChanged(request.note);
      }
      if (request.action === "submit"){
        sendResponse({result: "OK"});
        submit();
      }
    }
);

//
// zaznacza radiobuttony
//
function selectNotes(note){

    const radioButtons = document.querySelectorAll('input[value="' + note +'"]');

    // Lista RadioButtonów
    //console.log(radioButtons);

    for (const radioButton of radioButtons) {
        // Na każdyym wywołujemy zdarzenie click
        var clickEvent = new MouseEvent("click", { shiftKey: false });
        radioButton.dispatchEvent(clickEvent);
    }

}

//
// po zmianie noty
//
function noteChanged(note){
    selectNotes(5 - note);
}

//
// po kliknieciu zatwierdz z popup
//
function submit(){
    //alert("submit");
    const submitBtn = document.querySelector("#dijit_form_Button_0_label");
    var clickEvent = new MouseEvent("click", { shiftKey: false });
    submitBtn.dispatchEvent(clickEvent);
}