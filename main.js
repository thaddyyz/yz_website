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
// function myFunction1() {
//     if (x.style.display === "block"&&y.style.display === "none"&&z.style.display === "none") {
//         x.style.display = "none";
//         y.style.display = "block";
//         z.style.display = "none";
//     } else if (x.style.display === "none"&&y.style.display === "block"&&z.style.display === "none") {
//         x.style.display = "none";
//         y.style.display = "none";
//         z.style.display = "block";
//     } else if (x.style.display === "none"&&y.style.display === "none"&&z.style.display === "block") {
//         x.style.display = "block";
//         y.style.display = "none";
//         z.style.display = "none";
//     }
// }

// function myFunction2() {
//     if (x.style.display === "block"&&y.style.display === "none"&&z.style.display === "none") {
//         x.style.display = "none";
//         y.style.display = "none";
//         z.style.display = "block";
//     } else if (x.style.display === "none"&&y.style.display === "none"&&z.style.display === "block") {
//         x.style.display = "none";
//         y.style.display = "block";
//         z.style.display = "none";
//     } else if (x.style.display === "none"&&y.style.display === "block"&&z.style.display === "none") {
//         x.style.display = "block";
//         y.style.display = "none";
//         z.style.display = "none";
//     }
// }