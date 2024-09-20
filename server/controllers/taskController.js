const User = require('../../database/model/user.model');
const Task = require('../../database/model/task.model');

const addTask = async (req, res) => {
	const { task,description, dueDate, id } = req.body;

	try {
		if (!task || !description || !dueDate) return res.status(400).send('Please provide all required fields');
		const taskDetail = await new Task({
			task,
			description,
			dueDate,
			cretedBy: id,
		});
		await taskDetail.save();
		return res.status(200).send(taskDetail);
	} catch (error) {
		return res.status(400).send('task addition failed');
	}
};

const getAllTasks = async (req, res) => {
	const { id } = req.query;
	try {
		let tasklist = await Task.find({ createdBy: id });
		return res.status(200).send(tasklist);
	} catch (error) {
		return res.status(400).send(error);
	}
};

const statusChange = async (req, res) => {
	const { id, string } = req.body;

	try {
		let task = await Task.findById({ _id: id });
		if (string === 'right') {
			if (task.status === 'New Task') {
				task.status = 'Pending';
				task.save();
				return res.send(task);
			} else if (task.status === 'Pending') {
				task.status = 'In-Process';
				task.save();
				return res.send(task);
			} else if (task.status === 'In-Process') {
				task.status = 'Completed';
				task.save();
				return res.send(task);
			}
		} else {
			if (task.status === 'Completed') {
				task.status = 'In-Process';
				task.save();
				return res.send(task);
			} else if (task.status === 'In-Process') {
				task.status = 'Pending';
				task.save();
				return res.send(task);
			} else if (task.status === 'Pending') {
				task.status = 'New Task';
				task.save();
				return res.send(task);
			}
		}
	} catch (error) {}
};

const editTask = async (req, res) => {
	const { id } = req.params;
	const { task, description, dueDate } = req.body;
	try {
		let response = await Task.findByIdAndUpdate(id,{task,description,dueDate},{new:true});
		return res.status(200).send(response);
	} catch (error) {
		return res.status(400).send('updateFailed');
	}
};


const deleteTask = async (req, res) => {
	const { id } = req.params;
	try {
		let response = await Task.findByIdAndDelete(id);
		return res.status(200).send(response);
	} catch (error) {
		return res.status(400).send('deleteFailed');
	}
};

module.exports = {
	addTask,
	getAllTasks,
	editTask,
	statusChange,
	deleteTask,
};
