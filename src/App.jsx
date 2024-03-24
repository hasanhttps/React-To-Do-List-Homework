import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons'
import './App.css';

function App() {

  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [newTaskDesc, setNewTaskDesc] = useState('');

  const handleAdd = () => {
    if (newTask != '' && newTaskDesc != '') {
      setTasks([...tasks, { title : newTask, description : newTaskDesc} ]);
      setNewTask('');
      setNewTaskDesc('');
    }
  }

  useEffect(() => {
    if (tasks.length == 0)
      setTasks(JSON.parse(localStorage.getItem('tasks')));
    else 
      localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks]);

  return (
    <div className="App">

      <span className='slogan'> Just do it.</span>
      
      <div className='todolist'>
        <div className="container" style={{width:400, justifyContent: 'center', position: 'initial'}}>
            <input className="searchbar" style={{width:400}} onChange={(e) => setNewTask(e.target.value)} type="text" placeholder={"Add a task name."}></input>
        </div>
        <div className="container">
            <input className="searchbar" onChange={(e) => setNewTaskDesc(e.target.value)} type="text" placeholder={"Add a task description."}></input>
            <button onClick={handleAdd} className="searchbutton">Confirm</button>
        </div>
      </div>

      <div className='tasks'>
        <p className='tasksLabel'>Tasks</p>
        { tasks.map((task, index) => (
          <div className='task' key={index}>
            <div className='left-section'>
              <p className='task-title'>{task.title}</p>
              <p className='task-desc'>{task.description}</p>
            </div>

            <div className='right-section'>
              <button id='button' className='editBt'>
                <FontAwesomeIcon style={{height: '16px'}} icon={faPen} />
              </button>

              <button id='button' className='removeBt'>
                <FontAwesomeIcon style={{height: '16px'}} icon={faTrash} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
