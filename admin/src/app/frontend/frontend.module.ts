import {NgModule} from "@angular/core";
import {SharedModule} from "../shared/shared.module";
import {CommonModule} from "@angular/common";
import {FrontendRouting} from "./frontend.route";
import {FrontendComponent} from "./frontend.component";

@NgModule({
  imports: [SharedModule, CommonModule, FrontendRouting],
  declarations: [FrontendComponent],
  providers: []
})

export class FrontendModule {

}
