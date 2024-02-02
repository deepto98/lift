


document.addEventListener("DOMContentLoaded", createLifts);

function createLifts() {

    // Get values from url params
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const numFloors = urlParams.get('numberOfFloors')
    const numLifts = urlParams.get('numberOfLifts')


    var liftSystemContainer = document.getElementById('liftSystemContainer');
    liftSystemContainer.innerHTML = ''; // Clear previous content

    for (var floor = numFloors; floor >= 1; floor--) {
        var floorDiv = document.createElement('div');
        floorDiv.classList.add('floor');

        var buttonContainer = document.createElement('div');
        buttonContainer.classList.add('button-container');
        buttonContainer.id = "button-container".concat(floor);

        var ulElement = document.createElement("ul");

        if (floor != numFloors) {
            var liElement = document.createElement("li");


            var upButton = document.createElement('button');
            upButton.classList.add('up-button');
            upButton.textContent = 'Up';
            upButton.id = "up-btn-".concat(floor);

            liElement.appendChild(upButton)

            ulElement.appendChild(liElement)
        }
        // var separator = document.createElement('div');
        // separator.classList.add('separator');

        if (floor != 1) {
            liElement = document.createElement("li");
            var downButton = document.createElement('button');
            downButton.classList.add('down-button');
            downButton.textContent = 'Down';
            downButton.id = "down-btn-".concat(floor);
            liElement.appendChild(downButton)
        }

        var blackLine = document.createElement('div');
        blackLine.classList.add('black-line');

        ulElement.appendChild(liElement)
        buttonContainer.appendChild(ulElement)
        // buttonContainer.appendChild(upButton);
        // // buttonContainer.appendChild(separator);
        // buttonContainer.appendChild(downButton);

        var floorLabel = document.createElement('div');
        floorLabel.classList.add('floor-label');
        floorLabel.textContent = 'Floor ' + floor;

        floorDiv.appendChild(buttonContainer);
        if (floor == 1) {

            var liftContainer = document.createElement('div');
            liftContainer.classList.add('lift-container');

            for (var lift = 1; lift <= numLifts; lift++) {

                // Create a new div element for the blue rectangle
                var liftRectangle = document.createElement("div");

                liftRectangle.classList.add('lift');
                // Set the id of the new div element to "lift"
                liftRectangle.id = "lift-".concat(lift);

                //Add two lift doors- left and right 
                var leftDoor = document.createElement("div");
                leftDoor.classList.add('left-door');
                leftDoor.id = "left-door-".concat(lift);

                var rightDoor = document.createElement("div");
                rightDoor.classList.add('right-door');
                rightDoor.id = "right-door-".concat(lift);
                liftRectangle.append(leftDoor)
                liftRectangle.append(rightDoor)

                // Append the new div element to the container
                liftContainer.appendChild(liftRectangle);
            }
            blackLine.appendChild(liftContainer);

        }
        floorDiv.appendChild(blackLine);

        floorDiv.appendChild(floorLabel);

        liftSystemContainer.appendChild(floorDiv)
    }

    // Manage positions here
    let positions = []; // this array stores positions of each lift
    // Fill values with 1 indexing, position[liftNo]=floor
    positions[0] = 0; // setting 0 nd to 0, for easy destructuring from sessionstorage
    for (let i = 1; i <= numLifts; i++) {
        positions[i] = 1  //Initially all lifts are at floor 1
    }
    // Set as positions key in sessionStorage
    sessionStorage.setItem('positions', positions);
    sessionStorage.setItem('numLifts', numLifts);
    sessionStorage.setItem('numFloors', numFloors);

    // Get the button element by its id
    var upButtons = document.getElementsByClassName("up-button");
    var downButtons = document.getElementsByClassName("down-button");

    // Add event listeners

    for (const upButton of upButtons) {
        // Add an event listener for the "click" event
        let floor = upButton.id.slice(7) // ids are in the format up-btn-2
        upButton.addEventListener("click", upPressed);
        upButton.floor = floor
    }

    for (const downButton of downButtons) {
        // Add an event listener for the "click" event
        let floor = downButton.id.slice(9) // ids are in the format down-btn-2
        downButton.addEventListener("click", downPressed);
        downButton.floor = floor
    }
}


function upPressed(event) {
    manageLiftMovement(event)
}

function downPressed(event) {
    manageLiftMovement(event)
}


function manageLiftMovement(event) {
    // Calculate lift to move
    // Up can be called from 1st floor to numFloors-1 th floor 
    // First we need to find the nearest lift
    // If a lift is present at that floor, do nothing
    floorFromWhichCalled = event.currentTarget.floor
    // Get nearest lift
    let nearestLift = getNearestLift(floorFromWhichCalled)
    // Fetch positions
    var positions = parsePositionsFromSessionStorage();
    let floorOfNearestLift = positions[nearestLift];

    //    if lift is on same floor, do nothing
    if (floorOfNearestLift == floorFromWhichCalled) {

    }
    //lift is above, has to move down
    else if (floorOfNearestLift > floorFromWhichCalled) {
        var direction = 1; // 1 for moving down, -1 for moving up
        var distance = 130 * (floorOfNearestLift - floorFromWhichCalled); // Adjust the speed of the animation
        moveDiv(nearestLift, direction, distance);

    }
    //lift is below, has to move up
    else if (floorOfNearestLift < floorFromWhichCalled) {
        var direction = -1; // 1 for moving down, -1 for moving up
        var distance = 130 * (floorFromWhichCalled - floorOfNearestLift); // Adjust the speed of the animation
        moveDiv(nearestLift, direction, distance);

    }
    positions[nearestLift] = floorFromWhichCalled
    sessionStorage.setItem('positions', positions);

}


function getNearestLift(currentFloor) {
    let positions = parsePositionsFromSessionStorage();
    let numFloors = sessionStorage.getItem('numFloors');
    let numLifts = sessionStorage.getItem('numLifts');

    let leastDistFromCurrentFloor = numFloors
    let nearestLift = numLifts + 1
    for (let liftNo = 1; liftNo <= positions.length; liftNo++) {
        if (Math.abs(positions[liftNo] - currentFloor) < leastDistFromCurrentFloor) {
            leastDistFromCurrentFloor = Math.abs(positions[liftNo] - currentFloor)
            nearestLift = liftNo
        }
    }

    return nearestLift
}

function parsePositionsFromSessionStorage() {
    var positions = sessionStorage.getItem('positions');
    var positionsArr = positions.split(',');
    return positionsArr
}

async function moveDiv(liftNo, direction, distance) {
    var liftToMove = document.getElementById("lift-".concat(liftNo));
    console.log(liftToMove)

    var currentPosition = parseInt(liftToMove.style.top) || 0;




    //, move lift  Transition - 2s/floor
    floorsToMove = distance / 130;
    liftToMove.style.transition = 2 * floorsToMove + 's linear';
    // Move the div in the specified direction

    liftToMove.style.top = currentPosition + direction * distance + "px";
    await new Promise(r => setTimeout(r, 2000 * floorsToMove));

    // Now Open Doors
    var leftDoor = document.getElementById("left-door-".concat(liftNo));
    console.log(leftDoor)
    var leftDoorLeft = parseInt(leftDoor.style.left);
    var liftLeft = liftToMove.style.left
    var leftDoorFinalLeft = liftLeft - leftDoorLeft
    console.log(leftDoorLeft + " " + liftLeft + " " + leftDoorFinalLeft)
    leftDoor.style.left = -45 + "px";

    var rightDoor = document.getElementById("right-door-".concat(liftNo));
    var rightDoorRight = parseInt(rightDoor.style.right);

    rightDoor.style.left = 43 + "px";
    await new Promise(r => setTimeout(r, 2500));

    //Close Doors
    leftDoor.style.left = 0 + "px";
    rightDoor.style.left = 0 + "px";

}
