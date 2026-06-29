import { useEffect, useState } from "react";

import "./App.css";
import { AnimatePresence, motion, scale } from "framer-motion";
import { useSearchParams } from "react-router-dom";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

function App() {
  const [date, setDate] = useState<Date>();

  const [searchParams] = useSearchParams();

  const gal = searchParams.get("gal");

  const hearts = [
    { emoji: "💖", top: "8%", left: "12%", rotate: -18, size: "text-3xl" },
    { emoji: "💕", top: "18%", left: "72%", rotate: 24, size: "text-4xl" },
    { emoji: "💗", top: "34%", left: "22%", rotate: 12, size: "text-2xl" },
    { emoji: "💘", top: "48%", left: "80%", rotate: -28, size: "text-5xl" },
    { emoji: "💞", top: "62%", left: "10%", rotate: 36, size: "text-4xl" },
    { emoji: "💓", top: "76%", left: "64%", rotate: -12, size: "text-3xl" },
    { emoji: "💝", top: "88%", left: "28%", rotate: 18, size: "text-5xl" },
    { emoji: "💖", top: "12%", left: "46%", rotate: -34, size: "text-2xl" },
    { emoji: "💕", top: "55%", left: "42%", rotate: 14, size: "text-3xl" },
    { emoji: "💗", top: "70%", left: "88%", rotate: 30, size: "text-2xl" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const savedDate = localStorage.getItem("dateInviteTime");

    if (savedDate) {
      setDate(new Date(savedDate));
    }
  }, []);

  const sendInviteResponse = async () => {
    if (!date) return;

    const selectedDate = date.toLocaleString("ka-GE", {
      weekday: "long",
      day: "numeric",
      month: "long",
      hour: "2-digit",
      minute: "2-digit",
    });

    await fetch("https://formspree.io/f/mvzjzbwv", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: gal,
        message: `თანხმობა მიიღებულია 💖 ${selectedDate}`,
        selectedDate,
      }),
    });
  };
  // const handleDateChange = (selectedDate: Date | null) => {
  //   setDate(selectedDate);

  //   if (selectedDate) {
  //     localStorage.setItem("dateInviteTime", selectedDate.toISOString());
  //   }
  // };

  const [declinePosition, setDeclinePosition] = useState({
    x: 0,
    y: 0,
  });

  const rotations = [-12, 8, -6, 10];

  const moveDeclineButton = () => {
    const padding = 100;

    setDeclinePosition({
      x: Math.random() * (window.innerWidth - padding),
      y: Math.random() * (window.innerHeight - padding),
    });
  };

  const [showHearts, setShowHearts] = useState(false);

  const handleAccept = () => {
    setShowHearts(true);

    sendInviteResponse();

    // setTimeout(() => {
    //   setShowHearts(false);
    // }, 2500);
  };
  const text = "10 რამ  რაც შენში მხიბლავს";

  const groups = [["10", "რამ"], ["რითაც"], ["გონებას"], ["მირევ"]];

  const pages: Record<number, React.ReactNode> = {
    0: (
      <>
        <section className="flex items-center  mb-16 justify-center min-h-[420px] w-full">
          <div className="flex flex-col gap-8 md:gap-12">
            {groups.map((pair, pairIndex) => (
              <div key={pairIndex} className="flex space-x-6  mx-auto">
                {pair.map((word, wordIndex) => (
                  <div key={wordIndex} className="leading-none  text-[#d63384]">
                    {word.split("").map((char, charIndex) => {
                      const delay =
                        pairIndex * 0.8 + wordIndex * 0.4 + charIndex * 0.06;

                      return (
                        <motion.span
                          key={charIndex}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            delay,
                            duration: 0.25,
                            ease: "easeOut",
                          }}
                          className="inline-block text-7xl md:text-7xl geo"
                        >
                          {char}
                        </motion.span>
                      );
                    })}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </section>

        <motion.button
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={() => setCurrentIndex((prev) => prev + 1)}
          transition={{ delay: 4, duration: 0.25, ease: "easeOut" }}
          className="text-4xl w-full geo z-9999 bg-pink-300 text-white p-8 px-10 rounded-full mx-auto"
        >
          დაწყება
        </motion.button>
      </>
    ),

    1: (
      <>
        <section className="flex flex-col items-center mb- relativ w-full">
          <h1 className="absolut top-0 left-20 text-3xl text-[#d63384] p-4 rounded-full geo">
            #1 თვალები
          </h1>

          <div className="relative mt h-[360px] w-full max-w-xl">
            {[1, 2, 3, 4].map((_, index) => (
              <motion.img
                key={index}
                src={`/eye${index + 1}.png`}
                alt=""
                initial={{
                  opacity: 0,
                  y: 80,
                  rotate: rotations[index] * 2,
                  scale: 0.7,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  rotate: rotations[index],
                  scale: 1,
                }}
                transition={{
                  delay: index * 1.22,
                  duration: 0.6,
                  type: "spring",
                  stiffness: 180,
                }}
                whileHover={{
                  scale: 1.05,
                  rotate: 0,
                  zIndex: 20,
                }}
                className="absolute  w-64 h-32 rounded-2xl object-cover border-8 border-white shadow-2xl"
                style={{
                  left: `${index * 2}px`,
                  top: `${index * 80}px`,
                }}
              />
            ))}
          </div>
        </section>

        <div className="flex w-full justify-between mt-10">
          <motion.button
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={() => setCurrentIndex((prev) => prev - 1)}
            transition={{ delay: 4, duration: 0.25, ease: "easeOut" }}
            className="text-4xl w-max geo z-[9999] bg-pink-300 text-[#feebf4] p-8  rounded-full mx-auto"
          >
            <FaArrowLeft />
          </motion.button>
          <motion.button
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={() => setCurrentIndex((prev) => prev + 1)}
            transition={{ delay: 4, duration: 0.25, ease: "easeOut" }}
            className="text-4xl w-max geo z-[9999] bg-pink-300 text-[#feebf4] p-8  rounded-full mx-auto"
          >
            <FaArrowRight />
          </motion.button>
        </div>
      </>
    ),
    2: (
      <>
        <section className="flex flex-col items-center mb- relativ w-full">
          <h1 className="absolut top-0 left-20 text-3xl text-[#d63384] p-4 rounded-full geo">
            #2 ღიმილი
          </h1>

          <div className="relative mt h-[360px] w-full max-w-xl">
            {[1, 2, 3, 4].map((_, index) => (
              <motion.img
                key={index}
                src={`/smile${index + 1}.png`}
                alt=""
                initial={{
                  opacity: 0,
                  y: 80,
                  rotate: rotations[index] * 2,
                  scale: 0.7,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  rotate: rotations[index],
                  scale: 1,
                }}
                transition={{
                  delay: index * 1.22,
                  duration: 0.6,
                  type: "spring",
                  stiffness: 180,
                }}
                whileHover={{
                  scale: 1.05,
                  rotate: 0,
                  zIndex: 20,
                }}
                className="absolute  w-64 h-32 rounded-2xl object-cover border-8 border-white shadow-2xl"
                style={{
                  left: `${index * 2}px`,
                  top: `${index * 80}px`,
                }}
              />
            ))}
          </div>
        </section>

        <div className="flex w-full justify-between mt-10">
          <motion.button
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={() => setCurrentIndex((prev) => prev - 1)}
            transition={{ delay: 4, duration: 0.25, ease: "easeOut" }}
            className="text-4xl w-max geo z-[9999] bg-pink-300 text-[#feebf4] p-8  rounded-full mx-auto"
          >
            <FaArrowLeft />
          </motion.button>
          <motion.button
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={() => setCurrentIndex((prev) => prev + 1)}
            transition={{ delay: 4, duration: 0.25, ease: "easeOut" }}
            className="text-4xl w-max geo z-[9999] bg-pink-300 text-[#feebf4] p-8  rounded-full mx-auto"
          >
            <FaArrowRight />
          </motion.button>
        </div>
      </>
    ),
    3: (
      <>
        <section className="flex flex-col items-center mb- relativ w-full">
          <h1 className=" text-3xl text-[#d63384] p-4 rounded-full geo">
            #3 თმა
          </h1>

          <div className="relative mt h-[360px] w-full max-w-xl">
            {[1, 2, 3, 4].map((_, index) => (
              <motion.img
                key={index}
                src={`/hair${index + 1}.png`}
                alt=""
                initial={{
                  opacity: 0,
                  y: 80,
                  rotate: rotations[index] * 2,
                  scale: 0.7,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  rotate: rotations[index],
                  scale: 1,
                }}
                transition={{
                  delay: index * 1.22,
                  duration: 0.6,
                  type: "spring",
                  stiffness: 180,
                }}
                whileHover={{
                  scale: 1.05,
                  rotate: 0,
                  zIndex: 20,
                }}
                className="absolute  w-64 h-32 rounded-2xl object-cover border-8 border-white shadow-2xl"
                style={{
                  left: `${index * 2}px`,
                  top: `${index * 80}px`,
                }}
              />
            ))}
          </div>
        </section>

        <div className="flex w-full justify-between mt-10">
          <motion.button
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={() => setCurrentIndex((prev) => prev - 1)}
            transition={{ delay: 4, duration: 0.25, ease: "easeOut" }}
            className="text-4xl w-max geo z-[9999] bg-pink-300 text-[#feebf4] p-8  rounded-full mx-auto"
          >
            <FaArrowLeft />
          </motion.button>
          <motion.button
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={() => setCurrentIndex((prev) => prev + 1)}
            transition={{ delay: 4, duration: 0.25, ease: "easeOut" }}
            className="text-4xl w-max geo z-[9999] bg-pink-300 text-[#feebf4] p-8  rounded-full mx-auto"
          >
            <FaArrowRight />
          </motion.button>
        </div>
      </>
    ),
    4: (
      <>
        <motion.section className="flex flex-col items-center mb- relativ w-full">
          <h1 className="  text-center left-0 text-3xl text-[#d63384] p-4 rounded-full geo">
            ყველაზე მეტად იცი რა მაჯადოებს?
          </h1>
        </motion.section>

        <div className="flex w-full justify-between mt-10">
          <motion.button
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={() => setCurrentIndex((prev) => prev + 1)}
            transition={{ delay: 1, duration: 0.25, ease: "easeOut" }}
            className="text-4xl w-max geo z-[9999] bg-pink-300 text-white p-8  rounded-full mx-auto"
          >
            რა?
          </motion.button>
        </div>
      </>
    ),
    5: (
      <>
        <motion.section className="flex flex-col items-center mb-  w-full">
          <h1 className=" top-0 text-center left-0 text-3xl text-[#d63384] p-4 rounded-full geo">
            #4 ეს
          </h1>
        </motion.section>

        <h2 className="absolute bottom-24 text-xs text-center text-gray-700/30">
          ყველა ფოტო ლოკალურად წაშლილია, i'm not a weirdo, my lady :)
        </h2>

        <div className="relative mt h-[360px] rotate-2 w-full max-w-xl">
          <motion.img
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            src="/ani1.png"
            alt=""
            className="border-4 border-pink-300 rounded-xl"
          />
        </div>

        <div className="flex w-full justify-between mt-10">
          <motion.button
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={() => setCurrentIndex((prev) => prev - 1)}
            transition={{ delay: 1, duration: 0.25, ease: "easeOut" }}
            className="text-4xl w-max geo z-[9999] bg-pink-300 text-[#feebf4] p-8  rounded-full mx-auto"
          >
            <FaArrowLeft />
          </motion.button>
          <motion.button
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={() => setCurrentIndex((prev) => prev + 1)}
            transition={{ delay: 1, duration: 0.25, ease: "easeOut" }}
            className="text-4xl w-max geo z-[9999] bg-pink-300 text-[#feebf4] p-8  rounded-full mx-auto"
          >
            <FaArrowRight />
          </motion.button>
        </div>
      </>
    ),
    6: (
      <>
        <motion.section className="flex flex-col items-center mb- relativ w-full">
          <h1 className=" top-0 text-center left-0 text-3xl text-[#d63384] p-4 rounded-full geo">
            #5 ეს
          </h1>
        </motion.section>

        <h2 className="absolute bottom-24 text-xs text-center text-gray-700/30">
          ყველა ფოტო ლოკალურად წაშლილია, i'm not a weirdo, my lady :)
        </h2>

        <div className="relative mt h-[360px] rotate-2 w-full max-w-xl">
          <motion.img
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            src="/ani2.png"
            alt=""
            className="border-4 border-pink-300 rounded-xl"
          />
        </div>

        <div className="flex w-full justify-between mt-10">
          <motion.button
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={() => setCurrentIndex((prev) => prev - 1)}
            transition={{ delay: 1, duration: 0.25, ease: "easeOut" }}
            className="text-4xl w-max geo z-[9999] bg-pink-300 text-[#feebf4] p-8  rounded-full mx-auto"
          >
            <FaArrowLeft />
          </motion.button>
          <motion.button
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={() => setCurrentIndex((prev) => prev + 1)}
            transition={{ delay: 1, duration: 0.25, ease: "easeOut" }}
            className="text-4xl w-max geo z-[9999] bg-pink-300 text-[#feebf4] p-8  rounded-full mx-auto"
          >
            <FaArrowRight />
          </motion.button>
        </div>
      </>
    ),
    7: (
      <>
        <motion.section className="flex flex-col items-center mb- relativ w-full">
          <h1 className=" top-0 text-center left-0 text-3xl text-[#d63384] p-4 rounded-full geo">
            #6 ეს
          </h1>
        </motion.section>

        <h2 className="absolute bottom-24 text-xs text-center text-gray-700/30">
          ყველა ფოტო ლოკალურად წაშლილია, i'm not a weirdo, my lady :)
        </h2>
        <div className="relative mt h-[360px] rotate-2 w-full max-w-xl">
          <motion.img
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            src="/ani3.png"
            alt=""
            className="border-4 border-pink-300 rounded-xl"
          />
        </div>

        <div className="flex w-full justify-between mt-10">
          <motion.button
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={() => setCurrentIndex((prev) => prev - 1)}
            transition={{ delay: 1, duration: 0.25, ease: "easeOut" }}
            className="text-4xl w-max geo z-[9999] bg-pink-300 text-[#feebf4] p-8  rounded-full mx-auto"
          >
            <FaArrowLeft />
          </motion.button>
          <motion.button
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={() => setCurrentIndex((prev) => prev + 1)}
            transition={{ delay: 1, duration: 0.25, ease: "easeOut" }}
            className="text-4xl w-max geo z-9999 bg-pink-300 text-[#feebf4] p-8  rounded-full mx-auto"
          >
            <FaArrowRight />
          </motion.button>
        </div>
      </>
    ),
    8: (
      <>
        <motion.section className="flex flex-col items-center mb- relativ w-full">
          <h1 className=" top-0 text-center left-0 text-3xl text-[#d63384] p-4 rounded-full geo">
            #7 ეს
          </h1>
        </motion.section>

        <div className="relative mt h-[360px] rotate-270 scale-90 w-full max-w-xl">
          <motion.img
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            src="/ani4.png"
            alt=""
            className="border-4 border-pink-300 rounded-xl"
          />
        </div>

        <div className="flex w-full justify-between mt-10">
          <motion.button
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={() => setCurrentIndex((prev) => prev - 1)}
            transition={{ delay: 1, duration: 0.25, ease: "easeOut" }}
            className="text-4xl w-max geo z-[9999] bg-pink-300 text-[#feebf4] p-8  rounded-full mx-auto"
          >
            <FaArrowLeft />
          </motion.button>
          <motion.button
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={() => setCurrentIndex((prev) => prev + 1)}
            transition={{ delay: 1, duration: 0.25, ease: "easeOut" }}
            className="text-4xl w-max geo z-[9999] bg-pink-300 text-[#feebf4] p-8  rounded-full mx-auto"
          >
            <FaArrowRight />
          </motion.button>
        </div>
      </>
    ),
    9: (
      <>
        <motion.section className="flex flex-col items-center mb- relativ w-full">
          <h1 className=" top-0 text-center left-0 text-3xl text-[#d63384] p-4 rounded-full geo">
            #8 ეს
          </h1>
        </motion.section>

        <div className="relative mt h-[360px] rotate-2 w-full max-w-xl">
          <motion.img
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            src="/ani5.png"
            alt=""
            className="border-4 border-pink-300 rounded-xl"
          />
        </div>

        <div className="flex w-full justify-between mt-10">
          <motion.button
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={() => setCurrentIndex((prev) => prev - 1)}
            transition={{ delay: 1, duration: 0.25, ease: "easeOut" }}
            className="text-4xl w-max geo z-9999 bg-pink-300 text-[#feebf4] p-8  rounded-full mx-auto"
          >
            <FaArrowLeft />
          </motion.button>
          <motion.button
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={() => setCurrentIndex((prev) => prev + 1)}
            transition={{ delay: 1, duration: 0.25, ease: "easeOut" }}
            className="text-4xl w-max geo z-9999 bg-pink-300 text-[#feebf4] p-8  rounded-full mx-auto"
          >
            <FaArrowRight />
          </motion.button>
        </div>
      </>
    ),
    10: (
      <>
        <motion.section className="flex flex-col items-center mb- relativ w-full">
          <h1 className=" top-0 text-center left-0 text-3xl text-[#d63384] p-4 rounded-full geo">
            #9 ეს
          </h1>
        </motion.section>

        <div className="relative mt h-[360px] rotate-2 w-full max-w-xl">
          <motion.img
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            src="/ani6.png"
            alt=""
            className="border-4 border-pink-300 rounded-xl"
          />
        </div>

        <div className="flex w-full justify-between mt-10">
          <motion.button
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={() => setCurrentIndex((prev) => prev - 1)}
            transition={{ delay: 1, duration: 0.25, ease: "easeOut" }}
            className="text-4xl w-max geo z-[9999] bg-pink-300 text-[#feebf4] p-8  rounded-full mx-auto"
          >
            <FaArrowLeft />
          </motion.button>
          <motion.button
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={() => setCurrentIndex((prev) => prev + 1)}
            transition={{ delay: 1, duration: 0.25, ease: "easeOut" }}
            className="text-4xl w-max geo z-[9999] bg-pink-300 text-[#feebf4] p-8  rounded-full mx-auto"
          >
            <FaArrowRight />
          </motion.button>
        </div>
      </>
    ),
    11: (
      <>
        <motion.section className="flex flex-col items-center mb- relativ w-full">
          <h1 className="  text-center left-0 text-3xl text-[#d63384] p-4 rounded-full geo">
            #10 და აი ეს
            <h3 className="text-sm w-full">
              კი, 10%-ითაც თუ ჩანხარ მაინც მაჯადოებ
            </h3>
          </h1>
        </motion.section>

        <div className="relative mt-8 h-[360px] rotate-2 w-full max-w-xl">
          <motion.img
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            src="/ani7.png"
            alt=""
            className="border-4 border-pink-300 rounded-xl"
          />
        </div>

        <div className="flex w-full justify-between mt-10">
          <motion.button
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={() => setCurrentIndex((prev) => prev - 1)}
            transition={{ delay: 1, duration: 0.25, ease: "easeOut" }}
            className="text-4xl w-max geo z-[9999] bg-pink-300 text-[#feebf4] p-8  rounded-full mx-auto"
          >
            <FaArrowLeft />
          </motion.button>
          <motion.button
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={() => setCurrentIndex((prev) => prev + 1)}
            transition={{ delay: 1, duration: 0.25, ease: "easeOut" }}
            className="text-4xl w-max geo z-[9999] bg-pink-300 text-[#feebf4] p-8  rounded-full mx-auto"
          >
            <FaArrowRight />
          </motion.button>
        </div>
      </>
    ),

    12: (
      <>
        <motion.section className="flex flex-col items-center mb- relativ w-full">
          <h1 className=" text-center left-15 text-3xl text-[#d63384] p-4 rounded-full geo">
            მოცლილი ვარ?
          </h1>
          <h3 className=" text-center text-sm text-[#d63384] p-4 rounded-full geo">
            1000-ში ერთხელ, მოჯადოების შემთხვევაში
          </h3>
        </motion.section>

        <div className="flex w-full justify-between mt-10">
          <motion.button
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={() => setCurrentIndex((prev) => prev + 1)}
            transition={{ delay: 1, duration: 0.25, ease: "easeOut" }}
            className="text-4xl w-max geo z-[9999] bg-pink-300 text-white p-8  rounded-full mx-auto"
          >
            <FaArrowRight />
          </motion.button>
        </div>
      </>
    ),
    13: (
      <>
        <motion.section className="flex flex-col items-center mb- relativ w-full">
          <h1 className="  text-center left-15 text-3xl text-[#d63384] p-4 rounded-full geo">
            რა დრო დამჭირდა?
          </h1>
          <h3 className="  text-center text-sm text-[#d63384] p-4 rounded-full geo">
            დაახლოებით 5 საათი
          </h3>
          <div className="flex justify-center">
            <img
              src="https://c.tenor.com/RTYqYS6iGhIAAAAC/tenor.gif"
              alt="Tenor GIF"
              className="w-72 rounded-2xl mx-auto"
            />
          </div>
        </motion.section>

        <div className="flex w-full justify-between mt-10">
          <motion.button
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={() => setCurrentIndex((prev) => prev + 1)}
            transition={{ delay: 1, duration: 0.25, ease: "easeOut" }}
            className="text-4xl w-max geo z-[9999] bg-pink-300 text-white p-8  rounded-full mx-auto"
          >
            <FaArrowRight />
          </motion.button>
        </div>
      </>
    ),
    14: (
      <>
        <motion.section className="flex flex-col items-center mb- relativ w-full">
          <h1 className="  text-center left-15 text-3xl text-[#d63384] p-4 rounded-full geo">
            დავიღალე?
          </h1>
          <h3 className="  text-center text-sm text-[#d63384] p-4 rounded-full geo">
            არა, ვაფშე
          </h3>
          <div className="flex justify-center">
            <img
              src="https://c.tenor.com/jTEW-kIy_toAAAAd/tenor.gif"
              alt="Tenor GIF"
              className="w-72 rounded-2xl mx-auto"
            />
          </div>
        </motion.section>

        <div className="flex w-full justify-between mt-10">
          <motion.button
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={() => setCurrentIndex((prev) => prev + 1)}
            transition={{ delay: 1, duration: 0.25, ease: "easeOut" }}
            className="text-4xl w-max geo z-[9999] bg-pink-300 text-white p-8  rounded-full mx-auto"
          >
            <FaArrowRight />
          </motion.button>
        </div>
      </>
    ),
    15: (
      <>
        <motion.section className="flex flex-col items-center mb- relativ w-full">
          <h1 className="  text-center left-15 text-3xl text-[#d63384] p-4 rounded-full geo">
            ღირდა?
          </h1>
          <h3 className="  text-center text-sm text-[#d63384] p-4 rounded-full geo">
            ყოველი წამი
          </h3>
        </motion.section>

        <div className="flex w-full justify-between mt-10">
          <motion.button
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={() => setCurrentIndex((prev) => prev + 1)}
            transition={{ delay: 1, duration: 0.25, ease: "easeOut" }}
            className="text-4xl w-max geo z-[9999] bg-pink-300 text-white p-8  rounded-full mx-auto"
          >
            <FaArrowRight />
          </motion.button>
        </div>
      </>
    ),
    16: (
      <>
        <motion.section className="flex flex-col items-center mb- relativ w-full">
          <h1 className="  text-center left-15 text-3xl text-[#d63384] p-4 rounded-full geo">
            ცხოვრებაში პირველად მომაწვა მსგავსი simp-ობის სურვილი, ვამაყობ
          </h1>
        </motion.section>

        <div className="flex w-full justify-between mt-10">
          <motion.button
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={() => setCurrentIndex((prev) => prev + 1)}
            transition={{ delay: 1, duration: 0.25, ease: "easeOut" }}
            className="text-4xl w-max geo z-[9999] bg-pink-300 text-white p-8  rounded-full mx-auto"
          >
            <FaArrowRight />
          </motion.button>
        </div>
      </>
    ),
    17: (
      <>
        <motion.section className="flex flex-col items-center mb- relativ w-full">
          <h1 className="  text-center left-15 text-5xl text-[#d63384] p-4 rounded-full geo">
            რატომ?
          </h1>
        </motion.section>

        <div className="flex w-full justify-between mt-10">
          <motion.button
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={() => setCurrentIndex((prev) => prev + 1)}
            transition={{ delay: 1, duration: 0.25, ease: "easeOut" }}
            className="text-4xl w-max geo z-9999 bg-pink-300 text-white p-8  rounded-full mx-auto"
          >
            <FaArrowRight />
          </motion.button>
        </div>
      </>
    ),
    18: (
      <>
        <motion.section className="flex flex-col items-center mb- relativ w-full">
          <h1 className="  text-center left-15 text-xl text-[#d63384] p-4 rounded-full geo">
            გულრფელად, bs-ის გარეშე, რაღაც ნაპერწკალის მსგავსი ვიგრძენი, არ ვიცი
          </h1>
        </motion.section>

        <div className="flex w-full justify-between mt-10">
          <motion.button
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={() => setCurrentIndex((prev) => prev + 1)}
            transition={{ delay: 1, duration: 0.25, ease: "easeOut" }}
            className="text-4xl w-max geo z-9999 bg-pink-300 text-white p-8  rounded-full mx-auto"
          >
            <FaArrowRight />
          </motion.button>
        </div>
      </>
    ),
    19: (
      <>
        <motion.section className="flex flex-col items-center mb- relativ w-full">
          <h1 className="  text-center left-15 text-xl text-[#d63384] p-4 rounded-full geo">
            უცნობი ადამიანის მიმართ ძაან deep განცხადებებს ვაკეთებ, ვიცი, მარა
            გული მაგას მკარნახობს
          </h1>
        </motion.section>

        <div className="flex w-full justify-between mt-10">
          <motion.button
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={() => setCurrentIndex((prev) => prev + 1)}
            transition={{ delay: 1, duration: 0.25, ease: "easeOut" }}
            className="text-4xl w-max geo z-9999 bg-pink-300 text-white p-8  rounded-full mx-auto"
          >
            <FaArrowRight />
          </motion.button>
        </div>
      </>
    ),

    20: (
      <>
        <motion.section className="flex flex-col items-center mb- relativ w-full">
          <h1 className="  text-center left-15 text-xl text-[#d63384] p-4 rounded-full geo">
            ერთმა ჭკვიანმა ტიპმა თქვა, თუ გულის სიღრმეში რაღაცას იგრძნობ, ნაბიჯი
            უნდა გადადგაო, ჰოდა, ზუსტად მაგას ვაკეთებ.
            <span className="italic">
              'Every beautiful story begins with someone deciding to try.'
            </span>
          </h1>
        </motion.section>

        <div className="flex w-full justify-between mt-10">
          <motion.button
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={() => setCurrentIndex((prev) => prev + 1)}
            transition={{ delay: 1, duration: 0.25, ease: "easeOut" }}
            className="text-4xl w-max geo z-9999 bg-pink-300 text-white p-8  rounded-full mx-auto"
          >
            <FaArrowRight />
          </motion.button>
        </div>
      </>
    ),
    21: (
      <>
        <motion.section className="flex flex-col items-center mb- relativ w-full">
          <h1 className="  text-center left-15 text-xl text-[#d63384] p-4 rounded-full geo">
            აი თბილისში რო ჩამოხვალ და 'დეითზე' წავალთ, ჩემს გულწრფელობას
            მიხვდები 🙃
          </h1>
        </motion.section>

        <div className="mt-8 flex gap-3">
          <AnimatePresence>
            {showHearts && (
              <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
                {[...Array(124)].map((_, i) => (
                  <motion.span
                    key={i}
                    initial={{
                      opacity: 0,
                      scale: 0,
                      x: "50vw",
                      y: "150vh",
                    }}
                    animate={{
                      opacity: [0, 1, 1, 0],
                      scale: [0, 1.4, 1, 0.8],
                      x: `${Math.random() * 100}vw`,
                      y: `${Math.random() * 40}vh`,
                      rotate: Math.random() * 80 - 40,
                    }}
                    exit={{ opacity: 0, scale: 0 }}
                    transition={{
                      duration: 1.8,
                      delay: i * 0.06,
                      ease: "easeOut",
                    }}
                    className="absolute text-3xl"
                  >
                    💖
                  </motion.span>
                ))}
              </div>
            )}
          </AnimatePresence>
          <button
            onClick={handleAccept}
            className="flex-1 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold hover:scale-105 transition"
          >
            {showHearts ? "დეითი ძალაშია, luv u" : "თანხმობა 💖"}
          </button>

          {!showHearts && (
            <button
              onMouseEnter={moveDeclineButton}
              onClick={moveDeclineButton}
              style={{
                left: declinePosition.x,
                top: declinePosition.y,
              }}
              className={`${declinePosition.x > 0 && declinePosition.y > 0 ? "fixed" : ""}  transition-all duration-300 py-3 px-6 rounded-xl border border-pink-300 bg-white text-pink-500 font-semibold shadow-lg`}
            >
              უარყოფა
            </button>
          )}
        </div>
      </>
    ),

    // 2: (
    //   <>
    //     Add future page here
    //   </>
    // ),
  };

  return (
    <main className="min-h-screen flex-col  bg-gradient-to-br from-pink-100 via-rose-50 to-pink-200 flex items-center pt-30  p-6 relative overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: -200 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{
            opacity: 0,
            x: 200,
            position: "absolute",
          }}
          transition={{ duration: 0.6 }}
        >
          {pages[currentIndex]}
        </motion.div>
      </AnimatePresence>

      <AnimatePresence>
        {showHearts && (
          <div className="fixed inset-0 pointer-events-none overflow-hidden z-[999]">
            {[...Array(230)].map((_, i) => (
              <motion.span
                key={i}
                initial={{
                  opacity: 0,
                  scale: 0,
                  x: "50vw",
                  y: "150vh",
                }}
                animate={{
                  opacity: [0, 1, 1, 0],
                  scale: [0, 1.4, 1, 0.8],
                  x: `${Math.random() * 100}vw`,
                  y: `${Math.random() * 40}vh`,
                  rotate: Math.random() * 80 - 40,
                }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{
                  duration: 1.8,
                  delay: i * 0.26,
                  ease: "easeOut",
                }}
                className="absolute text-3xl"
              >
                💖
              </motion.span>
            ))}
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}

export default App;
