import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { request, gql, GraphQLClient } from 'graphql-request';
import { ProductHuntClient } from './phClient';

interface test {
  name: string;
}

@Injectable()
export class AppService {
  constructor(private readonly phClient: ProductHuntClient) {}
  @Cron('0 0 * * * *')
  async getHello() {
    console.log('hello 1');
    const startups = await this.getPHStartups();
    return startups;
  }

  async getPHStartups() {
    const query = gql`
      {
        posts {
          edges {
            node {
              id
              name
              votesCount
              createdAt
            }
          }
        }
      }
    `;

    try {
      const res = await this.phClient.request(query);
      return res.posts.edges;
    } catch (e) {
      console.log('error', e);
    }
  }
}
