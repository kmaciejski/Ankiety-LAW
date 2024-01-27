// popup.js

//
// inicjalizacja
//
window.onload = function() {
//1. Aktualizujemy zaznaczoną wczesniej ocene
    chrome.storage.sync.get(['note'], function(result) {
        if(result.note == undefined){
            console.log("undefined.");
            chrome.storage.sync.set({"note" : 3})
            updateRadioButtons(3);
        }else{
            updateRadioButtons(result.note);
        }
    });

//2. Dodajemy change event do wszystkich radiobuttonow z grupy note
    const radioButtons = document.querySelectorAll('input[name="note"]');
    for (const radioButton of radioButtons) {
        radioButton.addEventListener('change', onRadioChange);
    }


//3. Dodajemy akcje do przycisku zatwierdz
    document.querySelector("#btnSubmit")
        .addEventListener("click", onSubmit);

}

//
// zaznaczenie radiobuttona wg. zapisanej noty
//
function updateRadioButtons(note){
    const radioButtons = document.querySelectorAll('input[name="note"]');
    for (const radioButton of radioButtons) {
        if(radioButton.value == note)
            radioButton.checked = true;
        else
            radioButton.checked = false;
    }


    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        chrome.tabs.sendMessage(tabs[0].id, {action: "noteChanged", note: note},
         function(response) {
             console.log(response.result);
        });  
    });

}

//
// akcja po zmianie noty
//
function onRadioChange(e){

    let n = this.value;

    if (this.checked) {
        chrome.storage.sync.set({"note" : n})

        chrome.storage.sync.get(['note'], function(result) {
            console.log('Value currently is ' + result.note);
        });        
    }

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        chrome.tabs.sendMessage(tabs[0].id, {action: "noteChanged", note: n},
         function(response) {
             console.log(response.result);
        });  
    });

}

//
// akcja po wcisnieciu przycisku zatwierdz
//
function onSubmit(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        chrome.tabs.sendMessage(tabs[0].id, {action: "submit"},
         function(response) {
             console.log(response.result);
        });  
    });
}