import api from "../../../services/infrastructure/axios-config";
import { IProjectBody, ProjectService } from "../project.service";
import { IProject } from "../../../interfaces/project/project.interface";
export class ProjectServiceImpl implements ProjectService {
  private SERVICE_PATH_PROJECTS = "/projects";

  async createProject(projectBody: IProjectBody): Promise<any> {
    try {
      const response = await api.post(
        `${this.SERVICE_PATH_PROJECTS}/project`,
        projectBody
      );
      return response?.data;
    } catch (err) {
      throw new Error("Could not create project");
    }
  }
  async updateProject(
    projectId: string,
    projectBody: IProjectBody
  ): Promise<any> {
    try {
      const response = await api.patch(
        `${this.SERVICE_PATH_PROJECTS}/project/${projectId}`,
        projectBody
      );
      return response;
    } catch (err) {
      throw new Error("Could not update project");
    }
  }
  async deleteProject(projectId: string): Promise<any> {
    try {
      const response = await api.delete(
        `${this.SERVICE_PATH_PROJECTS}/project/${projectId}`
      );
      return response;
    } catch (error) {
      throw new Error("Could not delete project");
    }
  }
  async getProjects(): Promise<IProject[]> {
    try {
      const response = await api.get(`${this.SERVICE_PATH_PROJECTS}/all`);
      const projects = response.data;
      return projects;
    } catch (error) {
      throw new Error("Could not get projects");
    }
  }
  async getProject(projectId: string): Promise<IProject> {
    try {
      const response = await api.get(
        `${this.SERVICE_PATH_PROJECTS}/project/${projectId}`
      );
      return response;
    } catch (err) {
      throw new Error("Could not get project");
    }
  }
}
