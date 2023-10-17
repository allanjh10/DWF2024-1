import { Component } from '@angular/core';
import { Category } from '../../_models/category';
import { FormBuilder, Validators } from '@angular/forms'


declare var $: any; // Declara la variable $ de JQuery para utilizarla en el componente

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent{
  categories: Category[] = [];
  categoryUpdate: number = 0; // Variable para saber si se está actualizando una categoría

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

  // CRUD category

  // delete
  disableCategory(id: number){
    for(let category of this.categories){
      if(category.category_id == id){
        category.status = 0;
        alert("category deleted successfully!");
        break;
      }
    }
    console.log("EXIT")
  }

  // update
  enableCategory(id: number){
    for(let category of this.categories){
      if(category.category_id == id){
        category.status = 1;
        alert("Category actuvated successfully!");
        break;
      }
    }
  }

  getCategories(){
    // Crea 3 objetos Category y son agregados al arreglo categories
    const category1 = new Category(1, '012AF89', 'AIR FORCE 1', 1);
    const category2 = new Category(2, '074BL78', 'BLAZER', 0);
    const category3 = new Category(3, '083JD35', 'JORDAN', 1);

    this.categories.push(category1, category2, category3);
  }


  onSubmit(){
    if(this.categoryUpdate == 0){
      this.onSubmitCreate();
    }else{
      this.onSubmitUpdate();
    }
  }

  //create 
  onSubmitCreate(){
    this.submitted = true;

    if(this.form.invalid) return;

    this.submitted = false;

    let category = new Category(0,this.form.controls['code'].value!, this.form.controls['category'].value!, 1);
    console.log(this.form.value);
    this.categories.push(category);
    
    $("#modalForm").modal("hide");

    //cambiar a ingles
    alert("Categoria guardada exitosamente!");

  }

  //update 
  onSubmitUpdate(){

    this.submitted = true;

    if(this.form.invalid) return;

    this.submitted = false;

    for(let category of this.categories){
      if(category.category_id == this.categoryUpdate){
        category.category = this.form.controls['category'].value!;
        category.code = this.form.controls['code'].value!;
        break;
      }
    }
    
    $("#modalForm").modal("hide");

    // cambiar a ingles
    alert("Categoría actualizada exitosamente!");

    this.categoryUpdate = 0;

  }


  updateCategory(category: Category){
    this.categoryUpdate = category.category_id;
    
    this.form.reset();
    this.form.controls['category'].setValue(category.category);
    this.form.controls['code'].setValue(category.code);
    
    this.submitted = false;
    $("#modalForm").modal("show");
  }

  // modals 

  showModalForm(){
    this.form.reset();
    this.categoryUpdate = 0;
    this.submitted = false;
    $("#modalForm").modal("show");
  }
}
