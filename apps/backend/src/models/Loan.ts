import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db/connections";
import { BookModel } from "./Book";
import { UserModel } from "./User";

export class LoanModel extends Model {}

LoanModel.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    loanDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    returnDate: DataTypes.DATE,
  },
  { sequelize, tableName: "loans", timestamps: false }
);

BookModel.hasMany(LoanModel, { foreignKey: "bookId" });
LoanModel.belongsTo(BookModel, { foreignKey: "bookId" });

UserModel.hasMany(LoanModel, { foreignKey: "userId" });
LoanModel.belongsTo(UserModel, { foreignKey: "userId" });
