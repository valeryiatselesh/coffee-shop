//Burger Menu
const iconMenu = document.querySelector('.header__icon'),
      menuBody = document.querySelector('.header__navigation');

let menuArrows = document.querySelectorAll('.header__links'),
    headerMenu = document.querySelectorAll('.header__menu');

window.addEventListener('resize', burgerMenu());
function burgerMenu() {
   if (iconMenu) {
      iconMenu.addEventListener("click", function () {
         iconMenu.classList.toggle('_active');
         menuBody.classList.toggle('_active');
         document.body.classList.toggle('_lock');
      });
      if (menuArrows.length > 0) {
         for (let index = 0; index < menuArrows.length; index++) {
            const menuArrow = menuArrows[index];
   
            menuArrow.addEventListener('click', function () {
               menuArrow.parentElement.classList.toggle('_active');
               document.body.classList.remove('_lock');
               iconMenu.classList.toggle('_active');
            });
         }
      }
      if (headerMenu.length > 0) {
         for (let index = 0; index < headerMenu.length; index++) {
            const menuArrow = headerMenu[index];
   
            menuArrow.addEventListener('click', function () {
               menuArrow.parentElement.classList.toggle('_active');
               document.body.classList.remove('_lock');
               iconMenu.classList.toggle('_active');
            });
         }
      }
   }
}

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