import { API_URL, getToken } from '../../constants';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const getAllMembers = createAsyncThunk('/members', async () => {
	const response = await fetch(`${API_URL}/get-all-members`, {
		headers: {
			Authorization: `Bearer ${getToken()}`,
		},
	});
	const data = await response.json();
	return data;
});

const membersSlice = createSlice({
	name: 'members',
	initialState: {
		members: [],
		isLoading: false,
		error: null,
		selectedMember: null,
	},
	reducers: {
		setSelectedMember: (state, action) => {
			state.selectedMember = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(getAllMembers.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(getAllMembers.fulfilled, (state, action) => {
			state.isLoading = false;
			state.members = action.payload;
		});
		builder.addCase(getAllMembers.rejected, (state, action) => {
			state.isLoading = false;
			state.error = action.error.message;
		});
	},
});

export default membersSlice.reducer;

export { getAllMembers };
