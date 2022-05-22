import React, { useEffect, useState } from "react";
import "./App.css";
import { db } from "./config/firebase-config";
import { collection, getDocs, addDoc,updateDoc,doc,deleteDoc } from "firebase/firestore";

function App() {
  const [newName, setNewName] = useState("");
  const [newAge, setNewAge] = useState(0);

  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, "users");

  const createUser = async () => {
    await addDoc(usersCollectionRef, { name: newName, age: Number(newAge) });
  };

  const updateUser = async (id,age) => {
    const userDoc = doc(db,"users",id)
    const newFields = {age:age+1}
    updateDoc(userDoc, newFields);
  }

  const deleteUser = async (id) => {
    const userDoc = doc(db, "users", id);
    await deleteDoc(userDoc)
  }

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getUsers();
  }, []);

  return (
    <div className="App">
      <input
        type="text"
        placeholder="Name.."
        onChange={(e) => {
          setNewName(e.target.value);
        }}
      />
      <input
        type="number"
        placeholder="Age.."
        onChange={(e) => {
          setNewAge(e.target.value);
        }}
      />

      <button onClick={createUser}>Create User</button>

      <h1>
        {users.map((user) => (
          <div>
            <h1>Name : {user.name}</h1>
            <h1>Age : {user.age}</h1>
            <button onClick={()=> {updateUser(user.id,user.age)}}>Increase Age</button>
            <button onClick={()=>{deleteUser(user.id)}}>Delete</button>
          </div>
        ))}
      </h1>
    </div>
  );
}

export default App;
