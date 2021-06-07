
import classes from './notification.module.scss';

import {useDispatch} from "react-redux";
import {clearNotification} from "../../store/notificationSlice";

function Notification(props) {
  const dispatch = useDispatch();

  const { title, message, status } = props;

  let statusClasses = '';

  if (status === 'success') {
    statusClasses = styles.success;
  }
  else if (status === 'warning') {
    statusClasses = styles.warning;
  }
  else if (status === 'error') {
    statusClasses = styles.error;
  }

  else if (status === 'pending') {
    statusClasses = styles.pending;
  }

  const activeClasses = `${classes.notification} ${statusClasses}`;

  return (
    <div className={activeClasses} onClick={()=>dispatch(clearNotification())}>
      <h2>{title}</h2>
      <p>{message}</p>
    </div>
  );
}

export default Notification;
