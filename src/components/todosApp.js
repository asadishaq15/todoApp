

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, deleteTodo, updateTodo } from "../actions/todos";
import { db } from "../firebaseConfig";
import { auth } from "../firebaseConfig";
import {
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

const Todos = () => {
  const [todo, setTodo] = useState("");
  const [todoEditing, setTodoEditing] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [isInputValid, setIsInputValid] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(true); 
  const dispatch = useDispatch();
  const userUid = useSelector((state) => state.auth.uid);
  const todos = useSelector((state) => state.todos);

  const userTodosCollection = collection(db, `userTodos`);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedTodo = todo.trim();
    if (trimmedTodo !== "") {
      const newTodo = {
        text: trimmedTodo,
        completed: false,
        userId: auth?.currentUser?.uid,
      };

      try {
        const docRef = await addDoc(userTodosCollection, newTodo);
        newTodo.id = docRef.id;

        dispatch(addTodo(newTodo));
        setTodo("");
        setIsInputValid(false);
      } catch (error) {
        console.error("Error adding document: ", error);
      }
    }
  };

  const handleDeleteTodo = async (id) => {
    if (window.confirm("Are you sure you want to delete this todo?")) {
      try {
        await deleteDoc(doc(userTodosCollection, id));
        dispatch(deleteTodo(id));
      } catch (error) {
        console.error("Error deleting document: ", error);
      }
    }
  };

const handleCompleteTodo=async(id)=>{
  try {
    await deleteDoc(doc(userTodosCollection, id));
    dispatch(deleteTodo(id));
  } catch (error) {
    console.error("Error completing document: ", error);
  }
}
  const submitEdits = async (id) => {
    if (window.confirm("Are you sure you want to submit the edits?")) {
      try {
        const todoRef = doc(userTodosCollection, id);
        await updateDoc(todoRef, { text: editingText });
        dispatch(updateTodo(id, editingText));
        setTodoEditing(null);
        setEditingText("");
      } catch (error) {
        console.error("Error updating document: ", error);
      }
    }
  };

  useEffect(() => {
    const getUserTodos = async () => {
      try {
        const userQuery = query(
          userTodosCollection,
          where("userId", "==", auth?.currentUser?.uid)
        );
        const querySnapshot = await getDocs(userQuery);
        const todosData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        dispatch({ type: "FETCH_TODOS", payload: todosData });
        setIsLoading(false); 
      } catch (error) {
        console.error("Error fetching todos: ", error);
      }
    };

    getUserTodos();
  }, [dispatch, userTodosCollection, userUid]);

  return (
    <div id="todo-list">
      {showForm ? (
        <div className="todo-sub">
          <h1>Make A Todo List</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              onChange={(e) => {
                const inputValue = e.target.value;
                setTodo(inputValue);
                setIsInputValid(inputValue.trim().length > 0);
              }}
              value={todo}
            />
            <button type="submit" disabled={!isInputValid}>
              Add Todo
            </button>
          </form>
        </div>
      ) : (
        <div className="todo-button">
          <button onClick={() => setShowForm(true)}>Create Todo List</button>
        </div>
      )}

      {todos.map((todo) => (
        <div key={todo.id} className="todo-form-size">
         
          <div className="todo-text">
            {todo.id === todoEditing ? (
              <input
                type="text"
                onChange={(e) => setEditingText(e.target.value)}
                value={editingText}
              />
            ) : (
              <div>{todo.text}</div>
            )}
          </div>
          <div className="todo-actions">
            {todo.id === todoEditing ? (
              <button onClick={() => submitEdits(todo.id)}>Submit Edits</button>
            ) : (
              <button onClick={() => setTodoEditing(todo.id)}>Edit</button>
            )}
            <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
            <button onClick={() => handleCompleteTodo(todo.id)}>completed</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Todos;




















































// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { addTodo, deleteTodo, fetchTodo, updateTodo } from "../actions/todos";
// import { db } from "../firebase";
// import { auth } from "../firebase";
// import {
//   collection,
//   addDoc,
//   deleteDoc,
//   updateDoc,
//   doc,
//   getDoc,
// } from "firebase/firestore";

// const Todos = () => {
//   const [todo, setTodo] = useState("");
//   const [todoEditing, setTodoEditing] = useState(null);
//   const [editingText, setEditingText] = useState("");
//   const [isInputValid, setIsInputValid] = useState(false);
//   const [showForm, setShowForm] = useState(false);

//   const dispatch = useDispatch();
//   const userUid = useSelector((state) => state.auth.uid);
//   const todos = useSelector((state) => state.todos);

 
//   const userTodosCollection = collection(db, `todos/${userUid}/todos`);


//   const handleSubmit = async (e) => {
//     e.preventDefault();
  
//     const trimmedTodo = todo.trim();
//     if (trimmedTodo !== "") {
//       const newTodo = {
//         text: trimmedTodo,
//         completed: false,
//       };
  
//       try {
//         const docRef = await addDoc(userTodosCollection, newTodo, newTodo);
//         // Retrieve the auto-generated ID from the document reference
//         newTodo.id = docRef.id;
  
//         dispatch(addTodo(newTodo));
//         setTodo("");
//         setIsInputValid(false);
//       } catch (error) {
//         console.error("Error adding document: ", error);
//       }
//     }
//   };


//  const handleDeleteTodo = async (id) => {
//   if (window.confirm("Are you sure you want to delete this todo?")) {
//     try {
//       await deleteDoc(doc(db, 'todos/${userUid}/todos', id));
//       dispatch(deleteTodo(id));
//     } catch (error) {
//       console.error("Error deleting document: ", error);
//     }
//   }
// };


// const submitEdits = async (id) => {
//   if (window.confirm("Are you sure you want to submit the edits?")) {
//     try {
//       const todoRef = doc(db, 'todos/${userUid}/todos', id);
//       await updateDoc(todoRef, { text: editingText });
//       dispatch(updateTodo(id, editingText));
//       setTodoEditing(null);
//       setEditingText("");
//     } catch (error) {
//       console.error("Error updating document: ", error);
//     }
//   }
// };


//   // const userTodos = todos.filter((todo) => {
//   //   return (
//   //     userUid === auth.currentUser.uid && todo.id.startsWith(userUid)
//   //   );
//   // });

//   return (
//     <div id="todo-list">
//       {showForm ? (
//         <div className="todo-sub">
//           <h1>Make A Todo List</h1>
//           <form onSubmit={handleSubmit}>
//             <input
//               type="text"
//               onChange={(e) => {
//                 const inputValue = e.target.value;
//                 setTodo(inputValue);
//                 setIsInputValid(inputValue.trim().length > 0);
//               }}
//               value={todo}
//             />
//             <button type="submit" disabled={!isInputValid}>
//               Add Todo
//             </button>
//           </form>
//         </div>
//       ) : (
//         <div className="todo-button">
//           <button onClick={() => setShowForm(true)}>Create Todo List</button>
//         </div>
//       )}

// {todos.map((todo) => (
//   <div key={todo.id} className="todo-form-size">
//     <div className="todo-counter">{todo.id}</div>
//     <div className="todo-text">
      
//       {todo.id === todoEditing ? (
//         <input
//           type="text"
//           onChange={(e) => setEditingText(e.target.value)}
//           value={editingText}
//         />
//       ) : (
//         <div>{todo.text}</div>
//       )}
//     </div>
//     <div className="todo-actions">
//       {todo.id === todoEditing ? (
//         <button onClick={() => submitEdits(todo.id)}>Submit Edits</button>
//       ) : (
//         <button onClick={() => setTodoEditing(todo.id)}>Edit</button>
//       )}
//       <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
//     </div>
//   </div>
// ))}

//     </div>
//   );
// };

// export default Todos;
