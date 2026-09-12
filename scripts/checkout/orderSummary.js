import { cart , removeFromCart,updateCartQuantity,updateQuantity,updateDeliveryOption } from "../data/cart.js";
import { getProduct, products } from "../data/products.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
import { deliveryOptions ,getDeliveryOption} from "../data/deliveryOptions.js";
import { renderPaymentSummary } from "./paymentSummary.js";

export function renderOrderSummary(){

    let cartSummaryHTML='';

    cart.forEach((cartItem)=>{

        const productId=cartItem.productId;
        const matchingItem=getProduct(productId);


        const deliveryOptionId = cartItem.deliveryOptionId;

        const deliveryOption=getDeliveryOption(deliveryOptionId);

        const today = dayjs();
          const deliveryDate = today.add(deliveryOption.deliveryTime,'days');
          const dateString = deliveryDate.format('dddd, MMMM D'); 

        cartSummaryHTML+=`
        <div class="cart-item-container js-cart-item-container-${matchingItem.id}">
                <div class="delivery-date">
                  Delivery date: ${dateString}
                </div>

                <div class="cart-item-details-grid">
                  <img class="product-image"
                    src="${matchingItem.image}">

                  <div class="cart-item-details">
                    <div class="product-name">
                      ${matchingItem.name}
                    </div>
                    <div class="product-price">
                      ₹${matchingItem.getPrice()}
                    </div>
                    <div class="product-quantity">
                      <span>
                        Quantity: <span class="quantity-label js-quantity-label-${matchingItem.id}">${cartItem.quantity}</span>
                      </span>
                      <span class="update-quantity-link link-primary js-update-quantity-link" data-product-id="${matchingItem.id}">
                        Update
                      </span>
                      <input class="quantity-input js-quantity-input-${matchingItem.id}">
                      <span class="save-quantity-link link-primary js-save-link" data-product-id="${matchingItem.id}">Save</span>

                      <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingItem.id}">
                        Delete
                      </span>
                    </div>
                  </div>

                  <div class="delivery-options">
                    ${deliveryOptionsHTML(matchingItem,cartItem)}
                  </div>
                </div>
              </div>
            `;
    });

    function deliveryOptionsHTML(matchingItem,cartItem){
      let html= '';

      deliveryOptions.forEach((deliveryOption)=>{
          const today = dayjs();
          const deliveryDate = today.add(deliveryOption.deliveryTime,'days');
          const dateString = deliveryDate.format('dddd, MMMM D');  
        
          const priceString = deliveryOption.priceRupees === 0 ? 'FREE' : `₹${deliveryOption.priceRupees} -`;
            
          const ischecked = deliveryOption.id === cartItem.deliveryOptionId;

              html+= `
                    <div class="delivery-option js-delivery-option"
                    data-product-id="${matchingItem.id}"
                    data-delivery-option-id="${deliveryOption.id}">
                      <input type="radio" ${ischecked ? 'checked' : ''}
                        class="delivery-option-input"
                        name="delivery-option-${matchingItem.id}">
                      <div>
                        <div class="delivery-option-date">
                          ${dateString}
                        </div>
                        <div class="delivery-option-price">
                          ${priceString} Shipping
                        </div>
                      </div>
                    </div>
    `
            });

      return html;
    }

    document.querySelector('.js-order-summary').innerHTML=cartSummaryHTML;

    document.querySelectorAll('.js-delete-link').forEach((link)=>{
      link.addEventListener('click',()=>{
        const productId = link.dataset.productId;
        removeFromCart(productId); 

        renderOrderSummary();
        renderPaymentSummary();

        const cartQuantity = updateCartQuantity();

      document.querySelector('.js-return-to-home-link')
      .innerHTML = `${cartQuantity} items`;
      });
    });

    const cartQuantity = updateCartQuantity();

    document.querySelector('.js-return-to-home-link')
      .innerHTML = `${cartQuantity} items`;

      document.querySelectorAll('.js-update-quantity-link').forEach((link)=>{
        link.addEventListener('click',()=>{
          const productId = link.dataset.productId;
          
          const container = document.querySelector(`.js-cart-item-container-${productId}`);
          container.classList.add('is-editing-quantity');
        });
      });

      document.querySelectorAll('.js-save-link').forEach((link)=>{
        link.addEventListener('click',()=>{
          const productId = link.dataset.productId;
          const container = document.querySelector(`.js-cart-item-container-${productId}`);
          container.classList.remove('is-editing-quantity');

          const quantityInput = document.querySelector(`.js-quantity-input-${productId}`);

          const newQuantity = Number(quantityInput.value);

          updateQuantity(productId,newQuantity);

          const quantityLabel = document.querySelector(`.js-quantity-label-${productId}`);

          quantityLabel.innerHTML = newQuantity;

        document.querySelector('.js-return-to-home-link')
      .innerHTML = `${updateCartQuantity()} items`;

       renderPaymentSummary();
        });
      });

      document.querySelectorAll('.js-delivery-option').forEach((element)=>{
          element.addEventListener('click',()=>{
            const {productId,deliveryOptionId}=element.dataset;
            updateDeliveryOption(productId,deliveryOptionId);
            renderOrderSummary();
            renderPaymentSummary();
          });
      });

}

renderOrderSummary();