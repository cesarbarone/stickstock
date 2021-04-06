export class Settings {
  percentageThreshold: number;
  highInterval: number;
  lowInterval: number;

  update(newSettings: Settings) {
    Object.assign(this, newSettings)
  }
}