import * as tslib_1 from "tslib";
import { Pipe } from '@angular/core';
import { TranslateService } from './translate.service';
var TranslatePipe = /** @class */ (function () {
    function TranslatePipe(translate) {
        this.translate = translate;
    }
    TranslatePipe.prototype.transform = function (key) {
        return this.translate.data[key] || key;
    };
    TranslatePipe = tslib_1.__decorate([
        Pipe({
            name: 'translate',
            pure: false,
        }),
        tslib_1.__metadata("design:paramtypes", [TranslateService])
    ], TranslatePipe);
    return TranslatePipe;
}());
export { TranslatePipe };
//# sourceMappingURL=translate.pipe.js.map