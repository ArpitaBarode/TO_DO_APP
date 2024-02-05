import {createContext,useContext} from  "react";


const TodoContext= createContext({
    todos:[{
        id :1,
        todo:"my todo",
        completed:false

    }],
    addTodo:(todo)=>{},
    updateTodo:(todo,id)=>{},
    deleteTodo:(todo)=>{},
    toggleComplete:(id)=>{},
    togglemode:()=>{}
});

export const useTodo =()=>{
    return useContext(TodoContext)
}
 
export const TodoProvider= TodoContext.Provider