"use client";

import { motion } from "framer-motion";
import { useState } from "react";

function randomRotation() {
  return Math.random() * 12 - 6;
}

export default function PolaroidPhoto({ src, caption, type }) {
  const [open, setOpen] = useState(false);
  const rotation = randomRotation();

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.9, rotate: rotation }}
        animate={{ opacity: 1, scale: 1, rotate: rotation }}
        whileHover={{ scale: 1.05, rotate: 0 }}
        transition={{ type: "spring", stiffness: 120 }}
        onClick={() => setOpen(true)}
        className="
          bg-white 
          p-3 pb-6 
          rounded-sm 
          cursor-pointer 
          shadow-lg
          w-full 
          max-w-44 
          sm:max-w-56 
          md:max-w-64
        "
      >
        {type === "video" ? (
          <video
            src={src}
            className="w-full h-40 sm:h-44 md:h-48 object-cover rounded-sm"
          />
        ) : (
          <img
            src={src}
            alt="foto"
            className="w-full h-40 sm:h-44 md:h-48 object-cover rounded-sm"
          />
        )}

        {caption && (
          <p className="text-center mt-2 text-gray-600 text-xs sm:text-sm italic">
            {caption}
          </p>
        )}
      </motion.div>

      {/* MODAL */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="
              bg-white 
              rounded-xl 
              p-3 
              sm:p-4 
              max-w-4xl 
              w-full
            "
            onClick={(e) => e.stopPropagation()}
          >
            {type === "video" ? (
              <video
                src={src}
                controls
                className="w-full max-h-[70vh] rounded"
              />
            ) : (
              <img
                src={src}
                className="w-full max-h-[70vh] object-contain rounded"
              />
            )}

            {caption && (
              <p className="text-center mt-3 text-gray-700 text-sm sm:text-base">
                {caption}
              </p>
            )}
          </motion.div>
        </div>
      )}
    </>
  );
}