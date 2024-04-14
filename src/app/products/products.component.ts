import { Component, OnInit } from '@angular/core';
import { Product } from '../products';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit{

  products: Product[] = [];

  formGroupProduct : FormGroup;
  isEditing: Boolean = false;

  constructor(private formBuilder: FormBuilder, private service: ProductsService){
    this.formGroupProduct = formBuilder.group({
      id: [''],
      name: [''],
      description: [''],
      price: [''],
      amount: ['']
    })
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(){
    this.service.getProducts().subscribe({
      next: (data) => this.products = data
    });
  }

  save(){
    if(this.isEditing){
      this.service.update(this.formGroupProduct.value).subscribe({
        next: () => {
          this.loadProducts();
          this.isEditing = false;
        }
      })
    }
    else{
      this.service.save(this.formGroupProduct.value).subscribe({
        next: data => this.products.push(data)
      });
    }
    this.formGroupProduct.reset();
  }

  edit(product: Product){
    this.formGroupProduct.setValue(product);
    this.isEditing = true;
  }

  delete(product: Product){
    this.service.delete(product).subscribe({
      next: () => this.loadProducts()
    })
  }

}
