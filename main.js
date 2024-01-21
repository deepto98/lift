function fetchLiftConfiguration() {
    // Get values from user inputs
    var numberOfFloors = document.getElementById('floors').value;
    var numberOfLifts = document.getElementById('lifts').value;

    console.log('Number of Floors:', numberOfFloors);
    console.log('Number of Lifts:', numberOfLifts);

    var url = 'lifts.html?numberOfFloors=' + encodeURIComponent(numberOfFloors) + '&numberOfLifts=' + encodeURIComponent(numberOfLifts);

    window.location.href = url;
}

function createLifts() {
    // Get values from url params
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const numFloors = urlParams.get('numberOfFloors')
    const numLifts = urlParams.get('numberOfLifts')


    var liftSystemContainer = document.getElementById('liftSystemContainer');
    liftSystemContainer.innerHTML = ''; // Clear previous content

    for (var floor = numFloors; floor >= 1 ; floor--) {
        var floorDiv = document.createElement('div');
        floorDiv.classList.add('floor');

        var buttonContainer = document.createElement('div');
        buttonContainer.classList.add('button-container');

        var upButton = document.createElement('button');
        upButton.classList.add('up-button');
        upButton.textContent = 'Up';

        var separator = document.createElement('div');
        separator.classList.add('separator');

        var downButton = document.createElement('button');
        downButton.classList.add('down-button');
        downButton.textContent = 'Down';

        var blackLine = document.createElement('div');
        blackLine.classList.add('black-line');

        buttonContainer.appendChild(upButton);
        // buttonContainer.appendChild(separator);
        buttonContainer.appendChild(downButton);

        var floorLabel = document.createElement('div');
        floorLabel.classList.add('floor-label');
        floorLabel.textContent = 'Floor ' + floor;

        floorDiv.appendChild(buttonContainer);
        floorDiv.appendChild(blackLine);
        floorDiv.appendChild(floorLabel);

        liftSystemContainer.appendChild(floorDiv);
    }

    console.log('Number of Floors:', numberOfFloors);
    console.log('Number of Lifts:', numberOfLifts);

}
