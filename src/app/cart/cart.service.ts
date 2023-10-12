import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems: any[] = [];

  addtoCart(product: any) {
    this.cartItems.push(product);
  }
  getCartItems() {
    return this.cartItems;
  }
  clearCartItems() {
    this.cartItems = [];
  }
}
