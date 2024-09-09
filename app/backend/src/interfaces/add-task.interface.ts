import { PriorityEnum } from "constants/priority.constants";
import { StatusEnum } from "constants/status.constants";

export interface addTaskBody {
  name: string;
  description?: string;
  priority: PriorityEnum;
  project: string;
  dateCreate: string;
  status: StatusEnum;
  owner: string;
}
