export default class Projects {
  constructor(name) {
    this.name = name;
    this.selected = false;
    this.icon = null;
    this.value = 0;
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
