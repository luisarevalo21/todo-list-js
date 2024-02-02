export default class Projects {
  constructor(title, description = "") {
    this.title = title;
    this.selected = false;
    this.icon = null;
    this.value = 0;
    this.description = description;
  }

  toggleSelected() {
    this.selected = !this.selected;
  }

  getName() {
    return this.name;
  }

  isSelected() {
    return this.selected;
  }
}
