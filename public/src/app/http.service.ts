import { Injectable } from '@angular/core';
import { HttpClient  } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private _http: HttpClient){}

  getAllPets(){
    return this._http.get('/pets');
  }
  addPet(newPet){
    return this._http.post('/create', newPet);
  }
  getPet(id){
    console.log('service')
    return this._http.get('/pets/' + id)
  }
  getPetInfo(id){
    console.log('service')
    return this._http.get('/info/' + id)
  }

  updatePet(pet){
    return this._http.put('/pets/' + pet._id, pet)
  }
  deletePet(id){
    return this._http.delete('/info/' + id)
  }
  likePet(pet){
    return this._http.put('/like/' + pet._id, pet)
  }
}