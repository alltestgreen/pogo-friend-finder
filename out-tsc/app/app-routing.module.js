import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { TrainerFormComponent } from './trainer-form/trainer-form.component';
import { ContactComponent } from './contact/contact.component';
var routes = [
    { path: '', component: SearchComponent },
    { path: 'add', component: TrainerFormComponent },
    { path: 'contact', component: ContactComponent },
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = tslib_1.__decorate([
        NgModule({
            imports: [RouterModule.forRoot(routes)],
            exports: [RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
export { AppRoutingModule };
//# sourceMappingURL=app-routing.module.js.map