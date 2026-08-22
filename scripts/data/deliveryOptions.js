export const deliveryOptions = [{
    id : '1',
    deliveryTime : 10,
    priceRupees : 0
},{
    id : '2',
    deliveryTime : 5,
    priceRupees : 199
},{
    id : '3',
    deliveryTime : 3,
    priceRupees : 249
}];


export function getDeliveryOption(deliveryOptionId){
    let deliveryOption;
    deliveryOptions.forEach((option)=>{
        if(option.id===deliveryOptionId){
        deliveryOption=option;
        }
    });
    return deliveryOption|| deliveryOptions[0];
}