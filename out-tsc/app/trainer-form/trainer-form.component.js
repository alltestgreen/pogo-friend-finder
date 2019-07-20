import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { DataService } from '../service/data.service';
import { FormControl, Validators } from '@angular/forms';
import { PoGoTeam, TrainerLocation } from '../model/common.model';
import { AppSettingsService } from '../service/app-settings.service';
var TrainerFormComponent = /** @class */ (function () {
    function TrainerFormComponent(service, appSettingsService) {
        this.service = service;
        this.appSettingsService = appSettingsService;
        this.teamSelectControl = new FormControl('', [Validators.required]);
        this.countySelectControl = new FormControl('', [Validators.required]);
        this.countySelectControl2 = new FormControl('', []);
        this.countySelectControl3 = new FormControl('', []);
        this.areaSelectControl = new FormControl('', [Validators.required]);
        this.areaSelectControl2 = new FormControl('', []);
        this.areaSelectControl3 = new FormControl('', []);
        this.teams = Object.keys(PoGoTeam);
        this.counties = [];
        this.areas = [];
        this.areas2 = [];
        this.areas3 = [];
    }
    TrainerFormComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.resetForm();
        this.appSettingsService.getJSON().subscribe(function (data) {
            _this.locationGroups = new Map(data.map(function (i) { return [i.name, i.areas]; }));
            _this.counties = Array.from(_this.locationGroups.keys());
        });
    };
    TrainerFormComponent.prototype.resetForm = function (form) {
        if (form != null) {
            form.resetForm();
        }
        this.showLocation2 = false;
        this.showLocation3 = false;
        this.formData = {
            code: '',
            id: null,
            interestGift: false,
            interestPvp: false,
            interestRaid: false,
            interestTrade: false,
            location: new TrainerLocation('HUN'),
            location2: new TrainerLocation(''),
            location3: new TrainerLocation(''),
            name: '',
            team: undefined,
            active: false,
            created: undefined,
        };
    };
    TrainerFormComponent.prototype.onSubmit = function (form) {
        if (form.invalid || this.countySelectControl.invalid || this.teamSelectControl.invalid) {
            return;
        }
        if (!this.formData.location2.area) {
            this.formData.location2 = new TrainerLocation('');
        }
        if (this.formData.location3.area) {
            this.formData.location3 = new TrainerLocation('');
        }
        var data = Object.assign({}, this.formData);
        data.location = Object.assign({}, this.formData.location);
        data.location2 = Object.assign({}, this.formData.location2);
        data.location3 = Object.assign({}, this.formData.location3);
        delete data.id;
        this.service.addTrainer(data);
        this.submitted = true;
        this.resetForm(form);
    };
    TrainerFormComponent.prototype.selectCounty = function (i) {
        if (i === 1) {
            this.formData.location.county = this.countySelectControl.value;
            this.areas = this.locationGroups.get(this.formData.location.county);
        }
        else if (i === 2) {
            if (this.countySelectControl2.value) {
                this.formData.location2.county = this.countySelectControl2.value;
                this.areas2 = this.locationGroups.get(this.formData.location2.county);
            }
            else {
                this.formData.location2 = new TrainerLocation('');
                this.areas2 = [];
            }
        }
        else if (i === 3) {
            if (this.countySelectControl3.value) {
                this.formData.location3.county = this.countySelectControl3.value;
                this.areas3 = this.locationGroups.get(this.formData.location3.county);
            }
            else {
                this.formData.location3 = new TrainerLocation('');
                this.areas3 = [];
            }
        }
    };
    TrainerFormComponent.prototype.selectArea = function (i) {
        if (i === 1) {
            this.formData.location.area = this.areaSelectControl.value;
        }
        else if (i === 2) {
            this.formData.location2.country = 'HUN';
            this.formData.location2.area = this.areaSelectControl2.value;
        }
        else if (i === 3) {
            this.formData.location3.country = 'HUN';
            this.formData.location3.area = this.areaSelectControl3.value;
        }
    };
    TrainerFormComponent = tslib_1.__decorate([
        Component({
            selector: 'app-trainer-form',
            templateUrl: './trainer-form.component.html',
            styleUrls: ['./trainer-form.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [DataService, AppSettingsService])
    ], TrainerFormComponent);
    return TrainerFormComponent;
}());
export { TrainerFormComponent };
//# sourceMappingURL=trainer-form.component.js.map