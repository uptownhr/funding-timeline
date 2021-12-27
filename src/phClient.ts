import { GraphQLClient } from 'graphql-request';
import { Scope } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { getSdk, Sdk } from './post.gql.client';

const PRODUCT_HUNT_API_URL = 'https://api.producthunt.com/v2/api/graphql';

export const PH_CLIENT_NEST_PROVIDER = 'PH';

export const PHClientProvider = {
  provide: PH_CLIENT_NEST_PROVIDER,
  useFactory: getPHClient,
  inject: [ConfigService],
  scope: Scope.DEFAULT, // singleton
};

export function getPHClient(conf: ConfigService): Sdk {
  const PRODUCT_HUNT_API_TOKEN = conf.get('PH_TOKEN');

  const client = new GraphQLClient(PRODUCT_HUNT_API_URL, {
    headers: {
      Authorization: `Bearer ${PRODUCT_HUNT_API_TOKEN}`,
    },
  });

  return getSdk(client);
}
