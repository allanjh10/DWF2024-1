import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'chatosproject';

  ngOnInit() {
    localStorage.setItem("user_rfc", "SAAI920101A01"); // almacenar un valor en localstorage

    let user_rfc = localStorage.getItem("user_rfc"); // recuperar un valor de localstorage
    console.log(user_rfc); 

  }
}