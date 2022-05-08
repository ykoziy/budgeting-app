class Modal {
  #currentView;

  constructor(type, data, category, categoryID, modalContainer) {
    this.type = type;
    this.data = data;
    this.category = category;
    this.categoryID = categoryID;
  }

  static remove() {
    const modal = document.querySelector('#modal-container');
    modal.remove();
  }

  get currentView() {
    return this.#currentView;
  }

  set currentView(currentView) {
    this.#currentView = currentView;
  }

  static setModalCancel(handlerFunc) {
    document.body.addEventListener('click', (evt) => {
      if (
        evt.target.classList.contains('cancel-btn') &&
        evt.target.parentElement.classList.contains('modal-bottom')
      ) {
        handlerFunc();
      }
    });
  }
}

export default Modal;
