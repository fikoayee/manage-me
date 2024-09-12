export interface  Task {
    _id: string;
    name: string;
    description: string;
    dateCreate: string;
    owner: string;
    priority: string;
    project: string;
    status: string;
    ownerInfo?: any; 
  }
  