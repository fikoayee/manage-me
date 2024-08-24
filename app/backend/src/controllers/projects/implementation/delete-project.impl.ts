import HttpError from "../../../models/http-error.model";
import { Project, IProject } from "../../../models/project.model";
const deleteProject = async (projectId: string): Promise<unknown> => {
  const project: IProject | null = await Project.findOne({
    _id: projectId,
  });
  if (!project) {
    throw new HttpError(`There is no project with id ${projectId}`, 404);
  }
  await Project.findByIdAndDelete(project.id);
  return "Project has been succesfully deleted"
};
export default deleteProject;
