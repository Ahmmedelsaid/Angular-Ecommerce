import { Component, EventEmitter, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { CartService } from '../../cart/cart.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css'],
})
export class AllProductsComponent implements OnInit {
  products: any[] = [];
  categories: any[] = [];
  isFetching = false;

  constructor(
    private prodService: ProductsService,
    private cartService: CartService
  ) {}
  ngOnInit(): void {
    this.FetchProducts();
    this.FetchCategories();
  }
  FetchProducts() {
    this.isFetching = true;
    this.prodService.getAllProducts().subscribe((resp: any) => {
      this.products = resp;
      console.log(resp);
      this.isFetching = false;
    });
  }
  FetchCategories() {
    this.prodService.getGategories().subscribe((res: any) => {
      this.categories = res;
    });
  }
  filterCate(event: any) {
    let value = event.target.value;
    console.log(value);
    this.isFetching = true;
    if (value == 'All') {
      this.FetchProducts();
    } else {
      this.prodService.getProdByCategories(value).subscribe((res: any) => {
        this.products = res;
        this.isFetching = false;
      });
    }
  }
  addtoCart(product: any) {
    this.cartService.addtoCart(product);
  }
  singleProduct(id: number) {
    let prod = this.prodService.getSingleproduct(id);
    console.log(prod);
  }
}
