import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

export interface DialogData {
  name: string;
  code: string;
}

@Component({
  selector: 'app-qr-modal',
  templateUrl: './qr-modal.component.html',
  styleUrls: ['./qr-modal.component.css']
})
export class QrModalComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<QrModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  onCloseClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }
}
