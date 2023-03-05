function LoadingCards() {
  return (
    <>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((_item, index) => {
        return (
          <div
            key={index}
            className="relative px-8 py-10 transition-all rounded-lg shadow-lg h-72 w-80 group bg-slate-400 animate-pulse">
            <div className="flex gap-2 mb-4">
              <span className="px-2 py-1 text-xs font-bold text-blue-700 bg-blue-200 rounded-full"></span>
            </div>
            <div className="space-y-3">
              <span className="block w-full h-6 bg-slate-600 animate-pulse"></span>
              <span className="block w-full h-6 bg-slate-600 animate-pulse"></span>
              <span className="block w-full h-6 bg-slate-600 animate-pulse"></span>
              <span className="block w-full h-6 bg-slate-600 animate-pulse"></span>
              <span className="block w-3/4 h-6 bg-slate-600 animate-pulse"></span>
            </div>
          </div>
        )
      })}
    </>
  )
}

export { LoadingCards }
