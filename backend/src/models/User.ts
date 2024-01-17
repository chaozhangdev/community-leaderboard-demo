import { prop, getModelForClass } from "@typegoose/typegoose";

class User {
  @prop({ required: true })
  public email?: string;

  @prop({ default: "" })
  public currentCommunity?: string;

  @prop({ required: true, select: false })
  public passwordHash?: string;

  @prop()
  public profilePicture?: string;

  @prop({ required: true, select: true, default: [] })
  public experiencePoints?: { points: number; timestamp: Date }[];
}

export const UserModel = getModelForClass(User);
