import { ref } from 'vue';

export function useAlert() {
    const alert = ref({
        show: false,
        type: 'success',
        message: ''
    });

    const showAlert = (message, type = 'success') => {
        alert.value = {
            show: true,
            type,
            message
        };

        setTimeout(() => {
            alert.value.show = false;
        }, 5000);
    };

    const hideAlert = () => {
        alert.value.show = false;
    };

    return {
        alert,
        showAlert,
        hideAlert
    };
}
