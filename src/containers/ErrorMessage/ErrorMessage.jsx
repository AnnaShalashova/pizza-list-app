import './ErrorIndicator.scss';

const ErrorMessage = () => {
  return (
    <div className="error-container">
      <div className="error-text">
        <h1>Что-то пошло не так...</h1>
        <p>Попробуйте перезагрузить страницу</p>
      </div>
    </div>
  );
};

export default ErrorMessage;
