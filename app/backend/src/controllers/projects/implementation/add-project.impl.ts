import { ProjectDTO } from "dto/projects/project.dto";
import { addProjectBody } from "../../../interfaces/add-project.interface";
import { Project } from "../../../models/project.model";

const addProject = async (projectBody: addProjectBody): Promise<any> => {
  const project: any = await Project.create(projectBody);
  return project;
};
export default addProject;
