import { AppService } from './app.service';

describe('app service', () => {
  describe('getPHStartups', () => {
    const app = new AppService();
    it('returns an array of startup responses from product hunts graphql query', () => {
      const res = app.getPHStartups();

      expect(res.length).toBeGreaterThan(0);
    });
  });
});
