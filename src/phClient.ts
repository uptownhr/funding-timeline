import { GraphQLClient } from 'graphql-request';
import { Injectable } from '@nestjs/common';

const PRODUCT_HUNT_API_URL = 'https://api.producthunt.com/v2/api/graphql';
const PRODUCT_HUNT_API_TOKEN = process.env.PH_TOKEN;

@Injectable()
export class ProductHuntClient extends GraphQLClient {
  constructor() {
    super(PRODUCT_HUNT_API_URL, {
      headers: {
        Authorization: `Bearer ${PRODUCT_HUNT_API_TOKEN}`,
      },
    });
  }
}
