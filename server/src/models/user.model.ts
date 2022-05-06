import { prop, getModelForClass } from "@typegoose/typegoose";

class User {
  @prop({ required: true })
  public username!: string;

  @prop({ required: true })
  public password!: string;

  @prop({ required: true })
  public email!: string;
}

const UserModel = getModelForClass(User, { schemaOptions: { timestamps: true } });

export default UserModel;
