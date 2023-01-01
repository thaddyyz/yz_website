var educationNUS = document.getElementById("educationDIV1");
var educationNP = document.getElementById("educationDIV2");


educationNUS.style.display = "block";
educationNP.style.display = "none";

function myEducationLeft() {
    if (educationNUS.style.display === "block"&&educationNP.style.display === "none") {
        educationNUS.style.display = "none";
        educationNP.style.display = "block";
    } else if (educationNUS.style.display === "none"&&educationNP.style.display === "block") {
        educationNUS.style.display = "block";
        educationNP.style.display = "none";
    }
}

function myEducationRight() {
    if (educationNUS.style.display === "block"&&educationNP.style.display === "none") {
        educationNUS.style.display = "none";
        educationNP.style.display = "block";
    } else if (educationNUS.style.display === "none"&&educationNP.style.display === "block") {
        educationNUS.style.display = "block";
        educationNP.style.display = "none";
    }
}

var workPE = document.getElementById("workDIV1");
var workSE = document.getElementById("workDIV2");
var workPD = document.getElementById("workDIV3");


workPE.style.display = "block";
workSE.style.display = "none";
workPD.style.display = "none";

function myWorkLeft() {
    if (workPE.style.display === "block"&&workSE.style.display === "none"&&workPD.style.display === "none") {
        workPE.style.display = "none";
        workSE.style.display = "block";
        workPD.style.display = "none";
    } else if (workPE.style.display === "none"&&workSE.style.display === "block"&&workPD.style.display === "none") {
        workPE.style.display = "none";
        workSE.style.display = "none";
        workPD.style.display = "block";
    } else if (workPE.style.display === "none"&&workSE.style.display === "none"&&workPD.style.display === "block") {
        workPE.style.display = "block";
        workSE.style.display = "none";
        workPD.style.display = "none";
    }
}

function myWorkRight() {
    if (workPE.style.display === "block"&&workSE.style.display === "none"&&workPD.style.display === "none") {
        workPE.style.display = "none";
        workSE.style.display = "none";
        workPD.style.display = "block";
    } else if (workPE.style.display === "none"&&workSE.style.display === "none"&&workPD.style.display === "block") {
        workPE.style.display = "none";
        workSE.style.display = "block";
        workPD.style.display = "none";
    } else if (workPE.style.display === "none"&&workSE.style.display === "block"&&workPD.style.display === "none") {
        workPE.style.display = "block";
        workSE.style.display = "none";
        workPD.style.display = "none";
    }
}

var projectCP = document.getElementById("projectDIV1");
var projectFSAE = document.getElementById("projectDIV2");
var projectWC = document.getElementById("projectDIV3");


projectCP.style.display = "block";
projectFSAE.style.display = "none";
projectWC.style.display = "none";

function myProjectLeft() {
    if (projectCP.style.display === "block"&&projectFSAE.style.display === "none"&&projectWC.style.display === "none") {
        projectCP.style.display = "none";
        projectFSAE.style.display = "block";
        projectWC.style.display = "none";
    } else if (projectCP.style.display === "none"&&projectFSAE.style.display === "block"&&projectWC.style.display === "none") {
        projectCP.style.display = "none";
        projectFSAE.style.display = "none";
        projectWC.style.display = "block";
    } else if (projectCP.style.display === "none"&&projectFSAE.style.display === "none"&&projectWC.style.display === "block") {
        projectCP.style.display = "block";
        projectFSAE.style.display = "none";
        projectWC.style.display = "none";
    }
}

function myProjectRight() {
    if (projectCP.style.display === "block"&&projectFSAE.style.display === "none"&&projectWC.style.display === "none") {
        projectCP.style.display = "none";
        projectFSAE.style.display = "none";
        projectWC.style.display = "block";
    } else if (projectCP.style.display === "none"&&projectFSAE.style.display === "none"&&projectWC.style.display === "block") {
        projectCP.style.display = "none";
        projectFSAE.style.display = "block";
        projectWC.style.display = "none";
    } else if (projectCP.style.display === "none"&&projectFSAE.style.display === "block"&&projectWC.style.display === "none") {
        projectCP.style.display = "block";
        projectFSAE.style.display = "none";
        projectWC.style.display = "none";
    }
}

var interestBB = document.getElementById("interestDIV1");
var interestTTA = document.getElementById("interestDIV2");
var interestVVE = document.getElementById("interestDIV3");
var interestMSFF = document.getElementById("interestDIV4");
var interestKOK = document.getElementById("interestDIV5");

interestBB.style.display = "block";
interestTTA.style.display = "none";
interestVVE.style.display = "none";
interestMSFF.style.display = "none";
interestKOK.style.display = "none";

function myInterestLeft() {
    if (interestBB.style.display === "block"&&interestTTA.style.display === "none"&&interestVVE.style.display === "none"&&interestMSFF.style.display === "none"&&interestKOK.style.display === "none") {
        interestBB.style.display = "none";
        interestTTA.style.display = "block";
        interestVVE.style.display = "none";
        interestMSFF.style.display = "none";
        interestKOK.style.display = "none";
    } else if (interestBB.style.display === "none"&&interestTTA.style.display === "block"&&interestVVE.style.display === "none"&&interestMSFF.style.display === "none"&&interestKOK.style.display === "none") {
        interestBB.style.display = "none";
        interestTTA.style.display = "none";
        interestVVE.style.display = "block";
        interestMSFF.style.display = "none";
        interestKOK.style.display = "none";
    } else if (interestBB.style.display === "none"&&interestTTA.style.display === "none"&&interestVVE.style.display === "block"&&interestMSFF.style.display === "none"&&interestKOK.style.display === "none") {
        interestBB.style.display = "none";
        interestTTA.style.display = "none";
        interestVVE.style.display = "none";
        interestMSFF.style.display = "block";
        interestKOK.style.display = "none";
    } else if (interestBB.style.display === "none"&&interestTTA.style.display === "none"&&interestVVE.style.display === "none"&&interestMSFF.style.display === "block"&&interestKOK.style.display === "none") {
        interestBB.style.display = "none";
        interestTTA.style.display = "none";
        interestVVE.style.display = "none";
        interestMSFF.style.display = "none";
        interestKOK.style.display = "block";
    } else if (interestBB.style.display === "none"&&interestTTA.style.display === "none"&&interestVVE.style.display === "none"&&interestMSFF.style.display === "none"&&interestKOK.style.display === "block") {
        interestBB.style.display = "block";
        interestTTA.style.display = "none";
        interestVVE.style.display = "none";
        interestMSFF.style.display = "none";
        interestKOK.style.display = "none";
    }
}

function myInterestRight() {
    if (interestBB.style.display === "block"&&interestTTA.style.display === "none"&&interestVVE.style.display === "none"&&interestMSFF.style.display === "none"&&interestKOK.style.display === "none") {
        interestBB.style.display = "none";
        interestTTA.style.display = "none";
        interestVVE.style.display = "none";
        interestMSFF.style.display = "none";
        interestKOK.style.display = "block";
    } else if (interestBB.style.display === "none"&&interestTTA.style.display === "none"&&interestVVE.style.display === "none"&&interestMSFF.style.display === "none"&&interestKOK.style.display === "block") {
        interestBB.style.display = "none";
        interestTTA.style.display = "none";
        interestVVE.style.display = "none";
        interestMSFF.style.display = "block";
        interestKOK.style.display = "none";
    } else if (interestBB.style.display === "none"&&interestTTA.style.display === "none"&&interestVVE.style.display === "none"&&interestMSFF.style.display === "block"&&interestKOK.style.display === "none") {
        interestBB.style.display = "none";
        interestTTA.style.display = "none";
        interestVVE.style.display = "block";
        interestMSFF.style.display = "none";
        interestKOK.style.display = "none";
    } else if (interestBB.style.display === "none"&&interestTTA.style.display === "none"&&interestVVE.style.display === "block"&&interestMSFF.style.display === "none"&&interestKOK.style.display === "none") {
        interestBB.style.display = "none";
        interestTTA.style.display = "block";
        interestVVE.style.display = "none";
        interestMSFF.style.display = "none";
        interestKOK.style.display = "none";
    } else if (interestBB.style.display === "none"&&interestTTA.style.display === "block"&&interestVVE.style.display === "none"&&interestMSFF.style.display === "none"&&interestKOK.style.display === "none") {
        interestBB.style.display = "block";
        interestTTA.style.display = "none";
        interestVVE.style.display = "none";
        interestMSFF.style.display = "none";
        interestKOK.style.display = "none";
    }
}