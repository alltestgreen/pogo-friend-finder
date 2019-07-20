import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {SearchComponent} from './search/search.component';
import {TrainerFormComponent} from './trainer-form/trainer-form.component';
import {ContactComponent} from './contact/contact.component';


const routes: Routes = [
  {path: '', component: SearchComponent},
  {path: 'add', component: TrainerFormComponent},
  {path: 'contact', component: ContactComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
