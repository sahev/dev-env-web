import { BaseModel } from "./BaseModel";
import { Service } from "./ServiceModel";

export class Project extends BaseModel {
    name: string | any;
    description: string | any;
    services: Service[] | any;
}