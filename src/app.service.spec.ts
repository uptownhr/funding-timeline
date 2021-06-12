import { AppService } from './app.service';
import { GraphQLClient } from 'graphql-request';

describe('app service', () => {
  const client = new GraphQLClient(
    'https://api.producthunt.com/v2/api/graphql',
    {
      headers: {
        Authorization: `Bearer ${process.env.PH_TOKEN}`,
      },
    },
  );
  const app = new AppService(client);

  describe('getPHStartups', () => {
    const spyRequest = jest.spyOn(client, 'request');

    beforeEach(async () => {
      spyRequest.mockReset();
    });

    it('returns an array of startup responses from product hunts graphql query', async () => {
      spyRequest.mockResolvedValueOnce({
        posts: {
          edges: [
            {
              id: 1,
              name: '1',
            },
            {
              id: 2,
              name: '2',
            },
          ],
        },
      });

      const res = app.getPHStartups();

      await expect(res).resolves.toEqual(expect.any(Array));
    });
  });
});
