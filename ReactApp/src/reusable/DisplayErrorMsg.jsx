/* eslint-disable react/prop-types */
const DisplayFormErrorMessage = ({ inputName, errors }) => {
  let message;
  errors.forEach((err) => {
    if (err.key === inputName) message = err.message;
  });
  return <p className="text-red-500">{message}</p>;
};

export default DisplayFormErrorMessage;
