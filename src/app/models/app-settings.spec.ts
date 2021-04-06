import { AppSettings } from "./app-settings";

describe('AppSettings', () => {

  let settings = new AppSettings();

  beforeEach(() => {
    settings.percentageThreshold = 3;
    settings.highInterval = 2;
    settings.lowInterval = 15;
  });

  describe('.update', () => {

    let newSettings = {
      percentageThreshold: 1,
      highInterval: 1,
      lowInterval: 1,
    } as AppSettings;
  
    it('should update', () => {
      settings.update(newSettings);
      expect(settings.percentageThreshold).toBe(1);
    });
  
  });

  it('', () => {

  });

});