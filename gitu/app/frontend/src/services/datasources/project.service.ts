import { IProject } from "../../interfaces/project/project.interface";
export interface ProjectService {
  createProject(projectBody: IProjectBody): Promise<unknown>;
  updateProject(projectId: string, projectBody: IProjectBody): Promise<unknown>;
  deleteProject(projectId: string): Promise<unknown>;
  getProjects(): Promise<IProject[]>;
  getProject(projectId: string): Promise<IProject>;
}

export interface IProjectBody {
  name: String;
  description: String;
  color: String;
}
