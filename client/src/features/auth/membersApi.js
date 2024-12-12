import { API_URL, getToken } from '../../constants';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const getAllMembers = createAsyncThunk(
	'/members',
	async () => {
		const response = await fetch(`${API_URL}/get-all-members`, {
			headers: {
				Authorization: `Bearer ${getToken()}`,
			},
		});
		const data = await response.json();
		return data;
	},
	{}
);

const updateMember = createAsyncThunk(
	'/members/:id',
	async ({ id, updates }) => {
		const response = await fetch(`${API_URL}/members/${id}`, {
			method: 'PATCH',
			headers: {
				Authorization: `Bearer ${getToken()}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(updates),
		});
		const data = await response.json();
		return data;
	}
);

const deleteMember = createAsyncThunk('/members/:id', async ({ id }) => {
	const response = await fetch(`${API_URL}/members/${id}`, {
		method: 'DELETE',
		headers: {
			Authorization: `Bearer ${getToken()}`,
		},
	});
	return response.json();
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

		// builder.addCase(updateMember.pending, (state) => {
		// 	state.isLoading = true;
		// });
		// builder.addCase(updateMember.fulfilled, (state, action) => {
		// 	state.isLoading = false;
		// 	state.members = state.members.map((member) => {
		// 		if (member.id === action.payload.id) {
		// 			return action.payload;
		// 		}
		// 		return member;
		// 	});
		// });
		// builder.addCase(updateMember.rejected, (state, action) => {
		// 	state.isLoading = false;
		// 	state.error = action.error.message;
		// });

		// builder.addCase(deleteMember.pending, (state) => {
		// 	state.isLoading = true;
		// });
		// builder.addCase(deleteMember.fulfilled, (state, action) => {
		// 	state.isLoading = false;
		// 	state.members = state.members.filter(
		// 		(member) => member.id !== action.payload.id
		// 	);
		// });
		// builder.addCase(deleteMember.rejected, (state, action) => {
		// 	state.isLoading = false;
		// 	state.error = action.error.message;
		// });
	},
});

export default membersSlice.reducer;

export { getAllMembers, updateMember, deleteMember };
