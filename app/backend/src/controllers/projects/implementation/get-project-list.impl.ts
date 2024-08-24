import { GetProjectListDto } from "../../../dto/projects/get-project-list.dto";
import { Project } from "../../../models/project.model";
import { ProjectDTO } from "../../../dto/projects/project.dto"

const getProjectList = async (): Promise<GetProjectListDto> => {
  const projects: ProjectDTO[] = await Project.find();
  return { projects: projects };
};
export default getProjectList;
