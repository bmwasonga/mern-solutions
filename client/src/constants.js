export const API_URL = 'http://localhost:3001/api';
export const TOKEN = 'token';
export const getToken = () => {
	return localStorage.getItem(TOKEN);
};
