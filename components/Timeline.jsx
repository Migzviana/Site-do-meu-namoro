"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const events = [
  {
    title: "Primeiro encontro ❤️",
    description: "Eu tava tão nervoso nesse dia, querendo causar uma boa impressão, o unico registro que temos desse dia é essa foto lendaria KKKKKK.",
    image: "/images/primeiro-encontro.jpg",
  },
  {
    title: "O dia em que te pedi em namoro 💋",
    description: "Nesse dia, fiquei o dia todo com o proposito de lhe pedir em namoro, foi extasiante pra mim ouvir o sim saindo de sua boca 💖",
    image: "/images/pedido-namoro.jpg",
  },
];

export default function Timeline() {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <div className="mt-16 max-w-xl mx-auto px-4">
      <h2 className="text-2xl font-bold text-center text-pink-500">
        Nossa história
      </h2>

      <div className="relative border-l-2 border-pink-300 mt-10 pl-6">
        {events.map((event, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.2 }}
            className="mb-6 cursor-pointer relative"
            onMouseEnter={() => setActiveIndex(i)}
            onMouseLeave={() => setActiveIndex(null)}
            onClick={() => setActiveIndex(activeIndex === i ? null : i)}
          >
            <div className="absolute w-3 h-3 bg-pink-500 rounded-full -left-4.5 top-2" />
            
            <p className="text-gray-600 font-semibold">{event.title}</p>

            <AnimatePresence>
              {activeIndex === i && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-2 p-4 border rounded-lg bg-pink-50 overflow-hidden"
                >
                  {/* Container responsivo com aspect-ratio */}
                  <div className="w-full aspect-video mb-2">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-contain rounded-md"
                    />
                  </div>
                  <p className="text-gray-700">{event.description}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
}