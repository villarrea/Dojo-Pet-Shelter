import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router  } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  errors = [];
  detailsPet = {name: '', type: '', description: ''}
  click_like = true;
  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {}

  ngOnInit() {
    this._route.params.subscribe((params: Params) => {
      this.getPetInfo(params['id'])
    });
  }
  getPetInfo(id){
    let observable = this._httpService.getPetInfo(id)
    observable.subscribe(resp => {
      this.detailsPet = resp['data']
      console.log('came back', this.detailsPet)
    })
  }
  onDelete(id){
    let observable = this._httpService.deletePet(id);
    observable.subscribe(data => {
      console.log("Deleted");
      this._router.navigate(['/']);
    })
  }
  onLike(){
    let observable = this._httpService.likePet(this.detailsPet);
    observable.subscribe(data => {
    console.log(data);
    console.log('---------', this.detailsPet['_id']);
    console.log(data['data']._id);
    console.log(['/details/' + this.detailsPet['_id']])
    this.click_like = false;
    this.getPetInfo(this.detailsPet['_id']);
  })
  }

}
