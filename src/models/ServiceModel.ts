import { EServiceType } from "@/types/EServiceType";
import { BaseModel } from "./BaseModel";
import { EContainerStatusType } from "@/types/EContainerStatusType";

export class Service extends BaseModel {
    name: string;
    description: string;
    serviceType: EServiceType;
    storageSize: string;
    userId: string;
    projectId: string;
    host: string;
    user: string;
    password: string;
    containerStatusType: EContainerStatusType;
}