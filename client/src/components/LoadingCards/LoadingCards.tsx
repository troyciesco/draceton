function LoadingCards() {
  return (
    <>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((_item, index) => {
        return (
          <div
            key={index}
            className="relative px-8 py-10 transition-all shadow-lg drac-radius h-72 w-80 group bg-slate-400 animate-pulse">
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
