import { useEffect, useState } from "react";

import "./App.css";
import { AnimatePresence, motion } from "framer-motion";
import { useSearchParams } from "react-router-dom";

function App() {
  const [date, setDate] = useState<Date>();

  const [searchParams] = useSearchParams();

  const gal = searchParams.get("gal");

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

  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-100 via-rose-50 to-pink-200 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Floating hearts */}
      <div className="absolute top-20 left-20 text-pink-300 text-4xl animate-bounce">
        💖
      </div>

      <div className="absolute bottom-24 right-20 text-pink-400 text-5xl animate-pulse">
        💕
      </div>

      <div className="absolute top-1/3 right-32 text-pink-300 text-3xl animate-bounce">
        💗
      </div>

      <div className="max-w-md w-full bg-white/80 backdrop-blur-lg border border-pink-200 rounded-3xl p-8 shadow-2xl">
        <div className="text-center">
          <div className="text-5xl mb-4">💌</div>

          {/* <p className="text-pink-500 font-medium">
         
          </p> */}

          <h1 className="text-4xl font-bold text-rose-600 mt-2">
            'დეითი' ლუკასთან
          </h1>

          <p className="text-gray-600 mt-4">
            მოგესალმებით {gal ? `ქალბატონო ${gal}` : ""} ✨
          </p>
        </div>

        <div className="mt-8 rounded-2xl bg-pink-50 border border-pink-100 p-5 space-y-3">
          <p>
            <span className="font-semibold text-pink-500">სტუმარი:</span> {gal}
          </p>

          <p>
            <span className="font-semibold text-pink-500">მასპინძელი:</span>{" "}
            ლუკა
          </p>

          <div className="mt-8 rounded-2xl bg-pink-50/80 border border-pink-100 p-5 space-y-5">
            <div>
              <label className="block text-sm font-semibold text-pink-500 mb-2">
                აირჩიე თარიღი და დრო 💕
              </label>

              <input
                type="date"
                value={date ? date.toISOString().split("T")[0] : ""}
                onChange={(e) => {
                  const value = e.target.value;
                  setDate(value ? new Date(value) : undefined);
                }}
                className="w-full h-14 rounded-2xl border border-pink-200 bg-pink-50 px-4 text-base text-gray-700 outline-none focus:ring-2 focus:ring-pink-300"
              />
            </div>
            {date && (
              <p className="mt-4 rounded-2xl border px-4 py-3 text-sm font-semibold text-rose-600">
                {date.toLocaleDateString("ka-GE", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                })}
              </p>
            )}

            <p className="text-gray-700">
              <span className="font-semibold text-pink-500">ლოკაცია:</span>{" "}
              სტამბა / ლოლიტა{" "}
              <span className="text-gray-400">
                (ქალბატონთან შეთანხმებით 🙃)
              </span>
            </p>
          </div>

          {/* <p>
            <span className="font-semibold text-pink-500">Location:</span>{" "}
            სტამბა/ლოლიტა (ქალბატონთან შეთანხმებით 🙃)
          </p> */}
        </div>

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
            {showHearts ? "დეითი ძალაშია, გმადლობთ" : "თანხომბა 💖"}
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

        <p className="text-center text-xs text-gray-400 mt-6">
          ფრთხილად: თანხმობა 100%-ით გარანტირებული შეყვარებას მოასწავებს
        </p>
      </div>
    </main>
  );
}

export default App;
