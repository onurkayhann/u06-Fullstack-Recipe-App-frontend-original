import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IndexComponent } from './index/index.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';

const routes: Routes = [
  { path: 'foodie', redirectTo: 'foodie/index', pathMatch: 'full'},
  { path: 'foodie/index', component: IndexComponent },
  { path: 'foodie/create', component: CreateComponent },
  { path: 'foodie/edit/:idFoodie', component: EditComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FoodieRoutingModule { }
