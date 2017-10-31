import {RouterModule, Routes} from "@angular/router";
import {FrontendComponent} from "./frontend.component";
import {NgModule} from "@angular/core";

export const FrontendRoute: Routes = [
  {path: '', component: FrontendComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(FrontendRoute)
  ],
  exports: [
    RouterModule
  ]
})

export class FrontendRouting {

}
