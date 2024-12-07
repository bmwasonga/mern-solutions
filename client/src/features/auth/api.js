// const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';
const API_URL = 'http://localhost:3001/api';

export const authApi = {
	async register(userData) {
		const response = await fetch(`${API_URL}/register`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(userData),
		});

		if (!response.ok) {
			const error = await response.json();
			throw new Error(error.message || 'Registration failed');
		}

		return response.json();
	},

	async login(credentials) {
		const response = await fetch(`${API_URL}/login`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(credentials),
		});

		if (!response.ok) {
			const error = await response.json();
			throw new Error(error.message || 'Login failed');
		}

		return response.json();
	},

	async fetchProfile(token) {
		const response = await fetch(`${API_URL}/profile`, {
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'application/json',
			},
		});

		if (!response.ok) {
			const error = await response.json();
			throw new Error(error.message || 'Failed to fetch profile');
		}

		return response.json();
	},
};
