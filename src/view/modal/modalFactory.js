import DeleteModal from './DeleteModal';
import AddModal from './AddModal';
import EditModal from './EditModal';

class ModalFactory {
  createModal(type, data, category, categoryID) {
    if (type === 'add') {
      return new AddModal(data, category, categoryID);
    } else if (type === 'edit') {
      return new EditModal(data, category, categoryID);
    } else if (type === 'delete') {
      return new DeleteModal(data, category, categoryID);
    }
    return null;
  }
}

export default ModalFactory;
