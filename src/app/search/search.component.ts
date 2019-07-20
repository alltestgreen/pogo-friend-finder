import {Component, OnInit} from '@angular/core';
import {TrainerData} from '../model/trainer.model';
import {DataService} from '../service/data.service';
import {SearchCriteria} from '../model/search.model';
import {PoGoTeam, TrainerLocation} from '../model/common.model';
import {QrModalComponent} from '../qr-modal/qr-modal.component';
import {MatDialog} from '@angular/material';
import {AppSettingsService} from '../service/app-settings.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  teams = Object.keys(PoGoTeam);
  locationGroups: Map<string, string[]>;
  counties = [];
  areas = [];

  searchInProgress: boolean;
  searchPanelOpen: boolean;
  searchSubmitted: boolean;
  searchHasResult = true;
  searchCriteria: SearchCriteria;
  searchResults: TrainerData[];

  constructor(private service: DataService, public dialog: MatDialog, private appSettingsService: AppSettingsService) {
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

  ngOnInit() {
    this.appSettingsService.getJSON().subscribe(data => {
      this.locationGroups = new Map(data.map(i => [i.name, i.areas]));
      this.counties = Array.from(this.locationGroups.keys());
    });
  }

  selectCounty() {
    this.areas = this.locationGroups.get(this.searchCriteria.location.county);
  }

  doSearch() {
    this.searchInProgress = true;
    this.service.searchTrainers(this.searchCriteria)
      .then((result) => {
        this.searchResults = result;
        this.searchInProgress = false;
        this.searchSubmitted = true;
        this.searchHasResult = this.searchResults.length > 0;
        if (this.searchHasResult) {
          this.searchPanelOpen = false;
        }
      });
  }

  showQR(name, code: string) {
    this.dialog.open(QrModalComponent, {
      data: {name: name, code: code}
    });
  }
}
