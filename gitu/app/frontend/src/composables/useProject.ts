import { ProjectServiceImpl } from "../services/datasources/impl/project.service.impl";
import { IProjectBody } from "../services/datasources/project.service";

const projectService = new ProjectServiceImpl();

export const useProject = () => {
  const createProject = async (projectBody: IProjectBody) => {
    try {
      const response = await projectService.createProject(projectBody);
      return response;
    } catch (error) {
      return null;
    }
  };
  const updateProject = async (
    projectId: string,
    projectBody: IProjectBody
  ) => {
    try {
      const response = await projectService.updateProject(
        projectId,
        projectBody
      );
      console.log(response)
      return response;
    } catch (error) {
      return null;
    }
  };
  const deleteProject = async (projectId: string) => {
    try {
      const response = await projectService.deleteProject(projectId);
      return response;
    } catch (error) {
      return null;
    }
  };
  const getProject = async (projectId: string) => {
    try {
      const response = await projectService.getProject(projectId);
      return response;
    } catch (error) {
      return null;
    }
  };
  const getProjects = async () => {
    try {
      const response = await projectService.getProjects();
      console.log(response)
      return response.projects;
    } catch (error) {
      return null;
    }
  };

  return {
    createProject,
    updateProject,
    deleteProject,
    getProject,
    getProjects,
  };
};
