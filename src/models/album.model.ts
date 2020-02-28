import Model from "./base.model";
import User from "./user.model";
import Photo from "./photo.model";
import RelationType from "../common/emumerations/enumerations"

// enum RelationType {
//   BelongsTo = "belongsTo",
//   HasMany = "hasMany"
// }

export default class Album extends Model {
  constructor(album: {id: number, title: string, creationDate: Date, user: User}) {
    super(album.id);
    this.title = album.title;
    this.creationDate = album.creationDate;
    this.user = album.user;
  }

  static config = {
    endpoint:  process.env['API_BASE_URL'] + "/album",
    relations: {
      user: { type: RelationType.BelongsTo, model: User, foreignKey: "albums" },
      photo: { type: RelationType.HasMany, model: Photo, foreignKey: "album" }
    }
  };

  private title: string;
  private creationDate: Date;
  private user: User;
  private photos?: Photo[];
}
