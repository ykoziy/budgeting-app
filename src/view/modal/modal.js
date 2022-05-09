class Modal {
  #currentView;

  constructor(data, category, categoryID) {
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

  static setModalDeleteItem(handlerFunc) {
    document.body.addEventListener('submit', (evt) => {
      evt.preventDefault();
      const submitType = document.activeElement.value;
      if (submitType === 'delete') {
        const categoryID = document.activeElement.dataset.categoryId;
        const itemID = document.activeElement.dataset.id;
        handlerFunc(categoryID, itemID);
      }
    });
  }
}

export default Modal;
