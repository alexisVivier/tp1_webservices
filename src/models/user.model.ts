import Model from "./base.model";
import Album from './album.model';

enum RelationType {
  BelongsTo = "belongsTo",
  HasMany = "hasMany"
}

export default class User extends Model {
  constructor(user : {id: number, firstName: string, lastName: string, albums?: Album[]}) {
    super(user.id);
    this.lastName = user.lastName;
    this.firstName = user.firstName;
    if(user.albums) {
        this.albums = user.albums;
    }
  }

  static config = {
    endpoint: process.env['API_BASE_URL'] + "/user",
    relations: {
      album: { type: RelationType.HasMany, model: Album, foreignKey: "user" }
    }
  };

  private firstName: string;
  private lastName: string;
  private albums?: Album[];
}
