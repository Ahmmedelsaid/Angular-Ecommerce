import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllProductsComponent } from './products/all-products/all-products.component';
import { ProductsDetailsComponent } from './products/products-details/products-details.component';
import { LoginComponent } from './Auth/login/login.component';
import { RegisterComponent } from './Auth/register/register.component';
import { CartComponent } from './cart/cart/cart.component';

const routes: Routes = [
  { path: 'Products', component: AllProductsComponent },
  { path: 'Product-Details/:id', component: ProductsDetailsComponent },
  { path: 'Login', component: LoginComponent },
  { path: 'Register', component: RegisterComponent },
  { path: 'Cart', component: CartComponent },
  { path: '**', redirectTo: 'Products', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
