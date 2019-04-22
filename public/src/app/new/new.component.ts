import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router  } from '@angular/router';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {
  newPet = { name: '', type: '', description: '' }
  errors = [];
  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {}

  ngOnInit() {
  }

  onAddPet(){
    let tempObservable = this._httpService.addPet(this.newPet);
    tempObservable.subscribe(resp => {
      if(resp['message'] === 'error') {
        console.log(resp)
        console.log(resp['errors'])
        console.log(resp['errors']['errors'][key])
        /*
         var resp = { 
             message: 'error', 
             data: {
               errors: {
                 name: { message: 'path Name is too short', name: 'xyz' }
                 email: { message: 'path Email is too short', name: 'xyz' }
                 lastName: { message: 'path lastname is too short', name: 'xyz' }
               },
               _message: '',
               message: '',
               name: 'ValidationError'
             }
           }
        */
        var errorsResponse = resp['errors']['errors']

        for(var key in errorsResponse){
          var upperKey = key;
          var errString = 'ERROR ADDING ' + upperKey.toUpperCase() + ': ' + errorsResponse[key]['message']
          this.errors.push(errString)
        }

      } else {
        this._router.navigate(['/']);
      }
    });
  }
}