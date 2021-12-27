import { modelOptions, mongoose, prop, Severity } from '@typegoose/typegoose';
import { IsString } from 'class-validator';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

@modelOptions({
  options: {
    allowMixed: Severity.ALLOW,
  },
})
export class ProductHuntPost extends TimeStamps {
  @IsString()
  @prop({ required: true, unique: true })
  phId: string;

  @IsString()
  @prop({ required: true })
  name: string;

  @prop({ required: true })
  votesCount: number;

  // todo: create type for producthunt post
  @prop({ type: mongoose.Schema.Types.Mixed })
  // eslint-disable-next-line @typescript-eslint/ban-types
  raw: object;
}
