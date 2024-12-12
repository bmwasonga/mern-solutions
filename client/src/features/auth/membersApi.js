import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { API_URL, getToken } from '../../constants';

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

const createMember = createAsyncThunk('/members/create', async (formData) => {
	const response = await fetch(`${API_URL}/create-member`, {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${getToken()}`,
		},
		body: formData, // Send formData directly for multipart/form-data
	});
	if (!response.ok) {
		throw new Error('Failed to create member');
	}
	const data = await response.json();
	return data;
});

const updateMember = createAsyncThunk(
	'/member/:id',
	async ({ id, formData }) => {
		try {
			const response = await fetch(`${API_URL}/member/${id}`, {
				method: 'PATCH',
				headers: {
					Authorization: `Bearer ${getToken()}`,
				},
				body: formData,
			});

			if (!response.ok) {
				throw new Error(
					`Failed to update member${
						response.status === 400
							? ': ' + (await response.json()).message
							: ''
					}`
				);
			}

			const data = await response.json();
			return data;
		} catch (error) {
			console.error('Update member error:', error);
			throw error;
		}
	}
);

const deleteMember = createAsyncThunk('/members/:id', async ({ id }) => {
	const response = await fetch(`${API_URL}/member/${id}`, {
		method: 'DELETE',
		headers: {
			Authorization: `Bearer ${getToken()}`,
		},
	});
	if (!response.ok) {
		throw new Error('Failed to delete member');
	}
	return id;
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
		// GET ALL MEMBERS
		builder.addCase(getAllMembers.pending, (state) => {
			state.isLoading = true;
			state.error = null;
		});
		builder.addCase(getAllMembers.fulfilled, (state, action) => {
			state.isLoading = false;
			state.members = action.payload;
			state.error = null;
		});
		builder.addCase(getAllMembers.rejected, (state, action) => {
			state.isLoading = false;
			state.error = action.error.message;
		});

		// CREATE MEMBER
		builder.addCase(createMember.pending, (state) => {
			state.isLoading = true;
			state.error = null;
		});
		builder.addCase(createMember.fulfilled, (state, action) => {
			state.isLoading = false;
			state.members.push(action.payload);
			state.error = null;
		});
		builder.addCase(createMember.rejected, (state, action) => {
			state.isLoading = false;
			state.error = action.error.message;
		});

		// UPDATE MEMBER
		builder.addCase(updateMember.pending, (state) => {
			state.isLoading = true;
			state.error = null;
		});
		builder.addCase(updateMember.fulfilled, (state, action) => {
			state.isLoading = false;
			state.members = state.members.map((member) =>
				member.id === action.payload.id ? action.payload : member
			);
			state.error = null;
		});
		builder.addCase(updateMember.rejected, (state, action) => {
			state.isLoading = false;
			state.error = action.error.message;
		});

		// DELETE MEMBER
		builder.addCase(deleteMember.pending, (state) => {
			state.isLoading = true;
			state.error = null;
		});
		builder.addCase(deleteMember.fulfilled, (state, action) => {
			state.isLoading = false;
			state.members = state.members.filter(
				(member) => member.id !== action.payload
			);
			state.error = null;
		});
		builder.addCase(deleteMember.rejected, (state, action) => {
			state.isLoading = false;
			state.error = action.error.message;
		});
	},
});

export const { setSelectedMember } = membersSlice.actions;

export default membersSlice.reducer;

export { getAllMembers, createMember, updateMember, deleteMember };
