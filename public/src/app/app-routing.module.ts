import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent  } from './home/home.component';
import { NewComponent  } from './new/new.component';
import { EditComponent  } from './edit/edit.component';
import { DetailsComponent  } from './details/details.component';

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'pets', component: HomeComponent },
    { path: 'new', component: NewComponent },
    { path: 'edit/:id', component: EditComponent  },
    { path: 'details/:id', component: DetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
