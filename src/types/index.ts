export interface Task {
  id: string;
  project_id: string;
  title: string;
  description?: string;
  due_date?: string | null; // "AAAA-MM-JJ"
  completed: boolean;
  kind: "action" | "document";
  approved_at?: string | null; // instant de validation par l'agence
  review_note?: string | null; // message de refus visible par le client
  position: number;
  created_at: string;
}

export interface Submission {
  id: string;
  project_id: string;
  task_id?: string;
  file_url: string;
  file_path: string;
  file_name: string;
  created_at: string;
}

export interface Project {
  id: string;
  agency_id: string;
  client_name: string;
  description?: string;
  slug: string;
  share_token: string;
  created_at: string;
  tasks?: Task[];
  submissions?: Submission[];
}
