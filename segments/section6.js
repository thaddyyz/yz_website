// Section 2 - Toggle Views
const section6ViewContainer = document.querySelector('.section-6 .toggle-view-container');
const section6Dots = document.querySelectorAll('.section-6 .dot');
const section6PrevButton = document.querySelector('.section-6 .prev');
const section6NextButton = document.querySelector('.section-6 .next');
let section6CurrentIndex = 0;

function updateSection6View(index) {
  section6ViewContainer.style.transform = `translateX(-${index * 100}%)`;
  section6Dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
}

section6Dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    section6CurrentIndex = index;
    updateSection6View(section6CurrentIndex);
  });
});

section6PrevButton.addEventListener('click', () => {
  section6CurrentIndex = (section6CurrentIndex - 1 + section6Dots.length) % section6Dots.length;
  updateSection6View(section6CurrentIndex);
});

section6NextButton.addEventListener('click', () => {
  section6CurrentIndex = (section6CurrentIndex + 1) % section6Dots.length;
  updateSection6View(section6CurrentIndex);
});

// Mobile Gestures for Section 2
let section6TouchStartX = 0;
let section6TtouchEndX = 0;

section6ViewContainer.addEventListener('touchstart', (e) => {
  section6TouchStartX = e.touches[0].clientX;
});

section6ViewContainer.addEventListener('touchend', (e) => {
  section6TouchEndX = e.changedTouches[0].clientX;
  handleSection6Swipe();
});

function handleSection6Swipe() {
  if (section6TouchEndX < section6TouchStartX) {
    section6CurrentIndex = (section6CurrentIndex + 1) % section6Dots.length;
  } else if (section6TouchEndX > section6TouchStartX) {
    section6CurrentIndex = (section6CurrentIndex - 1 + section6Dots.length) % section6Dots.length;
  }
  updateSection6View(section6CurrentIndex);
}
