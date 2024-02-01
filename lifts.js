


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

        if (floor != numFloors){
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
    for (let i = 1; i <= numLifts; i++) {
        positions[i] = 1  //Initially all lifts are at floor 1
    }
    // Set as positions key in sessionStorage
    sessionStorage.setItem('positions', positions);

    // Get the button element by its id
    var upButtons = document.getElementsByClassName("up-button");
    var downButtons = document.getElementsByClassName("down-button");

    // Add event listeners

    for (const upButton of upButtons) {
        // Add an event listener for the "click" event
        let floor = upButton.id.slice(7) // ids are in the format up-btn-2
        upButton.addEventListener("click", toggleUpAnimation);
        upButton.floor = floor
    }

    for (const downButton of downButtons) {
        // Add an event listener for the "click" event
        let floor = upButton.id.slice(7) // ids are in the format up-btn-2
        downButton.addEventListener("click", toggleDownAnimation);
        downButton.floor = floor
    }
}

function toggleUpAnimation(event) {
    floorFromWhichCalled = event.currentTarget.floor
    // Animations
    console.log("floorFromWhichCalled")
    console.log(floorFromWhichCalled)
    // Calculate lift to move
    // Up can be called from 1st floor to numFloors-1 th floor 
    // First we need to find the nearest lift
    // Fetch positions
    var positions = sessionStorage.getItem('positions');
    console.log("Current positions")
    console.log(positions)
    var animatedDiv = document.getElementById("lift-2");
    // console.log(animatedDiv)
    var direction = -1; // 1 for moving down, -1 for moving up
    var distance = 130; // Adjust the speed of the animation
    var isAnimating = false;
    if (isAnimating) {
        // Stop the animation
        clearInterval(animationInterval);
    } else {
        // Start the animation
        animationInterval = setInterval(moveDiv(animatedDiv, direction, distance), 16); // Adjust the interval for smoother animation (16ms = 60fps)
    }

    isAnimating = !isAnimating;
}

function toggleDownAnimation(event) {
    floorFromWhichCalled = event.currentTarget.floor
    // Animations
    var animatedDiv = document.getElementById("lift-2");
    console.log(animatedDiv)
    var direction = 1; // 1 for moving down, -1 for moving up
    var distance = 130; // Adjust the speed of the animation
    var isAnimating = false;
    if (isAnimating) {
        // Stop the animation
        clearInterval(animationInterval);
    } else {
        // Start the animation
        animationInterval = setInterval(moveDiv(animatedDiv, direction, distance), 16); // Adjust the interval for smoother animation (16ms = 60fps)
    }

    isAnimating = !isAnimating;
}

function moveDiv(animatedDiv, direction, speed) {
    var currentPosition = parseInt(animatedDiv.style.top) || 0;
    // console.log(currentPosition)

    // console.log(window.innerHeight - animatedDiv.clientHeight)
    // if (currentPosition >= window.innerHeight - animatedDiv.clientHeight && direction === 1) {
    //     // Change direction when reaching the bottom
    //     direction = -1;
    // } else if (currentPosition <= 0 && direction === -1) {
    //     // Change direction when reaching the top
    //     direction = 1;
    // }

    // Move the div in the specified direction
    animatedDiv.style.top = currentPosition + direction * speed + "px";
}
