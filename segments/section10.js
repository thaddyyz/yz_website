// Section 2 - Toggle Views
const section10ViewContainer = document.querySelector('.section-10 .toggle-view-container');
const section10Dots = document.querySelectorAll('.section-10 .dot');
const section10PrevButton = document.querySelector('.section-10 .prev');
const section10NextButton = document.querySelector('.section-10 .next');
let section10CurrentIndex = 0;

function updateSection10View(index) {
  section10ViewContainer.style.transform = `translateX(-${index * 100}%)`;
  section10Dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
}

section10Dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    section10CurrentIndex = index;
    updateSection10View(section10CurrentIndex);
  });
});

section10PrevButton.addEventListener('click', () => {
  section10CurrentIndex = (section10CurrentIndex - 1 + section10Dots.length) % section10Dots.length;
  updateSection10View(section10CurrentIndex);
});

section10NextButton.addEventListener('click', () => {
  section10CurrentIndex = (section10CurrentIndex + 1) % section10Dots.length;
  updateSection10View(section10CurrentIndex);
});

// Mobile Gestures for Section 2
let section10TouchStartX = 0;
let section10TtouchEndX = 0;

section10ViewContainer.addEventListener('touchstart', (e) => {
  section10TouchStartX = e.touches[0].clientX;
});

section10ViewContainer.addEventListener('touchend', (e) => {
  section10TouchEndX = e.changedTouches[0].clientX;
  handleSection10Swipe();
});

function handleSection10Swipe() {
  if (section10TouchEndX < section10TouchStartX) {
    section10CurrentIndex = (section10CurrentIndex + 1) % section10Dots.length;
  } else if (section10TouchEndX > section10TouchStartX) {
    section10CurrentIndex = (section10CurrentIndex - 1 + section10Dots.length) % section10Dots.length;
  }
  updateSection10View(section10CurrentIndex);
}
