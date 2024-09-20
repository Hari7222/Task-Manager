import Sidebar from '../../components/sidebar/Sidebar';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './dashboard.scss';
import { useEffect } from 'react';
import { getAllTasks } from '../../redux/taskSlice';
const Dashboard = () => {
	const tasklist = useSelector((state) => state.task);
	const { AllTasks } = tasklist;
	const user = useSelector((state) => state.auth);
	const { currentUser } = user;

	let pendingTask = [];
	let completedTask = [];
	let newTask = [];
	let inProcessTask = [];
	for (let i = 0; i < AllTasks.length; i++) {
		if (AllTasks[i].status === 'New Task') {
			newTask.push(AllTasks[i]);
		} else if (AllTasks[i].status === 'Pending') {
			pendingTask.push(AllTasks[i]);
		}else if (AllTasks[i].status === 'In-Process') {
			inProcessTask.push(AllTasks[i]);
		}else if (AllTasks[i].status === 'Completed') {
			completedTask.push(AllTasks[i]);
		}
	}

	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getAllTasks(currentUser.token, currentUser.id));
	}, [dispatch, currentUser.token, currentUser.id]);

	return (
		<div>
			<div className='dashboard'>
				<div className='dashboard__left'>
					<Sidebar />
				</div>
				<div className='dashboard__right'>
					<div className='dashboard__rightContent'>
						<h2>Task Status Dashboard</h2>
						<div className='taskcount'>
						<div className='todo box'>New Tasks - {newTask.length}</div>
						<div className='todo box'>Pending Tasks - {pendingTask.length}</div>
							<div className='todo box'>In-Process Tasks - {inProcessTask.length}</div>
							<div className='done box'>Completed Tasks - {completedTask.length}</div>
						</div>
						<div className='createButton'>
							<Link to='/taskmanager' className='button'>
								Create Task
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
