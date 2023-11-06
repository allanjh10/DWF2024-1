import { Component } from '@angular/core';
import { Category } from '../../_models/category';
import { FormBuilder, Validators } from '@angular/forms'
import Swal from'sweetalert2'; // sweetalert
import { CategoryService } from '../../_services/category.service';

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


  constructor(
    private formBuilder: FormBuilder, // formulario
    private categoryService: CategoryService// servicio region de API
  ){}


  ngOnInit(){
    this.getCategories(); // Ejecuta el método getCategories al ingresar al componente
  }

  // CRUD category

  // delete
  disableCategory(id: number){
    this.categoryService.disableCategory(id).subscribe(
      res => {
        // muestra mensaje de confirmación
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          toast: true,
          text: 'La categoria ha sido desactivada',
          background: '#E8F8F8',
          showConfirmButton: false,
          timer: 2000
        });
      

        this.getCategories(); // Actualiza la lista de categorías
      },
      err => {
        // muestra mensaje de error
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          toast: true,
          showConfirmButton: false,
          text: err.error.message,
          background: '#F8E8F8',
          timer: 2000
        });
      }
    );
  }

  // enable
  enableCategory(id: number){
    this.categoryService.enableCategory(id).subscribe(
      res => {
        // muestra mensaje de confirmación
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          toast: true,
          text: 'La categoría ha sido activada',
          background: '#E8F8F8',
          showConfirmButton: false,
          timer: 2000
        });

        this.getCategories(); // Actualiza la lista de categorías
      },
      err => {
        // muestra mensaje de error
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          toast: true,
          showConfirmButton: false,
          text: err.error.message,
          background: '#F8E8F8',
          timer: 2000
        });
      }
    );
  }


  getCategories(){
    this.categoryService.getCategories().subscribe(
      res => {
        this.categories = res; // asigna la respuesta de la API a la lista de regiones
      },
      err => {
        // muestra mensaje de error
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          toast: true,
          showConfirmButton: false,
          text: err.error.message,
          background: '#F8E8F8',
          timer: 2000
        });
      }
    );
  }


  onSubmit(){
    // valida el formulario
    this.submitted = true;
    if(this.form.invalid) return;
    this.submitted = false;

    // ejecuta la función crear o actualizar según corresponda
    if(this.categoryUpdate == 0){
      this.onSubmitCreate();
    }else{
      this.onSubmitUpdate();
    }
  }


  onSubmitCreate(){
    // crea la categoría
    this.categoryService.createCategory(this.form.value).subscribe(
      res => {
        // muestra mensaje de confirmación
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          toast: true,
          text: 'L categoría ha sido registrada',
          background: '#E8F8F8',
          showConfirmButton: false,
          timer: 2000
        });

        this.getCategories(); // consulta regiones con los cambios realizados
    
        $("#modalForm").modal("hide"); // oculta el modal de registro
      },
      err => {
        // muestra mensaje de error
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          toast: true,
          showConfirmButton: false,
          text: err.error.message,
          background: '#F8E8F8',
          timer: 2000
        });
      }
    );
  }

  //update 
  onSubmitUpdate(){
    this.categoryService.updateCategory(this.form.value, this.categoryUpdate).subscribe(
      res => {
        // muestra mensaje de confirmación
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          toast: true,
          text: 'La categoría ha sido actualizada',
          background: '#E8F8F8',
          showConfirmButton: false,
          timer: 2000
        });

        this.getCategories(); // consulta categorias 
        $("#modalForm").modal("hide"); // oculta el modal de registro

        this.categoryUpdate = 0; // reinicia la variable de actualización
      },
      err => {
        // muestra mensaje de error
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          toast: true,
          showConfirmButton: false,
          text: err.error.message,
          background: '#F8E8F8',
          timer: 2000
        });
      }
    );
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
