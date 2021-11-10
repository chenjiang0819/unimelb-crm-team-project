import { toast } from "react-toastify";

const successNotify = (message) => {
  toast.success(message, {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 2000,
  });
};

const errorNotify = (message) => {
  toast.error(message, {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 4000,
  });
};

export default {
  successNotify,
  errorNotify,
};
