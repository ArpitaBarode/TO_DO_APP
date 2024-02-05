import React, { useState } from 'react';
import { useTodo } from '../contexts/TodoContext';



function TodoForm(props) {
    const [todo, settodo] = useState("");
    const{addTodo}=useTodo();
    const add = (e) => {
        e.preventDefault()
  
        if (!todo) return
  
        addTodo({ todo, completed: false})
        settodo("")
      }
    return (
        <form onSubmit={add} className="flex">
            <input
                type="text"
                placeholder="Write Todo..."
                className={`w-full border border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white/20 py-1.5 ${(props.darktheme===true) ? 'text-pink-400 font-medium': 'text-slate-600' }`}
                value={todo}
                onChange={(e)=>{settodo(e.target.value),console.log(e.target.value);}}
            />
            <button type="submit" className={`rounded-r-lg text-white shrink-01 px-3 py-1 ${
        props.darktheme ? 'bg-green-600 text-white' : 'bg-purple-400 text-white'
    }`  }>
                Add
            </button>
        </form>
    );
}

export default TodoForm;