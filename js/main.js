let inputsWrapper = document.getElementById("inputSection");
let enteredFloor = document.getElementById("enterFloors");
let enteredLift = document.getElementById("enterLifts");
let startBtn = document.getElementById("generateBtn");
let topBtn = document.getElementById("top-btn")

let floorSection = document.querySelector(".floor-section");

function moveLift(j) {
    let firstLift = document.querySelector(".liftContainer").childNodes[0];
    console.log(" inside calc dis ", j);
    let distance = (90 * j) + (30 * j);
    firstLift.style.transform = `translate(0, -${distance}px)`;
    firstLift.style.transitionDuration = `${2 * j}s`;

    firstLift.setAttribute('data-state', 'busy');
    console.log("the lift is at state: " + firstLift.dataset.state);

    setTimeout(() => {
        animateLiftDoors();
    }, 2000 * j)


}

// states of lifts {free or busy}
function liftState() {
    // get all the generatted lifts instead of nodelist it'll return an array
   const mylifts = Array.from(document.querySelectorAll(".lift"));
   console.log("My lifts : " + mylifts);
//    let freeLifts = [];
//    let busyLifts = [];
//    console.log("All the lifts: " + mylifts);
//    mylifts.setAttribute("liftState", free);
//    mylifts.setAttribute("liftState", busy);

}


function animateLiftDoors() {
    const firstLift = document.querySelector(".liftContainer").childNodes[0];
    const leftDoor = document.querySelector(".lift_left");
    const rightDoor = document.querySelector(".lift_right");
    leftDoor.style.transform = `translate(-30px, 0)`;
    rightDoor.style.transform = `translate(30px, 0)`;
    leftDoor.style.transitionDuration = `2.5s`;
    rightDoor.style.transitionDuration = `2.5s`;

    setTimeout(() => {
        leftDoor.style.transform = `translate(0, 0)`;
        rightDoor.style.transform = `translate(0, 0)`;
        
        
    }, 2500)

    setTimeout(()=>{
        firstLift.setAttribute('data-state', 'free');
        console.log("the lift is at state: " + firstLift.dataset.state);

    }, 5000)

    // console.log("the lift is at state: " + firstLift.dataset.state);

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

        btn_lift_up.addEventListener("click", () => { moveLift(j) });

        btn_lift_down.addEventListener("click", () => { moveLift(j) });

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

    // parent of lifts
    const liftContainer = document.createElement("div");
    liftContainer.className = "liftContainer";

    for (let i = 0; i < lift_no; i++) {

        const liftNo = `${i}`;

        const lift = document.createElement("div");
        lift.className = "lift";

        // setting value of the lift when it's on floor-0
        lift.setAttribute("data-currentFloor", 0);
        const lift_right = document.createElement("div");
        lift_right.className = "lift_right";
        const lift_left = document.createElement("div");
        lift_left.className = "lift_left";

        lift.appendChild(lift_left);
        lift.appendChild(lift_right);

        lift.setAttribute('id' , liftNo);
        console.log(lift.id);

        // setting the status of the lift as free initially
        lift.setAttribute('data-state', 'free');
        console.log("the lift is at state: " + lift.dataset.state);

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

// clicking on start btn
startBtn.addEventListener("click", (e) => {
    e.preventDefault();
    verifySimulationInputs();
    inputsWrapper.style.display = "none";
    topBtn.style.display = "block";
    // console.log(sampleDiv)
});
