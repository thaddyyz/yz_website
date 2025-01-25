let currentSection = 0;
const sections = document.querySelectorAll('.segment-content');
const dots = document.querySelectorAll('.dot');

function showSection(direction) {
    if (direction === 'next') {
        currentSection = (currentSection + 1) % sections.length;
    } else if (direction === 'prev') {
        currentSection = (currentSection - 1 + sections.length) % sections.length;
    }

    updateSections();
}

function showSectionByDot(index) {
    currentSection = index;
    updateSections();
}

function updateSections() {
    sections.forEach((section, index) => {
        if (index === currentSection) {
            section.style.left = '0'; // Show the current section
        } else if (index < currentSection) {
            section.style.left = '-100%'; // Hide sections before the current one
        } else {
            section.style.left = '100%'; // Hide sections after the current one
        }
    });

    updateDots();
}

function updateDots() {
    dots.forEach((dot, index) => {
        dot.classList.remove('active');
        if (index === currentSection) {
            dot.classList.add('active');
        }
    });
}

// Initialize the first section as active
updateSections();

    // Update dot indicator
    // document.querySelectorAll('.dot').forEach((dot, index) => {
    //     if (index + 1 === currentSegment) {
    //         dot.classList.add('active');
    //     } else {
    //         dot.classList.remove('active');
    //     }
    // });
// }

// // Swipe Gesture Functionality
// let touchstartX = 0;
// let touchendX = 0;

// function handleSwipe() {
//     if (touchendX < touchstartX) {
//         myEducationRight(); // Swipe Left (Next)
//     }
//     if (touchendX > touchstartX) {
//         myEducationLeft(); // Swipe Right (Back)
//     }
// }

// document.addEventListener('touchstart', (e) => {
//     touchstartX = e.changedTouches[0].screenX;
// }, false);

// document.addEventListener('touchend', (e) => {
//     touchendX = e.changedTouches[0].screenX;
//     handleSwipe();
// }, false);

// function showSegment(segmentIndex) {
//     currentSegment = segmentIndex;
//     updateSegment();
// }

// // Initialize the first segment and dot
// updateSegment();
