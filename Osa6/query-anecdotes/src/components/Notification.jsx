import PropTypes from 'prop-types'

const Notification = ({ message }) => {
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  };
  
  return (
    <>
      {message && <div style={style}>{message}</div>}
    </>
  );
};

Notification.propTypes = {
  message: PropTypes.string,
};

export default Notification;