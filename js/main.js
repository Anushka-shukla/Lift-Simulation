let inputsWrapper = document.getElementById("inputSection");
let enteredFloor = document.getElementById("enterFloors");
let enteredLift = document.getElementById("enterLifts");
let startBtn = document.getElementById("generateBtn");
let topBtn = document.getElementById("top-btn")

let floorSection = document.querySelector(".floor-section");

// when the lift is in a busy state and user presses another up/down button then store the request
let liftRequests = [];
const storeLiftRequest = (j) => {
    liftRequests.push(j);
    console.log("storing lift requests: ", liftRequests);
};

function moveLift(j) {
   

    const targetLifts = Array.from(document.querySelectorAll(".lift"));

    const freeLift = targetLifts.find((lift) => lift.dataset.state === "free");
    console.log(
      `lift's current floor ${freeLift.dataset.currentFloor}, incoming request${j}`
    );

    let floorDifference = Math.abs(Number(freeLift.dataset.currentFloor) - j);
    // freeLift.style.transform = `translate(0, -${120 * floorDifference}px)`;
    // freeLift.style.transitionDuration = `${2.5 * floorDifference}s`;
    // my version---------
    freeLift.style.transition = `bottom ${floorDifference * 2.5}s`; //duration
    freeLift.style.bottom = `${120 * (j-1) }px`; //distance

    // ----------

    console.log(floorDifference, "calculated floor difference");
    console.log("distance it should travel", 120 * floorDifference, "px");
    freeLift.setAttribute("data-state", "busy");

    

    setTimeout(() => {
      animateLiftDoors(freeLift, j);
    }, 2500 * floorDifference);
    freeLift.setAttribute("data-current-floor", j);
    console.log("updated lift's current floor", freeLift.dataset.currentFloor);
  }


// lift vacancy
function handleLiftVacancy(j) {
    freeLiftsArr = Array.from(document.querySelectorAll(".lift"));
    if (

        freeLiftsArr.find((lift) => lift.dataset.state === "free")
    ) {
        moveLift(j);
    } else {
        storeLiftRequest(j);
        console.log("lift needs to go on these floors too- ", j)
    }

}


function animateLiftDoors(freeLift, j) {

    const leftDoor = freeLift.childNodes[0];
    const rightDoor = freeLift.childNodes[1];
    leftDoor.style.transform = `translate(-30px, 0)`;
    rightDoor.style.transform = `translate(30px, 0)`;
    leftDoor.style.transitionDuration = `2.5s`;
    rightDoor.style.transitionDuration = `2.5s`;

    // console.log(leftDoor);

    setTimeout(() => {
        leftDoor.style.transform = `translate(0, 0)`;
        rightDoor.style.transform = `translate(0, 0)`;


    }, 2500)

    // setting the status of the lift as free back again
    setTimeout(() => {
        freeLift.setAttribute('data-state', 'free');
        console.log("the lift is at state: " + freeLift.dataset.state);

        if (liftRequests.length > 0) {
            // liftRequests[0];
            moveLift(liftRequests[0]);
            // console.log("inside lift req:");
            liftRequests.shift();
        }
        freeLift.setAttribute('data-current-floor', j);
        console.log(freeLift.dataset.currentFloor, "I am from set timeout");

    }, 5000)

}

// generating floors
let generateFloors = (floor_no) => {
    for (let j = 1; j <= floor_no; j++) {

        const btn_lift_up = document.createElement("button");
        btn_lift_up.className = "btn_lift_up";
        btn_lift_up.textContent = "UP";
        const btn_lift_down = document.createElement("button");
        btn_lift_down.className = "btn_lift_down";
        btn_lift_down.textContent = "DOWN";

        btn_lift_up.addEventListener("click", () => { handleLiftVacancy(j) });
        btn_lift_down.addEventListener("click", () => { handleLiftVacancy(j) });

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

        // console.log(floorSection.childNodes[0], "from the loop of floors generation");

    }
};

// generating lifts
let generateLifts = (lift_no) => {

    // parent of lifts
    const liftContainer = document.createElement("div");
    liftContainer.className = "liftContainer";

    for (let i = 0; i < lift_no; i++) {

        const liftNo = `${i}`;

        const lift = document.createElement("div");
        lift.className = "lift";

        // setting value of the lift when it's on floor-0
        lift.setAttribute("data-current-floor", 0);
        const lift_right = document.createElement("div");
        lift_right.className = "lift_right";
        const lift_left = document.createElement("div");
        lift_left.className = "lift_left";

        lift.appendChild(lift_left);
        lift.appendChild(lift_right);

        lift.setAttribute('id', liftNo);
        // console.log(lift.id);

        // setting the status of the lift as free initially
        lift.setAttribute('data-state', 'free');
        // console.log("the lift is at state: " + lift.dataset.state);
        lift.setAttribute('data-current-floor', 0);


        setTimeout(() => {
            let firstFloor = floorSection.childNodes[floorSection.childNodes.length - 1];
            firstFloor.append(liftContainer);
            liftContainer.append(lift);
            // console.log(document.querySelector(".lift"));

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
    else if (window.innerWidth > 500 && window.innerWidth <= 768 && lifts > 4) {
        alert("This screen size can't have more than 4 lifts");
    }
    else if (window.innerWidth > 500 && window.innerWidth <= 1024 && lifts > 7) {
        alert("This screen size can't have more than 7 lifts");
    }
    else if (window.innerWidth > 500 && window.innerWidth <= 1440 && lifts > 10) {
        alert("This screen size can't have more than 10 lifts");
    }
    else if (window.innerWidth > 500 && window.innerWidth <= 2560 && lifts > 17) {
        alert("This screen size can't have more than 17 lifts");
    }
    else {
        generateFloors(floors);
        // console.log("no of floors- ", floors);
        generateLifts(lifts);
        // console.log("no of lifts- ", lifts);
    }
};

// clicking on start btn
startBtn.addEventListener("click", (e) => {
    e.preventDefault();
    verifySimulationInputs();
    inputsWrapper.style.display = "none";
    topBtn.style.display = "block";
    // console.log(sampleDiv)
});