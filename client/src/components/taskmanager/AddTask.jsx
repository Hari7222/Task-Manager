// import { useState } from 'react';
// import './addtask.scss';
// import { addTask } from '../../redux/taskSlice';
// import { useDispatch, useSelector } from 'react-redux';

// const AddTask = () => {
// 	const dispatch = useDispatch();
// 	const { auth } = useSelector((state) => ({ ...state }));
// 	const { currentUser } = auth;
// 	const [stateData, setStateData] = useState({
// 		task: '',
//     description:'',
//     dueDate:''
// 	});

// 	const handleChange = (e) => {
// 		setState({
// 			...stateData,
// 			[e.target.name]: e.target.value,
// 		});
// 	};

// 	const handleSubmit = (e) => {
// 		e.preventDefault();
// 		dispatch(addTask(stateData.task,stateData.description, stateData.dueDate, currentUser.id));
// 		setStateData({
// 			task: '',
//       description:'',
//       dueDate:''
// 		});
// 	};

// 	return (
// 		<div>
// 			<div className='addtask'>
// 				<form action='' onSubmit={handleSubmit}>
// 					<input
// 						type='text'
// 						name='task'
// 						placeholder='add your task'
// 						onChange={handleChange}
// 						value={state.task}
// 					/>
					
// 					<button className='button'>Add Task</button>
// 				</form>
// 			</div>
// 		</div>
// 	);
// };

// export default AddTask;

import React, { useState } from 'react';
import './addtask.scss';
import { addTask } from '../../redux/taskSlice';
import { useDispatch, useSelector } from 'react-redux';
import Modal from './Modal'; // Import the Modal component

const AddTask = () => {
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => ({ ...state }));
  const { currentUser } = auth;
  const [modalOpen, setModalOpen] = useState(false);
  const [taskData, setTaskData] = useState({
    task: '',
    description: '',
    dueDate: ''
  });

  const handleChange = (e) => {
    setTaskData({
      ...taskData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addTask(taskData.task, taskData.description, taskData.dueDate, currentUser.id ));
    setTaskData({
      task: '',
      description: '',
      dueDate: ''
    });
    setModalOpen(false);
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div>
      <div className='addtask'>
        <button className='button' onClick={openModal}>Add Task</button>
      </div>
      <Modal isOpen={modalOpen} onRequestClose={closeModal}>
        <h2>Add Task</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="task">Task:</label>
          <input
            type="text"
            id="task"
            name="task"
            placeholder="Enter Title"
            value={taskData.task}
            onChange={handleChange}
            required
          />
          <label htmlFor="description">Description:</label>
          <textarea
            type="text"
            id="description"
            name="description"
            placeholder="Enter description"
            value={taskData.description}
            onChange={handleChange}
            required
          />
          <label htmlFor="dueDate">Due Date:</label>
          <input
            type="date"
            id="dueDate"
            name="dueDate"
            value={taskData.dueDate}
            onChange={handleChange}
            required
          />
          <div className="buttons">
            <button type="submit" className="button">Submit</button>
            <button type="button" className="button" onClick={closeModal}>Cancel</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AddTask;

