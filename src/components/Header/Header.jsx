export default function Header({ completed, total }) {
  return (
    <div>
      {/* TOP BAR — LOGIN / SIGNUP */}
      <div className="bg-gray-50 border-b px-8 py-3 flex justify-end gap-3">
        <button className="px-4 py-2 text-sm border rounded-lg hover:bg-gray-100">
          Login
        </button>
        <button className="px-4 py-2 text-sm bg-black text-white rounded-lg hover:bg-gray-900">
          Signup
        </button>
      </div>

      {/* ORIGINAL HEADER (UNCHANGED DESIGN) */}
      <div className="bg-white px-8 py-6 border-b">
        <div className="grid grid-cols-3 gap-6 items-center">
          {/* LEFT SIDE — Content Block */}
          <div className="col-span-2 space-y-3">
            <h1 className="text-3xl font-bold tracking-tight">SDE Sheet</h1>

            <p className="text-gray-600 text-sm leading-relaxed max-w-3xl">
              A carefully curated collection of Data Structures and Algorithms
              problems to help you build strong problem-solving intuition and
              prepare effectively for software engineering interviews.
            </p>

            <div className="flex items-center gap-4">
              <span className="text-xs text-gray-500">
                Curated for interview-ready minds
              </span>

              <button className="bg-black text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-900 transition">
                Follow Sheet
              </button>
            </div>
          </div>

          {/* RIGHT SIDE — Progress Badge */}
          <div className="flex justify-center">
            <div className="w-28 h-28 rounded-full bg-gray-50 border border-gray-200 flex flex-col items-center justify-center shadow-sm">
              <span className="text-2xl font-bold">{completed}</span>
              <span className="text-gray-500 text-sm">/ {total}</span>
              <span className="text-xs text-gray-400 mt-1">Completed</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
