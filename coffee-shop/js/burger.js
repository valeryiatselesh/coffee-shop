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