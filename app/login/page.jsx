"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import RomanticGlow from "@/components/RomanticGlow";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  async function login() {
    try {
      const res = await fetch("https://server-amado.onrender.com/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!data.token) {
        alert("Erro no login");
        return;
      }

      localStorage.setItem("token", data.token);
      router.push("/");
    } catch (err) {
      console.error(err);
      alert("Erro ao conectar com servidor");
    }
  }

  return (
    <div className="relative h-screen flex items-center justify-center bg-linear-to-b from-pink-100 to-white">
      
      <RomanticGlow />

      <div className="
        relative
        bg-white/80 backdrop-blur-lg
        p-8
        rounded-2xl
        shadow-xl
        w-full
        max-w-sm
        mx-4
        border border-pink-200
      ">

        <h1 className="text-3xl font-bold text-center text-pink-600 mb-2">
          💖 Bem-vindos
        </h1>

        <p className="text-center text-gray-500 mb-6 text-sm">
          Nosso cantinho especial
        </p>

        <input
          placeholder="Email"
          className="
            border border-pink-200
            p-3
            w-full
            mb-3
            rounded-xl
            outline-none
            focus:ring-2
            focus:ring-pink-300
            transition
          "
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          placeholder="Senha"
          type="password"
          className="
            border border-pink-200
            p-3
            w-full
            mb-5
            rounded-xl
            outline-none
            focus:ring-2
            focus:ring-pink-300
            transition
          "
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={login}
          className="
            bg-pink-500
            hover:bg-pink-600
            active:scale-95
            transition
            text-white
            w-full
            p-3
            rounded-xl
            font-semibold
            shadow-md
          "
        >
          Entrar
        </button>

      </div>
    </div>
  );
}