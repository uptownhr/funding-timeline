import { GraphQLClient } from 'graphql-request';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

const PRODUCT_HUNT_API_URL = 'https://api.producthunt.com/v2/api/graphql';

@Injectable()
export class ProductHuntClient extends GraphQLClient {
  constructor(conf: ConfigService) {
    const PRODUCT_HUNT_API_TOKEN = conf.get('PH_TOKEN');

    super(PRODUCT_HUNT_API_URL, {
      headers: {
        Authorization: `Bearer ${PRODUCT_HUNT_API_TOKEN}`,
      },
    });
  }
}
