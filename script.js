var workDay = [
    {
        id: "0",
        hour: "09",
        time: "09",
        meridiem: "am",
        userInput: ""
    },
    {
        id: "1",
        hour: "10",
        time: "10",
        meridiem: "am",
        userInput: ""
    },
    {
        id: "2",
        hour: "11",
        time: "11",
        meridiem: "am",
        userInput: ""
    },
    {
        id: "3",
        hour: "12",
        time: "12",
        meridiem: "pm",
        userInput: ""
    },
    {
        id: "4",
        hour: "01",
        time: "13",
        meridiem: "pm",
        userInput: ""
    },
    {
        id: "5",
        hour: "02",
        time: "14",
        meridiem: "pm",
        userInput: ""
    },
    {
        id: "6",
        hour: "03",
        time: "15",
        meridiem: "pm",
        userInput: ""
    },
    {
        id: "7",
        hour: "04",
        time: "16",
        meridiem: "pm",
        userInput: ""
    },
    {
        id: "8",
        hour: "05",
        time: "17",
        meridiem: "pm",
        userInput: ""
    }
]

var now = moment().format("dddd, MMM Do YYYY");
    $("#currentDay").text(now);

function saveUserInput() {
    localStorage.setItem("workDay", JSON.stringify(workDay));
}

function showUserInput() {
    workDay.forEach(function(_currentHour) {
        $(`#${_currentHour.id}`).val(_currentHour.userInput);
    })
}

function init() {
    var savedPlans = JSON.parse(localStorage.getItem("workDay"));
    if (savedPlans) {
        workDay = savedPlans;

        saveUserInput();
        showUserInput();
    }
}

workDay.forEach(function(currentHour) {
    var hourRow = $("<form>").attr({"class": "row"});
    $(".container").append(hourRow);

    var hourColumn = $("<div>").text(`${currentHour.hour}${currentHour.meridiem}`).attr({"class": "col-md-2 hour"});
    var hourSetup = $("<div>").attr({"class": "col-md-9 description p-0"});
    var plannerData = $("<textArea>");

    hourSetup.append(plannerData);

    plannerData.attr("id", currentHour.id);
    if (currentHour.time < moment().format("HH")) {
        plannerData.attr({"class": "past"})
    } else if (currentHour.time === moment().format("HH")) {
        plannerData.attr({"class": "present"})
    } else if (currentHour.time > moment().format("HH")) {
        plannerData.attr({"class": "future"})
    }

    var saveBtn = $("<i class='fas fa-save fa-lg raise'></i>")
    var saveInput = $("<button>").attr({"class": "col-md-1 saveBtn"});

    saveInput.append(saveBtn);
    hourRow.append(hourColumn, hourSetup, saveInput);
})

$(".saveBtn").on("click", function(event) {
    event.preventDefault();
    var index = $(this).siblings(".description").children(".future").attr("id");
    workDay[index].userInput = $(this).siblings(".description").children(".future").val();

    saveUserInput();
    showUserInput();
})

init();