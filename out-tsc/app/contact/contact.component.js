import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ContactMessage } from '../model/common.model';
import { DataService } from '../service/data.service';
var ContactComponent = /** @class */ (function () {
    function ContactComponent(dataService) {
        this.dataService = dataService;
    }
    ContactComponent.prototype.ngOnInit = function () {
        this.resetForm();
    };
    ContactComponent.prototype.resetForm = function (form) {
        if (form != null) {
            form.resetForm();
        }
        this.formData = new ContactMessage();
    };
    ContactComponent.prototype.onSubmit = function (form) {
        var data = Object.assign({}, form.value);
        delete data.id;
        this.dataService.addContactMessage(data);
        this.submitted = form.submitted;
        this.resetForm(form);
    };
    ContactComponent = tslib_1.__decorate([
        Component({
            selector: 'app-contact',
            templateUrl: './contact.component.html',
            styleUrls: ['./contact.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [DataService])
    ], ContactComponent);
    return ContactComponent;
}());
export { ContactComponent };
//# sourceMappingURL=contact.component.js.map