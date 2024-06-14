/* eslint-disable react/prop-types */
import numberService from '../../../../../../services/numbers.js';

function DeleteButton({ person, setPersons, setErrorMessage }) {
  const handleDelete = () => {
    numberService.deleteVal(person._id)
      .then(() => numberService.getAll())
      .then((response) => {
        setPersons(response.data);
        setErrorMessage(
          `Person '${person.name}' was deleted`,
        );
        setTimeout(() => {
          setErrorMessage(null);
        }, 2000);
      })
      .catch((error) => {
        console.error('Error deleting person:', error);
        setErrorMessage(
          `Information of '${person.name} had already been deleted'`,
        );
        setTimeout(() => {
          setErrorMessage(null);
        }, 2000);
      });
  };

  return (
    <button onClick={handleDelete}>
      delete
    </button>
  );
}

export default DeleteButton;
