import { useState, useEffect } from 'react'
import {TodoProvider} from './contexts'
import './App.css'
import TodoForm from './components/TodoForm'
import TodoItem from './components/TodoItem'

function App() {
  const [todos, setTodos] = useState([])
  const [mode, setmode] = useState('light');

  const addTodo = (todo) => {
    setTodos((prev) => [{id: Date.now(), ...todo}, ...prev] )
  }

  const updateTodo = (id, todo) => {
    setTodos((prev) => prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo )))

    
  }

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
  }

  const toggleComplete = (id) => {
    //console.log(id);
    setTodos((prev) => 
    prev.map((prevTodo) => 
      prevTodo.id === id ? { ...prevTodo, 
        completed: !prevTodo.completed } : prevTodo))
  }

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"))

    if (todos && todos.length > 0) {
      setTodos(todos)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])
  
 const togglemode=()=>{
  if(mode=='light'){
    setmode('dark'); 
    let darktheme='true';
    document.getElementById('mode1').style.backgroundColor='black';
  }
  else{
    setmode('light');
    let darktheme='false';
    document.getElementById('mode1').style.backgroundColor='white'
  }
 }


  return (
    <TodoProvider className="w-full" value={{todos, addTodo, updateTodo, deleteTodo, toggleComplete,togglemode}} >
      <div id='mode1' className={` h-screen w-screen py-8 ${mode}`}>
      <button
    className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0"
    onClick={togglemode}
>
<img  src='https://cdn-icons-png.flaticon.com/128/8165/8165773.png'/>
</button>
                <div className={`w-full max-w-2xl mx-auto  px-4 py-3 text-white ${(mode==='light')? 'shadow-lg rounded-xl ' : 'shadow-md rounded-lg'}`}>
                    <h1 className={`text-2xl font-bold text-center mb-8 mt-2 ${(mode==='light')? 'text-slate-900 ' : 'text-white'}`}>Manage Your Todos</h1>
                    <div className="mb-4">
                        {/* Todo form goes here */} 
                        <TodoForm  darktheme={mode === 'dark'} />
                    </div>
                    <div className="flex flex-wrap gap-y-3">
                        {/*Loop and Add TodoItem here */}
                        {todos.map((todo) => (
                          <div key={todo.id}
                          className='w-full'
                          >
                            <TodoItem todo={todo}  darktheme={mode === 'dark'}/>
                          </div>
                        ))}
                    </div>
                </div>
            </div>
    </TodoProvider>
  )
}

export default App