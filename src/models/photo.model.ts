import Model from "./base.model";
import Album from './album.model';

enum RelationType {
  BelongsTo = "belongsTo",
  HasMany = "hasMany"
}

export default class Photo extends Model {
  constructor(photo : {id: number, title: string, creationDate: Date, album: Album}) {
    super(photo.id);
    this.title = photo.title;
    this.creationDate = photo.creationDate;
    this.album = photo.album;
  }

  static config = {
    endpoint: process.env['API_BASE_URL'] + "/photo",
    relations: {
      album: { type: RelationType.BelongsTo, model: Album, foreignKey: "photos" }
    }
  };

  private title: string;
  private creationDate: Date;
  private album: Album;
}