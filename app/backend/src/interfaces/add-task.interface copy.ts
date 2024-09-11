import { PriorityEnum } from "constants/priority.constants";
import { StatusEnum } from "constants/status.constants";

export interface addSubtaskBody {
  name: string;
  description?: string;
  priority: PriorityEnum;
  task: string;
  time: string;
  status: StatusEnum;
  dateCreate: string;
  dateStart: string;
  dateEnd: string;
  assigned: string;
}
