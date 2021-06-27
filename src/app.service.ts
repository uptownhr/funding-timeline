import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { gql } from 'graphql-request';
import { ProductHuntClient } from './phClient';
import { InjectModel } from 'nestjs-typegoose';
import { ProductHuntPost } from './ph.model';
import { ReturnModelType } from '@typegoose/typegoose';

interface test {
  name: string;
}

@Injectable()
export class AppService {
  constructor(
    private readonly phClient: ProductHuntClient,
    @InjectModel(ProductHuntPost)
    private readonly productHuntModel: ReturnModelType<typeof ProductHuntPost>,
  ) {}
  @Cron('0 0 * * * *')
  async getHello() {
    console.log('hello 1');
    const startups = await this.getPHStartups();

    await startups.map((startup) => {
      const { id, name, votesCount, createdAt } = startup.node;

      return this.productHuntModel
        .create({
          name,
          votesCount,
          createdAt,
          phId: id,
          raw: startup.node,
        })
        .catch((e) => {
          console.log('e', e);
        });
    });

    return startups;
  }

  async getPHStartups() {
    const query = gql`
      {
        posts {
          edges {
            node {
              id
              url
              user {
                id
                name
                username
                websiteUrl
                twitterUsername
              }
              website
              name
              tagline
              slug
              thumbnail {
                type
                url
                videoUrl
              }
              description
              reviewsCount
              reviewsRating
              commentsCount
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
