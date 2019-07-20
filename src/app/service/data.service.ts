import {Injectable} from '@angular/core';

import * as firebase from 'firebase/app';
import 'firebase/firestore';
import {SearchCriteria} from '../model/search.model';
import {TrainerData} from '../model/trainer.model';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  db: firebase.firestore.Firestore;

  constructor() {
    const app = firebase.initializeApp(environment.firebaseConfig);
    this.db = firebase.firestore(app);
  }

  searchTrainers(searchCriteria: SearchCriteria): Promise<TrainerData[]> {
    let query: firebase.firestore.Query = this.db.collection('pogo-trainer');
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

    return new Promise<TrainerData[]>(resolve => {
      query.get()
        .then(actionArray => {
          resolve(actionArray.docs
            .map(item => {
              const td = {id: item.id, ...item.data()} as TrainerData;
              td.code = td.code.match(/.{1,4}/g).join(' ');
              return td;
            })
            .filter(trainer => {
              let match = true;
              if (searchCriteria.nameOrCode) {
                const searchCode = searchCriteria.nameOrCode.replace(/\s/g, '');
                const trainerCode = trainer.code.replace(/\s/g, '');
                match = trainer.name.includes(searchCriteria.nameOrCode) || trainerCode === searchCode;
              }
              const county = searchCriteria.location.county;
              if (match && county) {
                match = trainer.location.county === county || trainer.location2.county === county || trainer.location3.county === county;
              }
              const area = searchCriteria.location.area;
              if (match && area) {
                match = trainer.location.area === area || trainer.location2.area === area || trainer.location3.area === area;
              }
              return match;
            })
          );
        });
    });
  }

  addTrainer(data) {
    data.code = data.code.replace(/\s/g, '');
    data.created = new Date();
    data.active = false;

    this.db.collection('pogo-trainer').add(data)
      .catch(reason => console.log(reason));
  }

  addContactMessage(data) {
    this.db.collection('pogo-contact').add(data)
      .catch(reason => console.log(reason));
  }

}
