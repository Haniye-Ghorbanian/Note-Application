import { Note } from "../types/note";

export class NoteModel implements Note {
  id: number;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  deadlineDate: Date;
  deadlineTime?: string;

  constructor(note: Note) {
    this.id = note.id;
    this.content = note.content;
    this.createdAt = new Date(note.createdAt);
    this.updatedAt = new Date(note.updatedAt);
    this.deadlineDate = new Date(note.deadlineDate);
    this.deadlineTime = note.deadlineTime
  }
}
