import { addToCart, cart , loadFromStorage } from "../../scripts/data/cart.js";

describe('test suite: addToCart',()=>{
    // it('adds an existing product to the cart',()=>{

    // });

    it('adds a new product to the cart',()=>{

        spyOn(localStorage,'setItem');
        spyOn(localStorage,'getItem').and.callFake(()=>{
            return JSON.stringify([]);
        });
        loadFromStorage();

        
    });
})