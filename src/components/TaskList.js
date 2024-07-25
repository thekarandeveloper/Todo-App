import React, {useState, useEffect} from 'react';
import { getTasks, createTasks, updateTask, deleteTask } from '../api/tasks';


const TaskList = () =>{
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');

    useEffect(()=>{
        const fetchTasks = async ()=>{
            const {data} = await getTasks();
            setTasks(data)
        };
        fetchTasks();
    }, []);

    const handleCreateTask = async () => {
        const {data} = await createTasks({title: newTask});
        setTasks([...tasks,data]);
        setNewTask('');
    }

    const handleUpdateTask = async (id,completed) =>{
        const {data} = await updateTask(id, {completed});
        setTasks(tasks.map(task => (task._id === id ? data : task)));
    }

    const handleDeleteTask = async (id) =>{
        await deleteTask(id);
        setTasks(tasks.filter(task => task._id !== id));
    };

    return (
        <div>
            <h1>TO-DO List</h1>
            <input type='text' value={newTask} onChange={(e)=> setNewTask(e.target.value)} placeholder='Add a new task'/>
            <button onClick={handleCreateTask}>Add Task</button>

            <hr></hr>

            <ul>
                {
                    tasks.map(task =>(
                        <li key={task._id}>
                            <input type='checkbox' checked={task.completed} onChange={()=> handleUpdateTask(task._id, !task.completed)}/>
                            {task.title}
                            <button onClick={()=> handleDeleteTask(task._id)}>Delete</button>
                        </li>
                    ))
                }
            </ul>

        </div>
    )
};

export default TaskList;

