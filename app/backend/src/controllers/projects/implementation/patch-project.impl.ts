import { Project, IProject } from "../../../models/project.model";
import HttpError from "../../../models/http-error.model";

const patchProject = async (
  projectId: string,
  patchProjectBody: any
): Promise<unknown> => {
  const project: IProject | null = await Project.findOne({
    _id: projectId,
  });
  if (!project) {
    throw new HttpError(`There is no project with id ${projectId}`, 500);
  }
  await Project.findByIdAndUpdate(project.id, {
    name: patchProjectBody.name,
    description: patchProjectBody.description,
  });
  const patchedProject = await Project.findById(project._id);

  return patchedProject;
};
export default patchProject;
