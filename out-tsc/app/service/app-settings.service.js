import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
var AppSettingsService = /** @class */ (function () {
    function AppSettingsService(http) {
        this.http = http;
    }
    AppSettingsService.prototype.getJSON = function () {
        return this.http.get('./assets/data/area.json');
    };
    AppSettingsService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], AppSettingsService);
    return AppSettingsService;
}());
export { AppSettingsService };
//# sourceMappingURL=app-settings.service.js.map