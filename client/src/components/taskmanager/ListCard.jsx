/* eslint-disable react/prop-types */
import './listcard.scss';
import { BiChevronLeft, BiChevronRight, BiTrash } from 'react-icons/bi';
import { arrowClick, deleteItem } from '../../redux/taskSlice';
import { useDispatch } from 'react-redux';

const ListCard = (items) => {
	const { item } = items;

	const dispatch = useDispatch();

	const ArrowClick = (string) => {
		dispatch(arrowClick(item, string));
	};
	const handleDelete = () => {
		dispatch(deleteItem(item._id));
	};

	return (
		<div>
			<ul className={` ${item.status === 'Completed' ? 'completed menu' : 'menu'}`}>
				<li>
					<p>{item._id}</p>
				</li>
				<li>
					<p>{item.task}</p>
				</li>
				<li>
					<p>{item.description}</p>
				</li>
				<li>
					<p>{item.dueDate}</p>
				</li>
				<li>
					<p>{item.status}</p>
				</li>
				<li>
					<button
						disabled={item.status === 'New Task'}
						onClick={() => ArrowClick('left')}
					>
						<BiChevronLeft />
					</button>
					<button
						disabled={item.status === 'Completed'}
						onClick={() => ArrowClick('right')}
					>
						<BiChevronRight />
					</button>
					<button onClick={handleDelete}>
						<BiTrash />
					</button>
				</li>
			</ul>
		</div>
	);
};

export default ListCard;
