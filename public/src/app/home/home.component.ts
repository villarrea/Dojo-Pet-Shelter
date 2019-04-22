import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  pets = [];
  constructor(
    private _httpService: HttpService,
  ) { }

  ngOnInit() {
    this.getAllPetsFromService();
  }

  getAllPetsFromService(){
    let tempObservable = this._httpService.getAllPets();
    tempObservable.subscribe(data => {
      console.log(data)
      this.pets = data['pets'];
    });
  }
}
