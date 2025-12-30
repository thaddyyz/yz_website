// Section 2 - Toggle Views
const viewContainer = document.querySelector('.section-2 .toggle-view-container');
const dots = document.querySelectorAll('.section-2 .dot');
const prevButton = document.querySelector('.section-2 .prev');
const nextButton = document.querySelector('.section-2 .next');
let currentIndex = 0;

function updateView(index) {
  viewContainer.style.transform = `translateX(-${index * 100}%)`;
  dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
}

dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    currentIndex = index;
    updateView(currentIndex);
  });
});

prevButton.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + dots.length) % dots.length;
  updateView(currentIndex);
});

nextButton.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % dots.length;
  updateView(currentIndex);
});

// Mobile Gestures for Section 2
let touchStartX = 0;
let touchEndX = 0;

viewContainer.addEventListener('touchstart', (e) => {
  touchStartX = e.touches[0].clientX;
});

viewContainer.addEventListener('touchend', (e) => {
  touchEndX = e.changedTouches[0].clientX;
  handleSwipe();
});

function handleSwipe() {
  if (touchEndX < touchStartX) {
    currentIndex = (currentIndex + 1) % dots.length;
  } else if (touchEndX > touchStartX) {
    currentIndex = (currentIndex - 1 + dots.length) % dots.length;
  }
  updateView(currentIndex);
}
