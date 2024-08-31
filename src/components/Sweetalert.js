import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const showAlert = (actionTitle, actionText, actionIcon) => {
    MySwal.fire({
        title: actionTitle,
        text: actionText,
        icon: actionIcon,
        showConfirmButton: false,
        timer: 2000,
        showCloseButton: true,
    });
};

export default showAlert;
