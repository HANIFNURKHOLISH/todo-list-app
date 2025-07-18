export const handleApiError = (error) => {
    if (error.response) {
        // Server responded with error status
        const status = error.response.status;
        const message = error.response.data?.message || 'Terjadi kesalahan pada server';

        switch (status) {
            case 400:
                return 'Data yang dimasukkan tidak valid';
            case 401:
                return 'Sesi telah berakhir, silakan login kembali';
            case 403:
                return 'Anda tidak memiliki akses';
            case 404:
                return 'Data tidak ditemukan';
            case 422:
                return message;
            case 500:
                return 'Terjadi kesalahan pada server';
            default:
                return message;
        }
    }

    if (error.request) {
        // Request made but no response received
        return 'Tidak dapat terhubung ke server';
    }

    // Something else went wrong
    return 'Terjadi kesalahan';
};
