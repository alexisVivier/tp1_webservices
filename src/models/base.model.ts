import { NonFunctionKeys } from "utility-types";
import axios from "axios";
import { response } from "express";

type SchemaOf<T extends Object> = Pick<T, NonFunctionKeys<T>>;

enum QueryFilterOrder {
  Asc = "asc",
  Desc = "desc"
}

interface QueryFilter {
  where?: Record<string, any>;
  limit?: number;
  page?: number;
  sort?: string;
  order?: QueryFilterOrder;
}

interface FindByIdOptions {
  includes: string[];
}

type ModelIdType = number | string;

enum RelationType {
  BelongsTo = "belongsTo",
  HasMany = "hasMany"
}

/**
 * Define the configuration of a relation
 */
interface Relation {
  /** Type of the relation: hasMany, belongsTo, ... */
  type: RelationType;

  /** The target Model */
  model: any;

  /**
   * The key containing the relation link
   * - on the target model if hasMany
   * - on the current model if belongsTo
   */
  foreignKey: string;
}

interface ModelConfig {
  /**
   * The endpoint on the remote API, example 'users'
   */
  endpoint: string;

  /**
   * The definition of the relations
   */
  relations?: Record<string, Relation>;
}

class Model {
  protected static config: ModelConfig;

  constructor(id: string | number) {
    this.id = id;
  }

  id: string | number;

  static async create<T extends Model>(
    dataOrModel: SchemaOf<T> | T
  ): Promise<T> {
    let obj;
    try {
      const res = await axios.post(this.config.endpoint, dataOrModel);
      obj = res.data;
      obj = new this(obj);
    } catch (error) {
      console.error(error);
    }
    return obj;
  }

  static async find<T extends Model>(filter?: QueryFilter): Promise<T[]> {
    let obj;
    let url = this.config.endpoint + "?";
    try {
      if (filter !== undefined) {
        let bool = false;
        for (let [key, value] of Object.entries(filter)) {
          bool = true;
          if (key === "where") {
            for (let [whereKey, whereValue] of Object.entries(value)) {
              url += `${whereKey}=${whereValue}&`;
            }
          } else {
            url += `_${key}=${value}&`;
          }
          url = bool == true ? url.substring(0, url.length - 1) : url
        }
      }
      const res = await axios.get(url);
      obj = res.data;
      for (let i = 0; i < res.data.length; i++) {
        obj[i] = new this(res.data[i]);
      }
    } catch (error) {}

    return obj;
  }

  static async findById<T extends Model>(id: ModelIdType): Promise<T>;
  static async findById<T extends Model>(
    id: ModelIdType,
    options: FindByIdOptions
  ): Promise<T>;
  static async findById<T extends Model>(
    id: ModelIdType,
    options?: FindByIdOptions
  ): Promise<T> {
    const res = await axios.get(this.config.endpoint + "/" + id);
    let model = new this(res.data);
    if (options && this.config.relations) {
      for (let i = 0; i <= options.includes.length - 1; i++) {
        // On set la current relation
        let relation = this.config.relations[options.includes[i]];
        if (relation.type === "belongsTo") {
          const subRequest = await axios.get(
            `${process.env["API_BASE_URL"]}/${options.includes[i]}/${
              res.data[options.includes[i]]
            }`
          );
          console.log(relation);
          res.data[options.includes[i]] = new relation.model(subRequest.data);
        } else if (relation.type === "hasMany") {
          let subRessources: any[] = [];
          const subRequest = await axios.get(
            `${process.env["API_BASE_URL"]}/${options.includes[i]}`
          );
          subRequest.data.forEach((el: any) => {
            if (el[relation.foreignKey] === res.data.id) {
              subRessources.push(new relation.model(el));
            }
          });
          res.data[options.includes[i] + "s"] = subRessources;
        } else {
        }
      }
    }
    return res.data;
  }

  static async updateById<T extends Model>(model: T): Promise<T>;
  static async updateById<T extends Model>(
    id: T | ModelIdType,
    data?: Partial<SchemaOf<T>>
  ): Promise<T>;
  static async updateById<T extends Model>(
    modelOrId: T | ModelIdType,
    data?: Partial<SchemaOf<T>>
  ): Promise<T> {
    let obj;
    try {
      const res = await axios.patch(
        this.config.endpoint + "/" + modelOrId,
        data
      );
      obj = res.data;
      obj = new this(obj);
    } catch (e) {
      console.error(e);
    }
    return obj;
  }

  static async deleteById(id: ModelIdType): Promise<boolean> {
    const res = await axios.delete(this.config.endpoint + "/" + id);
    return res.data;
  }

  // /**
  //  * Push changes that has occured on the instance
  //  */
  // save<T extends Model>(): Promise<T>{

  // }

  // /**
  //  * Push given changes, and update the instance
  //  */
  // update<T extends Model>(data: Partial<SchemaOf<T>>): Promise<T>{

  // }

  // /**
  //  * Remove the remote data
  //  */
  // remove(): Promise<void>{

  // }
}

export default Model;
