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
    const numberOfFloors = urlParams.get('numberOfFloors')
    const numberOfLifts = urlParams.get('numberOfLifts')

    console.log('Number of Floors:', numberOfFloors);
    console.log('Number of Lifts:', numberOfLifts);

}
