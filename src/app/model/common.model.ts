export enum PoGoTeam {
  Instinct = 'Instinct',
  Mystic = 'Mystic',
  Valor = 'Valor',
}

export class TrainerLocation {
  constructor(country: string) {
    if (country) {
      this.country = country;
    }
  }

  country: string;
  county: string;
  area: string;
}

export class ContactMessage {
  name: string;
  email: string;
  message: string;
}
