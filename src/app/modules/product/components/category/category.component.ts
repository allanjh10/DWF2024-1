import { Component } from '@angular/core';
import { Category } from '../../_models/category';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent{
  categories: Category[] = [];

  constructor(private formBuilder: FormBuilder,){ }

  ngOnInit(){
    this.getCategories(); // Ejecuta el método getCategories al ingresar al componente
  }

  getCategories(){
    // Crea 3 objetos Category y son agregados al arreglo categories
    const category1 = new Category(1, '012AF89', 'AIR FORCE 1', 1);
    const category2 = new Category(2, '074BL78', 'BLAZER', 0);
    const category3 = new Category(3, '083JD35', 'JORDAN', 1);

    this.categories.push(category1, category2, category3);
  }
}
