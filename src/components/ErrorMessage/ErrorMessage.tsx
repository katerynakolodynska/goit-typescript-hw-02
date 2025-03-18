import s from "./ErrorMessage.module.css";

interface ErrorProps {
  message: string;
}

const ErrorMessage = ({ message }: ErrorProps) => {
  return <p className={s.errorMessage}>{message}</p>;
};

export default ErrorMessage;
