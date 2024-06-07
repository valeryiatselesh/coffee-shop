window.addEventListener('DOMContentLoaded', function () {
   // Product cards
   fetch('products.json')
      .then(data => data.json())
      .then(res => createCard(res));

   function createCard(res) {
      const dialog = document.querySelector(".modal__dialog");
      res.forEach(({ img, alt, name, description, price, category, size }) => {
         const element = document.createElement('div');

         element.classList.add("menu__item");

         element.innerHTML = `
                  <div class="menu__image">
                     <img src=${img} alt=${alt}>
                  </div>
                  <div class="menu__text">
                     <div class="menu__name heading__3">${name}</div>
                     <div class="menu__info">
                        <div class="menu__description body__medium">${description}</div>
                        <div class="menu__price heading__3">$${price}</div>
                     </div>
                  </div>
                 `;
         if (category == "coffee") {
            element.classList.add("menu__item-coffee");
            document.querySelector(".menu__items-coffee").append(element);
         } else if (category == "tea") {
            element.classList.add("menu__item-tea");
            document.querySelector(".menu__items-tea").append(element);
         } else if (category == "dessert") {
            element.classList.add("menu__item-dessert");
            document.querySelector(".menu__items-dessert").append(element);
         }

      });
      const menuItem = document.querySelectorAll('.menu__item');
      menuItem.forEach(item =>
         item.addEventListener('click', e => {
            let data = e.currentTarget;
            let nameCoffee = data.children[1].children[0].innerText;
            res.forEach(({ img, alt, name, description, price, ...other }) => {
               const modalEl = document.createElement('div');
               let totalPrice = price;
               modalEl.classList.add("modal__content");
               modalEl.innerHTML = `
                  <div class="modal__img"><img src=${img} alt=${alt}></div>
                  <div class="modal__info">
                     <div class="modal__title">
                        <div class="modal__name heading__3">${name}</div>
                        <div class="modal__desr body__medium">${description}</div>
                     </div>
                     <div class="modal__size body__medium">
                        <div class="size__title">Size</div>
                        <div class="size__options">
                           <div class="size__option size__option-active" data-size=${other['sizes']['s']['add-price']}>
                              <span class="size__sign">S</span>
                              <span class="size__ml">${other['sizes']['s']['size']}</span>
                           </div>
                           <div class="size__option" data-size=${other['sizes']['m']['add-price']}>
                              <span class="size__sign">M</span>
                              <span class="size__ml">${other['sizes']['m']['size']}</span>
                           </div>
                           <div class="size__option" data-size=${other['sizes']['l']['add-price']}>
                              <span class="size__sign">L</span>
                              <span class="size__ml">${other['sizes']['l']['size']}</span>
                           </div>   
                        </div>
                     </div>
                     <div class="modal__add body__medium">
                        <div class="add__title">Additives</div>
                        <div class="add__options">
                           <div class="add__option" data-add=${other['additives'][0]['add-price']}>
                              <span class="add__sign">1</span>
                              <span class="add__descr">${other['additives'][0]['name']}</span>
                           </div>
                           <div class="add__option" data-add=${other['additives'][1]['add-price']}>
                              <span class="add__sign">2</span>
                              <span class="add__descr">${other['additives'][1]['name']}</span>
                           </div>
                           <div class="add__option" data-add=${other['additives'][2]['add-price']}>
                              <span class="add__sign">3</span>
                              <span class="add__descr">${other['additives'][2]['name']}</span>
                           </div>
                        </div>
                     </div>
                     <div class="modal__total heading__3">
                        <div class="total__title">Total:</div>
                        <div class="total__result">$${totalPrice}</div>
                     </div>
                     <div class="modal__alert body__caption">
                        The cost is not final. Download our mobile app to see the final price and place your order. Earn loyalty points and enjoy your favorite coffee with up to 20% discount.
                     </div>
                     <div class="modal__btn modal__close"><a class="action__link-button" href="#">Close</a></div>
                  </div>
                    `;
               if (name == nameCoffee) {
                  dialog.insertAdjacentElement("afterbegin", modalEl);
                  updatePrice()
               }
               const modal = document.querySelector('.modal'),
                  modalCloseBtn = document.querySelectorAll('.modal__close');

               openModal();
               function updatePrice() {
                  let newPrice = totalPrice;
                  const optionSize = document.querySelectorAll('.size__option');
                  let result = document.querySelector('.total__result');

                  const sizeOption = document.querySelectorAll('.size__option');
                  sizeOption.forEach(btn => {
                     btn.addEventListener('click', function () {
                        const sizeOptionActive = document.querySelector('.size__option-active');
                        if (sizeOptionActive) {
                           sizeOptionActive.classList.remove('size__option-active')
                        }
                        btn.classList.toggle('size__option-active')
                     })
                  })
                  const addOption = document.querySelectorAll('.add__option');
                  addOption.forEach(btn => {
                     btn.addEventListener('click', function () {
                        btn.classList.toggle('add__option-active')
                     })
                  })
                  let elms = document.querySelectorAll('.add__option-active');
                  optionSize.forEach(size => {
                     size.addEventListener('click', function (e) {
                        let dataOption = e.currentTarget;
                        let newDataOption = +dataOption.dataset.size;

                        result.innerHTML = '$' + (newDataOption + +newPrice + (0, 5 * elms.length)).toFixed(2);
                     })
                  })
               }

               function closeModal() {
                  modal.classList.add('hide__modal');
                  modal.classList.remove('show__modal');
                  document.body.style.overflow = '';
                  modalEl.remove();
               }
               function openModal() {
                  modal.classList.add('show__modal');
                  modal.classList.remove('hide__modal');
                  document.body.style.overflow = 'hidden';
               }

               modalCloseBtn.forEach(btn => {
                  btn.addEventListener('click', closeModal);
               });
               modal.addEventListener('click', (e) => {
                  if (e.target === modal) {
                     closeModal();
                  }
               });
            })

         })
      )
   }

   //Refresh
   window.onload = function () {
      let itemCoffee = document.getElementsByClassName('menu__item-coffee'),
         btnRefreshCoffee = document.querySelector('.menu__refresh-coffee'),
         itemDessert = document.getElementsByClassName('menu__item-dessert'),
         btnRefreshDessert = document.querySelector('.menu__refresh-dessert');

      let countC = 4;
      function addCoffee() {
         countC += 4;
         if (countC <= itemCoffee.length) {
            for (let i = 0; i < countC; i++) {
               itemCoffee[i].style.display = "flex";
            }
         }
         btnRefreshCoffee.style.display = 'none'
      }
      btnRefreshCoffee.addEventListener("click", addCoffee);
      let countD = 4;
      function addDessert() {
         countD += 4;
         if (countD <= itemDessert.length) {
            for (let i = 0; i < countD; i++) {
               itemDessert[i].style.display = "flex";
            }
         }
         btnRefreshDessert.style.display = 'none'
      }
      btnRefreshDessert.addEventListener("click", addDessert)
   }

   const tabsButtons = document.querySelectorAll('.menu__tab');

   tabsButtons.forEach(btn => {
      btn.addEventListener('click', () => {
         const prevActiveItem = document.querySelector('.menu__items-container._active');
         const prevActiveButton = document.querySelector('.menu__tab-active');


         if (prevActiveButton) {
            prevActiveButton.classList.remove('menu__tab-active');
         }

         if (prevActiveItem) {
            prevActiveItem.classList.remove('_active');
         }

         const nextActiveItemId = `#${btn.getAttribute('data-tab')}`;
         const nextActiveItem = document.querySelector(nextActiveItemId);

         btn.classList.add('menu__tab-active');
         nextActiveItem.classList.add('_active');
      });
   })
});