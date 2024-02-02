import { v4 as uuidv4 } from "uuid";

export default class TodoItem {
  constructor(title, description, dueDate, priority, notes, id = uuidv4()) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.notes = notes;
    this.completed = false;
    this.showNotes = false;
    this.id = id;
  }

  toggleCompleted() {
    this.completed = !this.completed;
  }

  updateTitle(newTitle) {
    this.title = newTitle;
  }

  updateDescription(newDescription) {
    this.description = newDescription;
  }

  updateDueDate(newDueDate) {
    this.dueDate = newDueDate;
  }

  updatePriority(newPriority) {
    this.priority = newPriority;
  }

  updateNotes(newNotes) {
    this.notes = newNotes;
  }

  toggleNotes() {
    this.showNotes = !this.showNotes;
  }

  getNotes() {
    return this.notes;
  }

  getDueDate() {
    return this.dueDate;
  }
}
