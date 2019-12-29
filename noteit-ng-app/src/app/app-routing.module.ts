import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {NotesComponent} from "./notes/notes.component";
import {FeedbackComponent} from "./feedback/feedback.component";
import {NotFoundComponent} from "./not-found/not-found.component";


const routes: Routes = [
  {
    path:'notes',
    component:NotesComponent
  },
  {
    path:'feedback',
    component:FeedbackComponent
  },
  /*Default Route*/
  {
    path:'',
    component:NotesComponent,
    pathMatch :'full'
  },
  /*NotFoundRoute*/
  {
    path:'**',
    component:NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{enableTracing:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
