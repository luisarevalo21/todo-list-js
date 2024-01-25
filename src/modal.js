export default class Modal {
  constructor() {
    this.show = false;
    this.modal = document.getElementById("modal");
    this.overlay = document.getElementById("overlay");
  }

  toggleModal() {
    if (this.show) {
      this.hideModal();
    } else {
      this.showModal();
    }
    // this.modal.classList.toggle("active-modal");
  }

  hideModal() {
    this.show = false;
    this.modal.classList.toggle("active-modal");
    this.overlay.classList.remove("active-overlay");
  }

  showModal() {
    this.show = true;
    this.modal.classList.toggle("active-modal");
    this.overlay.classList.add("active-overlay");
  }
}
