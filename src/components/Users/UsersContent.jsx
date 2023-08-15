import Loader from "../Loader/Loader";
import { useEffect, useState } from "react";
import UsersTable from "./UsersTable";
import axios from "axios";
import EditUserForm from "./EditUserForm";

const UsersContent = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/users`);

        setLoading(false);
        setData(response.data);
      } catch (error) {
        console.log(error); //PROGRAMAR ERROR.
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditingUser(null);
  };
  const handleSaveEdit = async (editedUser) => {
    try {
      const response = await axios.put(
        `http://localhost:3001/users/${editedUser._id}`,
        {
          name: editedUser.name,
          lastName: editedUser.lastName,
          email: editedUser.email,
        }
      );

      if (response.status === 200) {
        const updatedUsers = data.map((user) =>
          user._id === editedUser._id ? editedUser : user
        );
        setData(updatedUsers);
        setIsEditing(false);
        setEditingUser(null);
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };
  const handleEditUser = (userId) => {
    const userToEdit = data.find((user) => user._id === userId);
    console.log(userToEdit);
    console.log("aqui");
    setEditingUser(userToEdit);
    setIsEditing(true);

    console.log(editingUser);
    console.log(isEditing);
  };
  return (
    <div className="">
      {loading && <Loader />}
      {data ? (
        isEditing ? (
          <EditUserForm
            user={editingUser}
            onCancel={handleCancelEdit}
            onSave={handleSaveEdit}
          />
        ) : (
          <UsersTable
            users={data}
            onEditUser={handleEditUser}
            setUsers={setData}
          />
        )
      ) : null}
    </div>
  );
};

export default UsersContent;
