(function(){
    "use strict"
    console.log("running JS");

    //ok first we need to set an event listener to target the button. The button should switch the form to section 2 of the form.

    const firstbtn = document.querySelector("#next1");
    const firstform = document.querySelector("#firstform");
    const secondform = document.querySelector("#secondform");

    firstbtn.addEventListener("click", function(event){
        //before this we need to prevent default
        event.preventDefault();

        //first we need to set set1 to hidden and set 2 to showing
        firstform.className="hidden";
        secondform.className="showing";
    });

    //ok now we need to add an event Listener to target the submit input. The input should take away the form and switch it to the second screen.

    const secondbtn = document.querySelector("#send-form");
    const firstscreen = document.querySelector("#screen1");
    const secondscreen = document.querySelector("#screen2");

    //I used Gemini to find the function I needed which is windowWidth. 
    const windowWidth = window.innerWidth;

    secondbtn.addEventListener("click", function(event){
        //first we need to prevent default
        event.preventDefault();

        //second we need to set screen1 in the CSS to display none and screen2 we need to turn off the display none function. (we can just set it to flex).

        firstscreen.style.display="none";
        secondscreen.style.display="flex";
    });

})();