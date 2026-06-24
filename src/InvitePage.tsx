export default function DateInvite() {
  return (
    <main className="min-h-screen bg-[#0b0b10] text-white flex items-center justify-center p-6">
      <div className="max-w-md w-full rounded-3xl border border-white/10 bg-white/5 p-8 text-center shadow-2xl">
        <p className="text-sm text-white/50 mb-3">Official Invitation</p>

        <h1 className="text-4xl font-bold mb-4">Date Request #001</h1>

        <p className="text-white/70 mb-8">
          You have been selected for coffee, laughs, and suspiciously good
          conversation.
        </p>

        <div className="rounded-2xl bg-black/30 border border-white/10 p-5 mb-8 text-left space-y-3">
          <p>
            <span className="text-white/40">Guest:</span> Sofi
          </p>
          <p>
            <span className="text-white/40">Host:</span> Luka
          </p>
          <p>
            <span className="text-white/40">Time:</span> Thursday, 20:00
          </p>
          <p>
            <span className="text-white/40">Place:</span> Somewhere cute
          </p>
        </div>

        <div className="flex gap-3">
          <button className="flex-1 rounded-xl bg-white text-black py-3 font-semibold hover:scale-105 transition">
            Accept
          </button>

          <button
            onClick={() => alert("Decline button is currently unavailable 😌")}
            className="flex-1 rounded-xl border border-white/20 py-3 font-semibold text-white/70 hover:bg-white/10 transition"
          >
            Decline
          </button>
        </div>
      </div>
    </main>
  );
}
