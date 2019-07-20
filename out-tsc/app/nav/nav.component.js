import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { TranslateService } from '../service/translate.service';
var NavComponent = /** @class */ (function () {
    function NavComponent(translate) {
        this.translate = translate;
        if (navigator.language.includes('hu')) {
            this.selectedLanguage = 'hu';
        }
        else {
            this.selectedLanguage = 'en';
        }
    }
    NavComponent.prototype.setLang = function (lang) {
        this.selectedLanguage = lang;
        this.translate.use(this.selectedLanguage)
            .catch(function (reason) { return console.log(reason); });
    };
    NavComponent.prototype.ngOnInit = function () {
    };
    NavComponent = tslib_1.__decorate([
        Component({
            selector: 'app-nav',
            templateUrl: './nav.component.html',
            styleUrls: ['./nav.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [TranslateService])
    ], NavComponent);
    return NavComponent;
}());
export { NavComponent };
//# sourceMappingURL=nav.component.js.map