import { toast } from "react-toastify";

const notifySignUpPassword = () => toast("Passwords don't match !", {});

const notify = (data) => toast(data, {});
export { notifySignUpPassword, notify };
