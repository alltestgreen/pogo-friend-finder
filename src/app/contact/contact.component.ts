import {Component, OnInit} from '@angular/core';
import {ContactMessage} from '../model/common.model';
import {NgForm} from '@angular/forms';
import {DataService} from '../service/data.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  formData: ContactMessage;
  submitted: boolean;

  constructor(private dataService: DataService) {
  }

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form != null) {
      form.resetForm();
    }

    this.formData = new ContactMessage();
  }

  onSubmit(form: NgForm) {
    const data = Object.assign({}, form.value);
    delete data.id;
    this.dataService.addContactMessage(data);
    this.submitted = form.submitted;
    this.resetForm(form);
  }
}
