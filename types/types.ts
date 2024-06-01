export interface Goal {
  _id: string;
  user_id: string;
  progress_tracker_id: string;
  description: string;
  status: string;
  created_at: string;
  updated_at: string;
  today_checked: boolean;
  check_history: string[];
}
