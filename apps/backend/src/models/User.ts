import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db/connections";

interface UserAttributes {
  id: string;
  name: string;
  role: "reader" | "admin";
  password: string;
}

interface UserCreationAttributes extends Partial<UserAttributes> {}

export class UserModel extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: string;
  public name!: string;
  public role!: "reader" | "admin";
  public password!: string;
}

UserModel.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    name: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.ENUM("reader", "admin"), allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
  },
  { sequelize, tableName: "users", timestamps: false }
);
