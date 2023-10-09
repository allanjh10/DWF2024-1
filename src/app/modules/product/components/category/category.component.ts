import { Component } from '@angular/core';
import { Category } from '../../_models/category';
import { FormBuilder, Validators } from '@angular/forms';

declare var $: any; // Declara la variable $ de JQuery para utilizarla en el componente

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent{
  categories: Category[] = [];

  // Crea un objeto FormGroup que contiene los objetos FormControl
  form = this.formBuilder.group({
    category: ["", [Validators.required]],
    code: ["", [Validators.required]],
  });

  // Variable para saber si algo fue enviado
  submitted = false;


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

  onSubmit(){
    this.submitted = true;

    if(this.form.invalid) return;

    this.submitted = false;

    let category = new Category(0,this.form.controls['code'].value!, this.form.controls['category'].value!, 1);
    this.categories.push(category);
    
    $("#modalForm").modal("hide");

    alert("¡La Categoría ha sido guardada con exito!");
  }

  // modals 

  showModalForm(){
    this.form.reset();
    this.submitted = false;
    $("#modalForm").modal("show");
  }
}
