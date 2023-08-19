import { collection, addDoc, doc, updateDoc, deleteDoc, getDocs ,getDoc} from "firebase/firestore";
import { db } from "../firebaseConfig";

import {
  ADD_TODO,
  FETCH_TODOS,
  DELETE_TODO,
  UPDATE_TODO,
} from "./types";

// Fetch todos for the authenticated user
export const addTodo = (todo) => async (dispatch) => {
  try {
    const docRef = await addDoc(collection(db, 'todos/${userUid}/todos'), todo);
    dispatch({ type: ADD_TODO, payload: { id: docRef.id, ...todo } });
  } catch (error) {
    console.error("Error adding todo: ", error);
  }
};

//delete todos for the authenticated user
export const deleteTodo = (id) => async (dispatch) => {
  try {
  {
      await deleteDoc(doc(db, 'todos/${userUid}/todos', id));
      dispatch({ type: DELETE_TODO, payload: id });
    }
  } catch (error) {
    console.error("Error deleting todo: ", error);
  }
};

// export const fetchTodo = (id) => async (dispatch, getState) => {
//   const userUid = getState().auth.uid;

//   try {
//     const todoRef = doc(getUserTodosCollection(userUid), id);
//     const todoDoc = await getDoc(todoRef);
//     const updatedCompleted = !todoDoc.data().completed;

//     await updateDoc(todoRef, { completed: updatedCompleted });

//     const userTodosCollection = getUserTodosCollection(userUid);
//     const userQuery = query(userTodosCollection, where("userId", "==", userUid));
//     const querySnapshot = await getDocs(userQuery);
//     const todosData = querySnapshot.docs.map((doc) => ({
//       id: doc.id,
//       ...doc.data(),
//     }));

//     dispatch({ type: FETCH_TODOS, payload: todosData });
//   } catch (error) {
//     console.error("Error toggling todo: ", error);
//   }
// };


//edits todos for the authenticated user
export const updateTodo = (id, text) => async (dispatch) => {
  try {
    const todoRef = doc(db, 'todos/${userUid}/todos', id);
    await updateDoc(todoRef, { text });

    dispatch({ type: UPDATE_TODO, payload: { id, text } });
  } catch (error) {
    console.error("Error editing todo: ", error);
  }
};