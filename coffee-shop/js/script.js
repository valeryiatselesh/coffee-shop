//Slider
let slides = document.querySelectorAll('.slider__item'),
    slidesLine = document.querySelector('.slider__items'),
    slidesPag = document.querySelectorAll('.slider__control'),
    prevButton = document.querySelector('.slider__arrow-prev'),
    nextButton = document.querySelector('.slider__arrow-next'),
    pagLine = document.querySelectorAll('.slider__control-line');

let sliderCount = 0,
    sliderWidth;

window.addEventListener('resize', showSlide);
function showSlide() {
   sliderWidth = document.querySelector('.slider__wrapper').offsetWidth;
   slidesLine.style.width = sliderWidth * slides.length + 'px';
   slides.forEach(item => item.style.width = sliderWidth + 'px');

   rollSlider();
}
showSlide();
function nextSlide() {
   sliderCount++;
   if (sliderCount >= slides.length) {
      sliderCount = 0;
   }
   rollSlider();
   thisSlide(sliderCount);
}
function prevSlide() {
   sliderCount--;
   if (sliderCount < 0) {
      sliderCount = slides.length - 1;
   }
   rollSlider();
   thisSlide(sliderCount);
}
function rollSlider() {
   slidesLine.style.transform = `translateX(${-sliderCount * sliderWidth}px)`;
}
function thisSlide(index) {
   slidesPag.forEach(item => item.classList.remove('slider__control-active'));
   slidesPag[index].classList.add('slider__control-active');
}
const animationEnd = () => {
   nextSlide(sliderCount);
};
slidesPag.forEach((item) => {
   item.addEventListener("animationend", animationEnd);
});
prevButton.addEventListener('click', prevSlide);
nextButton.addEventListener('click', nextSlide);

//Hover Animation Pause
function pauseAnimation() {
   let pagLineActive = pagLine[sliderCount];
   pagLineActive.style.animationPlayState = 'paused';
}
function startAnimation() {
   let pagLineActive = pagLine[sliderCount];
   pagLineActive.style.animationPlayState = 'running';
}
slides.forEach((item) => {
   item.addEventListener('touchstart', pauseAnimation);
   item.addEventListener('touchend', startAnimation);
});
slides.forEach((item) => {
   item.addEventListener('mouseover', pauseAnimation);
   item.addEventListener('mouseout', startAnimation);
});

// Slider Touch

let x1 = null,
    y2 = null;

function handleTouchStart(event) {
   const firstTouch = event.touches[0];
   x1 = firstTouch.clientX;
   y1 = firstTouch.clientY;
}
function handleTouchMove(event) {
   if (!x1 || !y1) {
      return false;
   }
   let x2 = event.touches[0].clientX,
      y2 = event.touches[0].clientY;

   let xRes = x2 - x1,
      yRes = y1 - y2;

   if (Math.abs(xRes) > Math.abs(yRes)) {
      if (xRes > 0) prevSlide();
      else nextSlide()
   }
   x1 = null;
   y1 = null;
}
slides.forEach((slide) => {
   slide.addEventListener('touchstart', handleTouchStart, false);
   slide.addEventListener('touchmove', handleTouchMove, false);
})