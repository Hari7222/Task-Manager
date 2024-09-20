import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

const initalTask = localStorage.getItem('task')
	? JSON.parse(localStorage.getItem('task'))
	: null;

const initialState = {
	// TaskData: initalTask,
	AllTasks: {},
};
export const taskSlice = createSlice({
	name: 'Task',
	initialState,

	reducers: {
		taskAddedSuccessfully: (state, action) => {
			state.TaskData = action.payload;
		},
		taskAddFailure: (state) => {
			return state;
		},
		getAllTaskSuccess: (state, action) => {
			state.AllTasks = action.payload;
		},
		getAllTaskFailure: (state) => {
			return state;
		},

		editTaskSuccess: (state, action) => {
			state.TaskData = action.payload;
		},
		editTaskFail: (state) => {
			return state;
		},
		deleteSuccess: (state, action) => {
			state.TaskData = action.payload;
		},
		deletefail: (state) => {
			return state;
		},
	},
});

export const {
	taskAddFailure,
	taskAddedSuccessfully,
	getAllTaskFailure,
	getAllTaskSuccess,
	deleteSuccess,
	deletefail,
	editTaskSuccess,
	editTaskFail,
} = taskSlice.actions;

export default taskSlice.reducer;

export const addTask = (task, description, dueDate, id) => async (dispatch) => {
	const taskData = {
		task,
		description,
		dueDate,
		id,
	};
	const response = await axios.post('http://localhost:4000/task/add', taskData);
	if (response) {
		localStorage.setItem('task', JSON.stringify(response.data));

		dispatch(taskAddedSuccessfully(response.data));
		toast.success('task added successfully');
		window.location.reload();
	} else {
		dispatch(taskAddFailure());
	}
};

export const getAllTasks = (token, id) => async (dispatch) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
		params: {
			id,
		},
	};

	try {
		const response = await axios.get(
			'http://localhost:4000/task/tasks',
			config
		);

		if (response) {
			dispatch(getAllTaskSuccess(response.data));
		}
	} catch (error) {
		if (error.response && error.response.status === 400) {
			dispatch(getAllTaskFailure());
			toast.error('Failed to fetch tasks');
		}
	}
};

export const arrowClick = (item, string) => async () => {
	let taskData = {
		id: item._id,
		status: item.status,
		string,
	};

	try {
		let response = await axios.put(
			`http://localhost:4000/task/${taskData.id}`,
			taskData
		);

		if (response) {
			window.location.reload();
		}
	} catch (error) {
		console.log(error);
	}
};
export const editItem = (id) => async (dispatch) => {
	let res = await axios.edit(`http://localhost:4000/task/${id}`);

	if (res) {
		dispatch(editTaskSuccess());
		toast.success('task edited successfully');

		window.location.reload();
	} else {
		dispatch(editTaskFail());
		toast.error('Failed to edit task');
	}
};


export const deleteItem = (id) => async (dispatch) => {
	let res = await axios.delete(`http://localhost:4000/task/${id}`);

	if (res) {
		dispatch(deleteSuccess());
		toast.success('task deleted successfully');
		window.location.reload();
	} else {
		dispatch(deletefail());
		toast.error('Failed to delete task');
	}
};
