import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTasks } from '../../redux/taskSlice';
import ListCard from './ListCard';
import './tasklist.scss';

const TaskList = () => {
	const auth = useSelector((state) => state.auth);
	const tasks = useSelector((state) => state.task);

	const { currentUser } = auth;
	const { AllTasks } = tasks;

	const formatDate = (date) => {
        const dateObj = moment(date);
        return dateObj.format('DD/MM/YYYY');
    };
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getAllTasks(currentUser.token, currentUser.id));
	}, [dispatch, currentUser.token, currentUser.id]);

	return (
		<div>
			<ul className='list-header'>
				{/* <li><h5>Id</h5></li> */}
				<li><h5>S.No.</h5></li>
				<li><h5>Title</h5></li>
				<li><h5>Description</h5></li>
				{/* <li><h5>Created On</h5></li> */}
				<li><h5>Due Date</h5></li>
				<li><h5>Status</h5></li>
				<li><h5>Action</h5></li>
			</ul>
			{Object.values(AllTasks).map((item) => {
				return <ListCard key={item._id} item={item} />;
			})}
		</div>
	);
};

export default TaskList;
