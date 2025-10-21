import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db/connections";

interface BookAttributes {
  id: string;
  title: string;
  author: string;
  publicationYear: number;
  isTaken: boolean;
}

interface BookCreationAttributes extends Partial<BookAttributes> {}

export class BookModel extends Model<BookAttributes, BookCreationAttributes>
  implements BookAttributes {
  public id!: string;
  public title!: string;
  public author!: string;
  public publicationYear!: number;
  public isTaken!: boolean;
}

BookModel.init(
  {
    id: { type: DataTypes.STRING, primaryKey: true },
    title: { type: DataTypes.STRING, allowNull: false },
    author: { type: DataTypes.STRING, allowNull: false },
    publicationYear: { type: DataTypes.INTEGER, allowNull: false },
    isTaken: { type: DataTypes.BOOLEAN, defaultValue: false },
  },
  { sequelize, tableName: "books", timestamps: false }
);
