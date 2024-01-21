function fetchLiftConfiguration() {
    // Get values from user inputs
    var numberOfFloors = document.getElementById('floors').value;
    var numberOfLifts = document.getElementById('lifts').value;

    console.log('Number of Floors:', numberOfFloors);
    console.log('Number of Lifts:', numberOfLifts);

    var url = 'lifts.html?numberOfFloors=' + encodeURIComponent(numberOfFloors) + '&numberOfLifts=' + encodeURIComponent(numberOfLifts);

    window.location.href = url;
}