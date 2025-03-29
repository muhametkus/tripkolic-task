"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FaUserAlt } from "react-icons/fa";
import { FiLock } from "react-icons/fi";

export default function page() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        userId,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Giriş başarısız. Kullanıcı ID veya şifre hatalı.");
      } else {
        router.push("/profile");
        router.refresh();
      }
    } catch (error) {
      setError("Bir hata oluştu. Lütfen tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-between bg-primary-gray">
      <div className="w-full md:max-w-sm flex flex-2/6 justify-center items-center">
        <div className="flex justify-center items-center">
          <img src="./img/logo.png" alt="Logo" className="w-[60%] md:w-[70%]" />
        </div>
      </div>

      <div className="w-full md:max-w-sm flex flex-3/6">
        <div className="w-full max-w-sm mx-auto px-7 md:px-0">
          <h2 className="text-2xl font-semibold text-center text-primary-orange mb-8">
            LOG IN
          </h2>

          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <input
                type="text"
                placeholder="User ID"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                className="w-full px-5 py-2 rounded-lg border bg-white border-gray-200 shadow-lg pl-14"
                required
              />
              <FaUserAlt className="text-3xl text-gray-700 absolute left-3 top-[6px]" />
            </div>

            <div className="relative">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-5 py-2 rounded-lg border bg-white border-gray-200 shadow-lg pl-14"
                required
              />
              <FiLock className="text-3xl text-gray-700 absolute left-3 top-[6px]" />
            </div>

            <div className="text-left underline my-6 mb-12 ml-2">
              <a href="#" className="text-lg text-black hover:text-gray-800">
                Forgot Password
              </a>
            </div>

            <div className="w-full px-3 flex justify-center">
              <button
                type="submit"
                disabled={loading}
                className={`w-full mx-auto bg-orange-400 text-white py-3 rounded-lg
                  ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-orange-500'}
                  transition duration-200`}
              >
                {loading ? 'Logging in...' : 'Log In'}
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="w-full md:max-w-sm flex items-center">
        <div className="w-full max-w-sm mx-auto bg-white rounded-t-3xl">
          <p className="text-center text-primary-orange text-xl font-medium my-7">Register as</p>
          <div className="grid grid-cols-2 gap-12 mx-5 my-3">
            <button className="w-full bg-primary-blue text-white text-xl font-medium py-2 rounded-lg">
              Operator
            </button>
            <button className="w-full bg-primary-blue text-white text-xl font-medium py-2 rounded-lg">
              Seller
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
