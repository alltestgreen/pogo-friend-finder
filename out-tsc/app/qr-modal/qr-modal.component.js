import * as tslib_1 from "tslib";
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
var QrModalComponent = /** @class */ (function () {
    function QrModalComponent(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
    }
    QrModalComponent.prototype.onCloseClick = function () {
        this.dialogRef.close();
    };
    QrModalComponent.prototype.ngOnInit = function () {
    };
    QrModalComponent = tslib_1.__decorate([
        Component({
            selector: 'app-qr-modal',
            templateUrl: './qr-modal.component.html',
            styleUrls: ['./qr-modal.component.css']
        }),
        tslib_1.__param(1, Inject(MAT_DIALOG_DATA)),
        tslib_1.__metadata("design:paramtypes", [MatDialogRef, Object])
    ], QrModalComponent);
    return QrModalComponent;
}());
export { QrModalComponent };
//# sourceMappingURL=qr-modal.component.js.map