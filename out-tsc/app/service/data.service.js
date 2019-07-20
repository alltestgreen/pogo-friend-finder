import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { environment } from '../../environments/environment';
var DataService = /** @class */ (function () {
    function DataService() {
        var app = firebase.initializeApp(environment.firebaseConfig);
        this.db = firebase.firestore(app);
    }
    DataService.prototype.searchTrainers = function (searchCriteria) {
        var query = this.db.collection('pogo-trainer');
        query = query.where('active', '==', true);
        if (searchCriteria.team) {
            query = query.where('team', '==', searchCriteria.team);
        }
        if (searchCriteria.interestGift) {
            query = query.where('interestGift', '==', true);
        }
        if (searchCriteria.interestPvp) {
            query = query.where('interestPvp', '==', true);
        }
        if (searchCriteria.interestRaid) {
            query = query.where('interestRaid', '==', true);
        }
        if (searchCriteria.interestTrade) {
            query = query.where('interestTrade', '==', true);
        }
        return new Promise(function (resolve) {
            query.get()
                .then(function (actionArray) {
                resolve(actionArray.docs
                    .map(function (item) {
                    var td = tslib_1.__assign({ id: item.id }, item.data());
                    td.code = td.code.match(/.{1,4}/g).join(' ');
                    return td;
                })
                    .filter(function (trainer) {
                    var match = true;
                    if (searchCriteria.nameOrCode) {
                        var searchCode = searchCriteria.nameOrCode.replace(/\s/g, '');
                        var trainerCode = trainer.code.replace(/\s/g, '');
                        match = trainer.name.includes(searchCriteria.nameOrCode) || trainerCode === searchCode;
                    }
                    var county = searchCriteria.location.county;
                    if (match && county) {
                        match = trainer.location.county === county || trainer.location2.county === county || trainer.location3.county === county;
                    }
                    var area = searchCriteria.location.area;
                    if (match && area) {
                        match = trainer.location.area === area || trainer.location2.area === area || trainer.location3.area === area;
                    }
                    return match;
                }));
            });
        });
    };
    DataService.prototype.addTrainer = function (data) {
        data.code = data.code.replace(/\s/g, '');
        data.created = new Date();
        data.active = false;
        this.db.collection('pogo-trainer').add(data)
            .catch(function (reason) { return console.log(reason); });
    };
    DataService.prototype.addContactMessage = function (data) {
        this.db.collection('pogo-contact').add(data)
            .catch(function (reason) { return console.log(reason); });
    };
    DataService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], DataService);
    return DataService;
}());
export { DataService };
//# sourceMappingURL=data.service.js.map