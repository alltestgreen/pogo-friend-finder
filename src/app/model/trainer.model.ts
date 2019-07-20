import {PoGoTeam, TrainerLocation} from './common.model';

export class TrainerData {
  id: string;
  name: string;
  code: string;
  team: PoGoTeam;
  location: TrainerLocation;
  location2: TrainerLocation;
  location3: TrainerLocation;
  interestRaid: boolean;
  interestGift: boolean;
  interestPvp: boolean;
  interestTrade: boolean;
  created: Date;
  active: boolean;
}
