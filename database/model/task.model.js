const mongoose = require('mongoose');

const taskSchema = mongoose.Schema(
	{
		task: { type: String, required: true },
		description: {type:String, required: true},
		// createdDate: {
		// 	type: Date,
		// 	default: Date.now
		//  },
		dueDate: {
			type: Date,
			required: true
		  },
		status: {
			type: String,
			enum: ['New Task', 'Pending', 'In-Process', 'Completed'],
			default: 'New Task',
		},	
		createdBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true
		},
	},
	{ timestamp: true }
);

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;
