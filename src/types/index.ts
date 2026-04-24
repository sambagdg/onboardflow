export interface Task {
  id: string;
  project_id: string;
  title: string;
  description?: string;
  completed: boolean;
  position: number;
  created_at: string;
}

export interface Submission {
  id: string;
  project_id: string;
  task_id?: string;
  file_url: string;
  file_name: string;
  created_at: string;
}

export interface Project {
  id: string;
  agency_id: string;
  client_name: string;
  description?: string;
  slug: string;
  created_at: string;
  tasks?: Task[];
  submissions?: Submission[];
}
