import { cart } from "../../data/cart.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";
import { getProduct, products } from "../../data/products.js";

export function renderPaymentSummary(){
    let productPriceRupees=0;
    let shippingPriceRupees=0;
    cart.forEach((cartItem)=>{
        const product = getProduct(cartItem.productId);
        productPriceRupees += product.priceRupees*cartItem.quantity;

        const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
        shippingPriceRupees += deliveryOption.priceRupees;   
    });

    const totalBeforeTax = productPriceRupees + shippingPriceRupees;
    const taxRupees = (totalBeforeTax * 0.1);
    const productTotalRupees = (totalBeforeTax)+ (taxRupees) ;
    
    const html = 
    `
        <div class="payment-summary-title">
                Order Summary
            </div>

            <div class="payment-summary-row">
                <div>Items (3):</div>
                <div class="payment-summary-money">
                ₹${productPriceRupees}
                </div>
            </div>

            <div class="payment-summary-row">
                <div>Shipping &amp; handling:</div>
                <div class="payment-summary-money">
                ₹${shippingPriceRupees}
                </div>
            </div>

            <div class="payment-summary-row subtotal-row">
                <div>Total before tax:</div>
                <div class="payment-summary-money">
                 ₹${totalBeforeTax}
                </div>
            </div>

            <div class="payment-summary-row">
                <div>Estimated tax (10%):</div>
                <div class="payment-summary-money">
                ₹${taxRupees.toFixed(2)}
                </div>
            </div>

            <div class="payment-summary-row total-row">
                <div>Order total:</div>
                <div class="payment-summary-money">
                ₹${productTotalRupees.toFixed(2)}
                </div>
            </div>

            <button class="place-order-button button-primary">
                Place your order
            </button>

    `;

    document.querySelector('.js-payment-summary').innerHTML = html;
}