import { prop, getModelForClass } from "@typegoose/typegoose";

class Community {
  @prop({ required: true })
  public name?: string;

  @prop()
  public logo?: string;

  @prop({ default: [] })
  public members?: string[];

  @prop({ default: 0 })
  public totalPoints?: number;
}

export const CommunityModel = getModelForClass(Community);
