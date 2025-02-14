import envs from "@/utils/envs";
import { ProjectService } from "./components/project";
import { ServiceService } from "./components/service";

const baseUrl = envs.api_url

const projectService = new ProjectService(`${baseUrl}/project`);
const serviceService = new ServiceService(`${baseUrl}/services`);

export {
    projectService,
    serviceService
}