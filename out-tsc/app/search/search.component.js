import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { DataService } from '../service/data.service';
import { PoGoTeam, TrainerLocation } from '../model/common.model';
import { QrModalComponent } from '../qr-modal/qr-modal.component';
import { MatDialog } from '@angular/material';
import { AppSettingsService } from '../service/app-settings.service';
var SearchComponent = /** @class */ (function () {
    function SearchComponent(service, dialog, appSettingsService) {
        this.service = service;
        this.dialog = dialog;
        this.appSettingsService = appSettingsService;
        this.teams = Object.keys(PoGoTeam);
        this.counties = [];
        this.areas = [];
        this.searchHasResult = true;
        this.searchCriteria = {
            nameOrCode: '',
            interestGift: false,
            interestPvp: false,
            interestRaid: false,
            interestTrade: false,
            location: new TrainerLocation(''),
            team: undefined,
        };
        this.searchPanelOpen = true;
        this.searchInProgress = false;
        this.searchSubmitted = false;
        this.searchResults = [];
    }
    SearchComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.appSettingsService.getJSON().subscribe(function (data) {
            _this.locationGroups = new Map(data.map(function (i) { return [i.name, i.areas]; }));
            _this.counties = Array.from(_this.locationGroups.keys());
        });
    };
    SearchComponent.prototype.selectCounty = function () {
        this.areas = this.locationGroups.get(this.searchCriteria.location.county);
    };
    SearchComponent.prototype.doSearch = function () {
        var _this = this;
        this.searchInProgress = true;
        this.service.searchTrainers(this.searchCriteria)
            .then(function (result) {
            _this.searchResults = result;
            _this.searchInProgress = false;
            _this.searchSubmitted = true;
            _this.searchHasResult = _this.searchResults.length > 0;
            if (_this.searchHasResult) {
                _this.searchPanelOpen = false;
            }
        });
    };
    SearchComponent.prototype.showQR = function (name, code) {
        this.dialog.open(QrModalComponent, {
            data: { name: name, code: code }
        });
    };
    SearchComponent = tslib_1.__decorate([
        Component({
            selector: 'app-search',
            templateUrl: './search.component.html',
            styleUrls: ['./search.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [DataService, MatDialog, AppSettingsService])
    ], SearchComponent);
    return SearchComponent;
}());
export { SearchComponent };
//# sourceMappingURL=search.component.js.map