import { Schema, model } from "mongoose";

import { IRole } from "./role.type";

const RoleSchema = new Schema({ name: String });

const RoleModel = model("Role", RoleSchema);

export default RoleModel;
