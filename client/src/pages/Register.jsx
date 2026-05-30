import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/auth/register", form);

      alert("Registration Successful!");
      navigate("/");
    } catch (err) {
      alert(
        err.response?.data?.message ||
        "Registration Failed"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-10 rounded-3xl shadow-2xl w-96"
      >
        <h1 className="text-4xl font-bold text-center text-purple-600 mb-2">
          Create Account
        </h1>

        <p className="text-center text-gray-500 mb-6">
          Smart Grocery Manager
        </p>

        <input
          type="text"
          placeholder="Full Name"
          className="border p-3 w-full mb-4 rounded-xl"
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        <input
          type="email"
          placeholder="Email"
          className="border p-3 w-full mb-4 rounded-xl"
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-3 w-full mb-4 rounded-xl"
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <button
          type="submit"
          className="bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-xl w-full"
        >
          Register
        </button>

        <p className="text-center mt-4">
          Already have an account?{" "}
          <Link
            to="/"
            className="text-purple-600 font-semibold"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}