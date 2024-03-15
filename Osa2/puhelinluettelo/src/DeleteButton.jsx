/* eslint-disable react/prop-types */
import numberService from '/./services/numbers.js'


const DeleteButton = ({ person, setPersons, setErrorMessage }) => {
    const handleDelete = () => {
      numberService.deleteVal(person.id)
        .then(() => {
          return numberService.getAll();
        })
        .then(response => {
          setPersons(response.data);
          setErrorMessage(
            `Person '${person.name}' was deleted`
          );
          setTimeout(() => {
            setErrorMessage(null);
          }, 2000);
        })
        .catch(error => {
          console.error('Error deleting person:', error);
          setErrorMessage(
            `Error deleting person '${person.name}'`
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
  };

  export default DeleteButton