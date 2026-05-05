"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import PolaroidGallery from "@/components/PolaroidGallery";

export default function MonthPage() {
  const params = useParams();
  const id = params?.id ? Number(params.id) : null;

  const router = useRouter();

  const today = new Date();
  const currentMonth = today.getMonth() + 1;
  const isLocked = id > currentMonth;

  const [memories, setMemories] = useState([]);
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const API = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    }
  }, [router]);

  const loadMemories = useCallback(async () => {
    if (!id || isNaN(id)) return;

    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await fetch(`${API}/memories/${id}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      if (!res.ok) throw new Error();

      const data = await res.json();
      setMemories(data);
    } catch (err) {
      console.error(err);
    }
  }, [id]);

  useEffect(() => {
    if (!id) return;
    loadMemories();
  }, [id, loadMemories]);

  async function sendMemory() {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Você precisa estar logado.");
      return;
    }

    if (!text.trim() && !file) {
      alert("Escreva algo ou envie uma mídia");
      return;
    }

    setLoading(true);

    const form = new FormData();
    form.append("text", text);
    form.append("month", id);

    if (file) {
      form.append("media", file);
    }

    try {
      const res = await fetch(`${API}/memories`, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
        },
        body: form,
      });

      if (!res.ok) throw new Error();

      setText("");
      setFile(null);
      setPreview(null);

      await loadMemories();
    } catch (err) {
      console.error(err);
      alert("Erro ao enviar memória");
    }

    setLoading(false);
  }

  if (isLocked) {
    return (
      <div className="h-screen flex items-center justify-center bg-pink-50">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-pink-600 mb-4">
            🔒 Mês bloqueado
          </h1>
          <p className="text-gray-600">Esse mês ainda não chegou</p>
        </div>
      </div>
    );
  }

  const mediaItems = memories
    .filter((m) => m.mediaUrl)
    .map((m) => ({
      src: m.mediaUrl,
      caption: m.message || "",
      type: m.mediaType,
    }));

  const texts = memories.filter((m) => m.message && !m.mediaUrl);

  return (
    <div className="min-h-screen bg-pink-50 p-4 sm:p-6 md:p-10">
      <h1 className="text-3xl sm:text-4xl font-bold text-center text-pink-600 mb-10">
        Memórias do mês {id}
      </h1>

      <div className="max-w-xl mx-auto bg-white/80 backdrop-blur-lg p-5 sm:p-6 rounded-2xl shadow-xl mb-10 border border-pink-200">
        <h2 className="text-lg sm:text-xl font-semibold mb-4 text-pink-600">
          Nova memória 💕
        </h2>

        <textarea
          className="w-full border border-pink-200 rounded-xl p-3 mb-4 resize-none outline-none focus:ring-2 focus:ring-pink-300 transition text-sm sm:text-base"
          placeholder="Escreva algo especial..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <div className="mb-4">
          <label className="flex items-center justify-center gap-2 cursor-pointer border border-dashed border-pink-300 rounded-xl p-4 text-pink-500 hover:bg-pink-50 transition text-sm sm:text-base">
            📸 Escolher foto ou vídeo
            <input
              type="file"
              accept="image/*,video/*"
              onChange={(e) => {
                const selected = e.target.files[0];
                setFile(selected);

                if (selected) {
                  setPreview(URL.createObjectURL(selected));
                }
              }}
              className="hidden"
            />
          </label>

          {file && (
            <p className="text-xs sm:text-sm text-gray-500 mt-2 text-center break-all">
              {file.name}
            </p>
          )}

          {preview && (
            <div className="mt-4 flex justify-center">
              {file?.type.startsWith("video") ? (
                <video
                  src={preview}
                  controls
                  className="w-32 h-32 sm:w-40 sm:h-40 object-cover rounded-xl shadow"
                />
              ) : (
                <img
                  src={preview}
                  alt="preview"
                  className="w-32 h-32 sm:w-40 sm:h-40 object-cover rounded-xl shadow"
                />
              )}
            </div>
          )}
        </div>

        <button
          onClick={sendMemory}
          disabled={loading}
          className="w-full bg-linear-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 active:scale-95 transition text-white p-3 rounded-xl font-semibold shadow-md disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
        >
          {loading ? "Enviando..." : "Postar memória 💖"}
        </button>
      </div>

      {mediaItems.length > 0 && (
        <div>
          <PolaroidGallery items={mediaItems} />
        </div>
      )}

      {texts.length > 0 && (
        <div className="mt-10 max-w-2xl mx-auto space-y-4">
          {texts.map((m) => (
            <div
              key={m.id}
              className="bg-white p-4 rounded-xl shadow text-center"
            >
              <p className="text-gray-700 text-sm sm:text-base">{m.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}