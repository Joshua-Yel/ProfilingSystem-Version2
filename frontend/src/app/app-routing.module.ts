import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SearchingViewComponent } from './view/Profiling/searching-view/searching-view.component';
import { SearchingComponent } from './view/Profiling/searching/searching.component';

const routes: Routes = [
  { path: '', component: SearchingComponent },  
  { path: 'view/:id', component: SearchingViewComponent },
  // { path: 'educationview/:id', component: SearchingEducationViewComponent},
  // { path: 'assignmentview/:id', component: SearchingAssignmentsViewComponent},
  // { path: 'institutionview/:id', component: ViewInstitutionIdComponent},
  { path: '**', redirectTo: '/' } 
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
