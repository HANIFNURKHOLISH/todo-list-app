// src/stores/auth.js
import { defineStore } from 'pinia';
import api from '../api';
import router from '../plugins/router';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null,
        token: localStorage.getItem('token') || null,
    }),

    getters: {
        isAuthenticated: (state) => !!state.token,
    },

    actions: {
        async login(credentials) {
            try {
                const response = await api.login(credentials);
                this.token = response.data.data.token;
                localStorage.setItem('token', this.token);

                await this.fetchUser();

                await router.push({ name: 'Dashboard' });
            } catch (error) {
                console.error('Login failed', error);
                throw error;
            }
        },

        async register(data) {
            try {
                await api.register(data);
                await router.push({ name: 'Login' });
            } catch (error) {
                console.error('Registration failed', error);
                throw error;
            }
        },

        async fetchUser() {
            try {
                const response = await api.getCurrentUser();
                this.user = response.data.data;
            } catch (error) {
                console.error('Failed to fetch user', error);
                this.logout();
            }
        },

        logout() {
            this.token = null;
            this.user = null;
            localStorage.removeItem('token');
            router.push({ name: 'Login' });
        },
    },
});