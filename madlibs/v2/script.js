(function(){
    "use strict"
    console.log("running JS");

    //ok first we need to set an event listener to target the button. The button should switch the form to section 2 of the form.

    const firstbtn = document.querySelector("#next1");
    const firstform = document.querySelector("#firstform");
    const secondform = document.querySelector("#secondform");

    const errormessage = document.querySelector(".errormessage")

    //I need to use these in both event listeners so I am going to create some consts in both functions.


    firstbtn.addEventListener("click", function(event){
        //first we need to prevent default
        event.preventDefault();

        const year = document.querySelector("#year").value;
        const mission = document.querySelector("#mission").value;
        //I needed to research how to use the radio stuff.
        const planet = document.querySelector("input[name=planet]:checked").value;

        //second we need to prevent the page from moving on if the data forms are not filled out.
        let myText;

        if(year==""){
            myText = "Please enter your Space Year.";
            document.querySelector("#year").focus();
            errormessage.style.display="block";
        } else if(mission==""){
            myText = "Please enter your mission name.";
            document.querySelector("#mission").focus();
            errormessage.style.display="block";
        } else if(planet==""){
            myText = "Please select a destination.";
            document.querySelector("#planet").focus();
            errormessage.style.display="block";
        } else{
            //We need to set set1 to hidden and set 2 to showing
            errormessage.style.display="none";
            firstform.className="hidden";
            secondform.className="showing";
        }

        errormessage.innerHTML=myText;

    });

    //ok now we need to add an event Listener to target the submit input. The input should take away the form and switch it to the second screen.

    const secondbtn = document.querySelector("#send-form");
    const firstscreen = document.querySelector("#screen1");
    const secondscreen = document.querySelector("#screen2");

    const putData = document.querySelectorAll(".madlib");
    const randomnumber = document.querySelector(".randomnumber");

    secondbtn.addEventListener("click", function(event){
        //first we need to prevent default
        event.preventDefault();

        // values from previous
        const year = document.querySelector("#year").value;
        const mission = document.querySelector("#mission").value;
        const planet = document.querySelector("input[name=planet]:checked").value;

        // values in new form
        const company = document.querySelector("#company").value;
        const city = document.querySelector("#city").value;
        const exercise = document.querySelector("#exercise").value;
        const species = document.querySelector("#species").value;

        let myText;
        //

        if(company==""){
            myText = "Please enter the company you work for.";
            document.querySelector("#company").focus();
            errormessage.style.display="block";
        } else if(city==""){
            myText = "Please enter the desired city.";
            document.querySelector("#year").focus();
            errormessage.style.display="block"; 
        } else if(exercise==""){
            myText = "Please enter your method of exercise.";
            document.querySelector("#exercise").focus();
            errormessage.style.display="block";
        } else if(species==""){
            myText = "Please enter a plant species name.";
            document.querySelector("#species").focus();
            errormessage.style.display="block";
        } else{
        //second we need to set screen1 in the CSS to display none and screen2 we need to turn off the display none function. (we can just set it to flex).

        const numOfValues = 9501; 
        const randomNum = Math.random();
        const randomVal = randomNum * numOfValues;
        const roundedRandomVal = 500 + Math.floor(randomVal);
        
        firstscreen.style.display="none";
        secondscreen.style.display="flex";

        randomnumber.innerHTML += " " + roundedRandomVal;

        putData[0].innerHTML += " " + mission;
        putData[1].innerHTML = year;
        putData[2].innerHTML = company;
        putData[3].innerHTML = planet;
        putData[4].innerHTML = city;
        putData[5].innerHTML = exercise;
        putData[6].innerHTML = species;

        //So, now we need to get the data and input it into the madlib. I am going to create an array of the information and then change content based on the form data. This means 1. I need to get the form data & 2. I need the array of places to put the data.

        //1

        //2
        }

        errormessage.innerHTML=myText;
    });

    // This resets the code on the page
    const thirdbtn = document.querySelector("#button3");

    thirdbtn.addEventListener("click", function(){
        document.querySelector('#year').value = '';
        document.querySelector('#mission').value = '';
        // document.querySelector('#input[name=planet]:checked').value = '';
        document.querySelector("input[name=planet]").checked = false;
        document.querySelector('#company').value = '';
        document.querySelector('#city').value = '';
        document.querySelector('#exercise').value = '';
        document.querySelector('#species').value = '';
        window.location.reload();
    });

})();