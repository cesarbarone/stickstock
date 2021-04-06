import { Settings } from "./settings";

describe('Settings', () => {

  let settings = new Settings();

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
    } as Settings;
  
    it('should update', () => {
      settings.update(newSettings);
      expect(settings.percentageThreshold).toBe(1);
      expect(settings.highInterval).toBe(1);
      expect(settings.lowInterval).toBe(1);
    });
  
  });

});