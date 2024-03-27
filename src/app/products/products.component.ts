import { Component } from '@angular/core';
import { Product } from '../products';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {

  products: Product[] = [
    {
      id: 1,
      name: "Teste",
      description: "teste",
      price: 5,
      amount: 3
    },
    {
      id: 2,
      name: "Arroz",
      description: "Branco",
      price: 26,
      amount: 8
    }
  ];

  formGroupProduct : FormGroup;

  constructor(private formBuilder: FormBuilder){
    this.formGroupProduct = formBuilder.group({
      id: [''],
      name: [''],
      description: [''],
      price: [''],
      amount: ['']
    })
  }

  save(){
    this.products.push(this.formGroupProduct.value);
  }

}
