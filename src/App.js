//useState is used to manage state in data in functional components
//import useState from react
//Decalre hooks at the top level
// useState is variable and a function we get the values by simply destructuring it

import React, { useRef, useState } from 'react'
import './style.css';

//State : data
// uncontrolled {useRef} and controlled{useState} useRef for stopiing re-rendering and u cannot control the data

//localstorage : getItem and setItem

function App() {

  const data = localStorage.getItem('lists') ? JSON.parse(localStorage.getItem('lists')) : [];

//In local storage only strings can be added so we stringify the data in aal three functions
//Check storage in application localstorage
  //JSON.stringify object to string
  //JSON.parse
  const [list, setList] = useState(data)
  // const [newtask, setNewTask] = useRef("")
  const newtask = useRef('');
  const [search , setSearch] = useState('')
  // console.log(list)

  // const newip = (e) => {
  //   setNewTask(e.target.value)
  //   // console.log(e.target.value)
  // }  onChange={(e) => { newip(e) }} <--- this is in place of ref{newtask}

//whenever I add delete and update task localstorage get updated

  const addtask = () => {
    localStorage.setItem('lists' , JSON.stringify([...list, newtask.current.value]))  //value needs to be in string
    setList([...list, newtask.current.value])
    newtask.current.value =''
    // setNewTask('')
    
  }
  const deleteTask=(i)=>{
    // console.log(i)
    const delList = [...list]
    delList.splice(i,1)
    setList(delList)
    localStorage.setItem('lists' ,JSON.stringify(delList))
  }
  const updateTask = (e,i)=>{
    const uptask =[...list];
    uptask.splice(i,1,e.target.value);
    setList(uptask)
    localStorage.setItem('lists' ,JSON.stringify(uptask))
  }
  const keyEnter = (e)=>{
    // console.log(e.key)
    if(e.key === 'Enter'){
      addtask()
    }
  }
  return (
    <div className='App' >
      <div className='search'>
        <input type='text' placeholder='Search Task 🔎' onChange={(e)=>{setSearch(e.target.value)}}/>
      </div>
      <h1 className='heading'>To Do App ⚡</h1>

      <div className='inputs'>
        <input type='text' ref={newtask} onKeyDown={keyEnter}/>   
        <button className='btn' onClick={addtask} >Add Task✅</button>
      </div>
      <div className='container'>
        {
          list.map((val,i) => {
            if(val.toLowerCase().includes(search.toLowerCase())){

              return (
            <div className='list' key={i}>
              <input type='text' onChange={(e)=>{updateTask(e,i)}} value={val}  />
              <span className='icon' onClick={()=>{deleteTask(i)}}>❌</span>
            </div>
            )
            }
            
          })
        }
      </div>

    </div>

  );
}
export default App;
