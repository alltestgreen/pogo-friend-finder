import {Component, OnInit} from '@angular/core';
import {DataService} from '../service/data.service';
import {FormControl, NgForm, Validators} from '@angular/forms';
import {TrainerData} from '../model/trainer.model';
import {PoGoTeam, TrainerLocation} from '../model/common.model';
import {AppSettingsService} from '../service/app-settings.service';

@Component({
  selector: 'app-trainer-form',
  templateUrl: './trainer-form.component.html',
  styleUrls: ['./trainer-form.component.css']
})

export class TrainerFormComponent implements OnInit {

  teamSelectControl = new FormControl('', [Validators.required]);
  countySelectControl = new FormControl('', [Validators.required]);
  countySelectControl2 = new FormControl('', []);
  countySelectControl3 = new FormControl('', []);
  areaSelectControl = new FormControl('', [Validators.required]);
  areaSelectControl2 = new FormControl('', []);
  areaSelectControl3 = new FormControl('', []);

  formData: TrainerData;
  teams = Object.keys(PoGoTeam);
  locationGroups: Map<string, string[]>;
  counties = [];
  areas = [];
  areas2 = [];
  areas3 = [];

  showLocation2: boolean;
  showLocation3: boolean;
  submitted: boolean;

  constructor(private service: DataService, private appSettingsService: AppSettingsService) {
  }

  ngOnInit() {
    this.resetForm();
    this.appSettingsService.getJSON().subscribe(data => {
      this.locationGroups = new Map(data.map(i => [i.name, i.areas]));
      this.counties = Array.from(this.locationGroups.keys());
    });
  }

  resetForm(form?: NgForm) {
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
  }

  onSubmit(form: NgForm) {
    if (form.invalid || this.countySelectControl.invalid || this.teamSelectControl.invalid) {
      return;
    }

    if (!this.formData.location2.area) {
      this.formData.location2 = new TrainerLocation('');
    }
    if (this.formData.location3.area) {
      this.formData.location3 = new TrainerLocation('');
    }

    const data = Object.assign({}, this.formData);
    data.location = Object.assign({}, this.formData.location);
    data.location2 = Object.assign({}, this.formData.location2);
    data.location3 = Object.assign({}, this.formData.location3);
    delete data.id;
    this.service.addTrainer(data);

    this.submitted = true;
    this.resetForm(form);
  }

  selectCounty(i) {
    if (i === 1) {
      this.formData.location.county = this.countySelectControl.value;
      this.areas = this.locationGroups.get(this.formData.location.county);
    } else if (i === 2) {
      if (this.countySelectControl2.value) {
        this.formData.location2.county = this.countySelectControl2.value;
        this.areas2 = this.locationGroups.get(this.formData.location2.county);
      } else {
        this.formData.location2 = new TrainerLocation('');
        this.areas2 = [];
      }
    } else if (i === 3) {
      if (this.countySelectControl3.value) {
        this.formData.location3.county = this.countySelectControl3.value;
        this.areas3 = this.locationGroups.get(this.formData.location3.county);
      } else {
        this.formData.location3 = new TrainerLocation('');
        this.areas3 = [];
      }
    }
  }

  selectArea(i) {
    if (i === 1) {
      this.formData.location.area = this.areaSelectControl.value;
    } else if (i === 2) {
      this.formData.location2.country = 'HUN';
      this.formData.location2.area = this.areaSelectControl2.value;
    } else if (i === 3) {
      this.formData.location3.country = 'HUN';
      this.formData.location3.area = this.areaSelectControl3.value;
    }
  }
}
