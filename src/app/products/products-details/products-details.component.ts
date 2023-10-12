import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-products-details',
  templateUrl: './products-details.component.html',
  styleUrls: ['./products-details.component.css'],
})
export class ProductsDetailsComponent implements OnInit {
  id: any;
  data: any = {};
  constructor(
    private actRoute: ActivatedRoute,
    private prodService: ProductsService
  ) {
    this.id = this.actRoute.snapshot.paramMap.get('id');
  }
  ngOnInit(): void {
    this.productdetails();
  }
  productdetails() {
    this.prodService.getSingleproduct(this.id).subscribe((res) => {
      this.data = res;
    });
  }
}
