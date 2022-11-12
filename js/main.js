let inputsWrapper = document.getElementById("inputSection");
let enteredFloor = document.getElementById("enterFloors");
let enteredLift = document.getElementById("enterLifts");
let startBtn = document.getElementById("generateBtn");
let topBtn = document.getElementById("top-btn")
let sampleDiv = document.querySelector(".sample-div");

let floorSection = document.querySelector(".floor-section");

function buttonClickUp(j){
    console.log("up button of floor", j, "is clicked");
}

function buttonClickDown(j) {
    console.log("down button of floor", j, "is clicked");
}

// generating floors
let generateFloors = (floor_no) => {
    for (let j = 0; j < floor_no; j++) {

        const btn_lift_up = document.createElement("button");
        btn_lift_up.className = "btn_lift_up";
        btn_lift_up.textContent = "UP";
        const btn_lift_down = document.createElement("button");
        btn_lift_down.className = "btn_lift_down";
        btn_lift_down.textContent = "DOWN";

        btn_lift_up.addEventListener("click", () => { buttonClickUp(j) })
        btn_lift_down.addEventListener("click", () => { buttonClickDown(j) })

        // button "UP" & "DOWN" are inside a parent wrapper "btn_wrapper" which is child of flooSection

        const floor = document.createElement("div");
        floor.className = "floor";
        const floorText = document.createElement("p");
        floorText.className = "floorText"
        floorText.innerText = "Floor " + " " + (j);
        floorSection.prepend(floor);
        const btn_wrapper = document.createElement("div");
        btn_wrapper.className = "btn_wrapper";
        btn_wrapper.appendChild(btn_lift_up);
        btn_wrapper.appendChild(btn_lift_down);
        floor.append(btn_wrapper);
        floor.prepend(floorText)

        console.log(floorSection.childNodes[0], "from the loop of floors generation");

    }
};

// generating lifts
let generateLifts = (lift_no) => {

    for (let i = 0; i < lift_no; i++) {
        const lift = document.createElement("div");
        lift.className = "lift";
        lift.setAttribute("data-currentFloor", 0);
        const lift_right = document.createElement("div");
        lift_right.className = "lift_right";
        const lift_left = document.createElement("div");
        lift_left.className = "lift_left";

        lift.appendChild(lift_left);
        lift.appendChild(lift_right);

        // console.log(floorSection.childNodes.length - 1);
        setTimeout(() => {
            let firstFloor = floorSection.childNodes[floorSection.childNodes.length - 1];
            firstFloor.append(lift);

        }, 2000)

    }

};

function verifySimulationInputs() {
    floors = Number(enteredFloor.value);
    lifts = Number(enteredLift.value);

    enteredFloor.value = "";
    enteredLift.value = "";

    if (window.innerWidth <= 500 && lifts > 2) {
        alert("This screen size can't have more than 2 lifts");
    }
    else if (window.innerWidth > 500 && window.innerWidth <= 768 && lifts > 6) {
        alert("This screen size can't have more than 6 lifts");
    }
    else {
        generateFloors(floors);
        // console.log("no of floors- ", floors);
        generateLifts(lifts);
        // console.log("no of lifts- ", lifts);
    }
};


startBtn.addEventListener("click", (e) => {
    e.preventDefault();
    verifySimulationInputs();
    inputsWrapper.style.display = "none";
    topBtn.style.display = "block";
    console.log(sampleDiv)
});

// movement of lift

// get the btns first then on click property, 
// then make 2 variables that store the current position of the lift and the target floor
// console log the taget floor

// let targetFloor = ;
// const allLiftBtns = document.getElementsByClassName(".floorSection").childNodes;

function calcDistance(){


}

function moveLiftUp() {

    //get all up down btns from btn wrapper
    let allLiftBtns = document.querySelector(".floor-section").childNodes;
    let currentFloor = floorSection.childNodes[floorSection.childNodes.length - 1];
    console.log("log of floor section" + floorSection);

}

