import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faTrash, faXmark } from '@fortawesome/free-solid-svg-icons'
import './App.css';

function App() {

  const [index, setIndex] = useState(-1);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [onEdit, setOnEdit] = useState(false);
  const [started, setStarted] = useState(false);
  const [newTaskDesc, setNewTaskDesc] = useState('');

  const handleAdd = () => {
    if (newTask != '' && newTaskDesc != '' && !onEdit) {
      setTasks([...tasks, { title : newTask, description : newTaskDesc} ]);
      setNewTask('');
      setNewTaskDesc('');
    }
    else if (onEdit && newTask != '' && newTaskDesc != ''){
      setTasks(tasks.map((task, i) => {
        if (i == index) {
          task.title = newTask;
          task.description = newTaskDesc;
        }
        return task;
      }))
    }
  }

  const handleRemove = (index) => {
    setTasks(tasks.filter((value, i) => (i != index)))
  }

  const handleEdit = (index) => {
    if (!onEdit){
      setOnEdit(true);
      setIndex(index);
      setNewTask(tasks[index].title);
      setNewTaskDesc(tasks[index].description);
    }
    else{
      setOnEdit(false);
      setIndex(-1);
      setNewTask('');
      setNewTaskDesc('');
    }
  }

  useEffect(() => {
    if (!started){
      setTasks(JSON.parse(localStorage.getItem('tasks')));
      setStarted(true);
    }
    else 
      localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks]);

  return (
    <div className="App">

      <span className='slogan'> Just do it.</span>
      
      <div className='todolist'>
        <div className="container" style={{width:400, justifyContent: 'center', position: 'initial'}}>
            <input className="searchbar" value={newTask} style={{width:400}} onChange={(e) => setNewTask(e.target.value)} type="text" placeholder={"Add a task name."}></input>
        </div>
        <div className="container">
            <input className="searchbar" value={newTaskDesc} onChange={(e) => setNewTaskDesc(e.target.value)} type="text" placeholder={"Add a task description."}></input>
            <button onClick={handleAdd} className="searchbutton">Confirm</button>
        </div>
      </div>

      <div className='tasks'>
        { tasks.length == 0 ? '' : <p className='tasksLabel'>Tasks</p>}
        { tasks.map((task, i) => (
          <div className='task' key={i}>
            <div className='left-section' onClick={() => { 
              let element = document.getElementById("task-desc" +  i.toString());
              if (element.style.textDecoration != 'line-through' ) element.style.textDecoration= 'line-through';
              else element.style.textDecoration = 'none';
            } }>
              <p className='task-title'>{task.title}</p>
              <p className='task-desc' id={"task-desc"+  i.toString()}>{task.description}</p>
            </div>

            <div className='right-section'>
              <button id='button' onClick={() => handleEdit(i)} className='editBt'>
                {onEdit && i == index ? <FontAwesomeIcon style={{height: '16px'}} icon={faXmark}/> : <FontAwesomeIcon style={{height: '16px'}} icon={faPen} />}
              </button>

              <button id='button' onClick={() =>  handleRemove(i)} className='removeBt'>
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
