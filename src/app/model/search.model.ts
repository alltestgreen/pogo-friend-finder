import {PoGoTeam, TrainerLocation} from './common.model';

export class SearchCriteria {
  nameOrCode: string;
  location: TrainerLocation;
  team: PoGoTeam;
  interestRaid: boolean;
  interestGift: boolean;
  interestPvp: boolean;
  interestTrade: boolean;
}
