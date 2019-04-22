import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router  } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  errors = [];
  editPet = { name: '', type: '', description: '' }
  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {}

  ngOnInit() {
    this._route.params.subscribe((params: Params) => {
      this.getPet(params['id'])
    });
  }

  getPet(id){
    let observable = this._httpService.getPet(id)
    observable.subscribe(resp => {
      this.editPet = resp['data']
      console.log('came back', this.editPet)
    })
  }

  onEditPet(){
    let tempObservable = this._httpService.updatePet(this.editPet)
    tempObservable.subscribe(resp => {
      if(resp['message'] === 'error') {
        console.log(resp['errors'])

        console.log(resp['errors']['errors'])

        
        var errorsResponse = resp['errors']['errors']

        for(var key in errorsResponse){
          var upperKey = key;
          var errString = 'ERROR EDITING ' + upperKey.toUpperCase() + ': ' + errorsResponse[key]['message']
          this.errors.push(errString)
        }

      } else {
        this.getPet(this.editPet['_id']);
      }
    })
  }
}
