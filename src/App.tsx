import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error(
          "Error fetching users:",
          error instanceof Error && error?.message
        );
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredUsers([]);
      return;
    }

    const filtered = users.filter((user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [searchTerm, users]);

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle search logic here, if needed
  };

  return (
    <section className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSearch}
        className="max-w-md p-8 bg-white shadow-lg rounded-lg"
      >
        <h2 className="text-3xl font-bold text-center mb-8">Search App</h2>
        <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
          <input
            type="text"
            value={searchTerm}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setSearchTerm(e.target.value)
            }
            className="py-3 px-4 w-full focus:outline-none"
            placeholder="Search..."
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-3 text-base font-semibold"
          >
            Search
          </button>
        </div>
      </form>

      <ul className="bg-purple-900 p-2 rounded">
        {filteredUsers.map((user) => (
          <li
            key={user.id}
            className="rounded-lg text-center mb-5 text-white border-b-2 border-white pb-2 text-[.95rem]"
          >
            {user.name}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default App;
