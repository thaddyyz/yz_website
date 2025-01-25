let currentSegment = 1;

function goNext() {
    if (currentSegment < 3) {
        currentSegment++;
        updateSegment();
    }
}

function goBack() {
    if (currentSegment > 1) {
        currentSegment--;
        updateSegment();
    }
}

function updateSegment() {
    document.querySelectorAll('.segment').forEach((segment, index) => {
        if (index + 1 === currentSegment) {
            segment.style.transform = 'translateY(0)';
        } else if (index + 1 < currentSegment) {
            segment.style.transform = 'translateY(-100%)';
        } else {
            segment.style.transform = 'translateY(100%)';
        }
    });

    // Update dot indicator
    document.querySelectorAll('.dot').forEach((dot, index) => {
        if (index + 1 === currentSegment) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

// Swipe Gesture Functionality
let touchstartX = 0;
let touchendX = 0;

function handleSwipe() {
    if (touchendX < touchstartX) {
        goNext(); // Swipe Left (Next)
    }
    if (touchendX > touchstartX) {
        goBack(); // Swipe Right (Back)
    }
}

document.addEventListener('touchstart', (e) => {
    touchstartX = e.changedTouches[0].screenX;
}, false);

document.addEventListener('touchend', (e) => {
    touchendX = e.changedTouches[0].screenX;
    handleSwipe();
}, false);

function showSegment(segmentIndex) {
    currentSegment = segmentIndex;
    updateSegment();
}

// Initialize the first segment and dot
updateSegment();
