export interface Note {
  id: number;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  deadlineDate: Date;
  deadlineTime?: string; 
}
