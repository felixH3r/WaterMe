export interface Plants {
  name: string;
  demand: string;
  picture: string;
  minimum: number;
  maximum: number;
  minimum_erreicht_hours: number;
  giessen_in_tagen: string;
  giessen_in_stunden: string;
  wasserstand: number;
  gegossen_am: Date;
  sensor: number;
}
