import { toast, TypeOptions } from 'react-toastify';

interface NotificationProps {
  title: string;
  message: string;
  type: TypeOptions;
}

const notification = ({ title, message, type }: NotificationProps): void => {
  const content = `${message}`;

  switch (type) {
    case 'info':
      toast.info(content);
      break;
    case 'success':
      toast.success(content);
      break;
    case 'warning':
      toast.warning(content);
      break;
    case 'error':
      toast.error(content);
      break;
    default:
      toast(content);
  }
};

export default notification;
