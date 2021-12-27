import { Inject, Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { PH_CLIENT_NEST_PROVIDER } from './phClient';
import { InjectModel } from 'nestjs-typegoose';
import { ProductHuntPost } from './ph.model';
import { ReturnModelType } from '@typegoose/typegoose';
import { Sdk } from './post.gql.client';

@Injectable()
export class AppService {
  constructor(
    @Inject(PH_CLIENT_NEST_PROVIDER)
    private readonly phSDK: Sdk,

    @InjectModel(ProductHuntPost)
    private readonly productHuntModel: ReturnModelType<typeof ProductHuntPost>,
  ) {}

  @Cron('0 */4 * * * *')
  async getHello() {
    console.log('hello 1');
    const { posts } = await this.phSDK.GetPosts();

    await Promise.all(
      posts.edges.map((startup) => {
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
            if (e.code === 11000) {
              console.log('duplicate found - updating count', {
                name,
                votesCount,
                phId: id,
              });
              return this.productHuntModel.update(
                { phId: id },
                { $set: { votesCount, updatedAt: new Date() } },
              );
            }

            console.error(e);
          });
      }),
    );

    return posts.edges;
  }
}
