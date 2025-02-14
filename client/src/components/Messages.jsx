import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function UsersTable() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editedUser, setEditedUser] = useState({ name: "", email: "", address: "", message: "" });
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchUsers = () => {
      axios.get("http://127.0.0.1:8000/api/users")
        .then((response) => {
          const formattedUsers = response.data.map((user) => ({
            _id: user.id,
            name: user.name,
            email: user.email,
            address: user.address || "Non spécifié",
            message: "Aucun message"
          }));
          setUsers(formattedUsers);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Erreur lors du chargement des utilisateurs :", error);
          setLoading(false);
        });
    };

    fetchUsers();
    const interval = setInterval(fetchUsers, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://127.0.0.1:8000/api/delete/user/${id}`)
      .then((response) => {
        console.log("Réponse de suppression :", response);
        setUsers(users.filter((user) => user._id !== id));
      })
      .catch((error) => {
        console.error("Erreur suppression :", error);
      });
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Liste des Utilisateurs</h1>

      <input
        type="text"
        placeholder="Rechercher par nom ou email..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 px-4 py-2 border rounded-lg shadow-md w-full max-w-md"
      />

      {loading ? (
        <p className="text-gray-600">Chargement des utilisateurs...</p>
      ) : (
        <div className="overflow-x-auto w-full max-w-5xl">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="py-2 px-4">S.No.</th>
                <th className="py-2 px-4">Nom</th>
                <th className="py-2 px-4">Email</th>
                <th className="py-2 px-4">Adresse</th>
                <th className="py-2 px-4">Message</th>
                <th className="py-2 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, index) => (
                <tr key={user._id} className="border-b hover:bg-gray-100">
                  <td className="py-2 px-4">{index + 1}</td>
                  <td className="py-2 px-4">{user.name}</td>
                  <td className="py-2 px-4">{user.email}</td>
                  <td className="py-2 px-4">{user.address}</td>
                  <td className="py-2 px-4">{user.message || "Aucun message"}</td>
                  <td className="py-2 px-4 flex gap-2">
                    <Link to={`/update/${user._id}`} className="bg-yellow-500 text-white px-3 py-1 rounded-lg shadow-md hover:bg-yellow-600">
                      <i className="fa-solid fa-pen-to-square"></i>
                    </Link>
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded-lg shadow-md hover:bg-red-600"
                    >
                      🗑 Supprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <Link to="/">
        <button className="mt-4 bg-gray-700 text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-800 transition">
          Retour à l'accueil
        </button>
      </Link>
    </div>
  );
}