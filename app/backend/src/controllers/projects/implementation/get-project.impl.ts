import { Project } from "../../../models/project.model";
import HttpError from "../../../models/http-error.model";

const getProject = async (projectId: string): Promise<any> => {
  const project: any = await Project.findById(projectId);
  if(!project){
    throw new HttpError(`There is no project with id ${projectId}`, 500);
  }
  return { project: project };
};
export default getProject;
