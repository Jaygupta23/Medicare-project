import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// autoClose: 1600,
// hideProgressBar: true,
// closeOnClick: true,
// pauseOnHover: true,
// draggable: true,
// progress: undefined,

export const tostS = (msg) => {
    var toastId = null;
    var customToastId = 1234;
    if (toast.isActive(toastId)) {
        toastId = toast.success(msg, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
        });
    }

    toast.success(msg, {
        toastId: customToastId,
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
    });
};

export const tostE = (msg) => {
    var toastId = null;
    var customToastId = 1234;
    if (toast.isActive(toastId)) {
        toastId = toast.error(msg, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,

        });
    }

    toast.error(msg, {
        toastId: customToastId,
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
    });
};

export const tostW = (msg) => {
    var toastId = null;
    var customToastId = 1234;
    if (toast.isActive(toastId)) {
        toastId = toast.warn(msg, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
        });
    }

    toast.warn(msg, {
        toastId: customToastId,
        position: toast.POSITION.TOP_RIGHT,
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
    });
};
