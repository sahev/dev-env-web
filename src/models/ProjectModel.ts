import { BaseModel } from "./BaseModel";
import { Service } from "./ServiceModel";

export class Project extends BaseModel {
    name: string | any;
    description: string | any;
    availableStorageSize: number;
    services: Service[] | any;
    storageSize: string;
}