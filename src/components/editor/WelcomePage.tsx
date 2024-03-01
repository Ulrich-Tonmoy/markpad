export const WelcomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full divide-y-[1rem] divide-transparent">
      <img src="/logo.png" alt="Markpad" className="size-60" />
      <div className="grid content-center grid-cols-2 text-gray-400">
        <span>Toggle Sidebar</span>
        <span>
          <span className="py-1.5 px-2 m-2 text-sm font-medium rounded-md border bg-gray-800 border-gray-600">
            Ctrl
          </span>
          +
          <span className="py-1.5 px-2 m-2 text-sm font-medium rounded-md border bg-gray-800 border-gray-600">
            E
          </span>
        </span>
      </div>
      <div className="grid content-center grid-cols-2 text-gray-400">
        <span>Toggle Recent</span>
        <span>
          <span className="py-1.5 px-2 m-2 text-sm font-medium rounded-md border bg-gray-800 border-gray-600">
            Ctrl
          </span>
          +
          <span className="py-1.5 px-2 m-2 text-sm font-medium rounded-md border bg-gray-800 border-gray-600">
            R
          </span>
        </span>
      </div>
      <div className="grid content-center grid-cols-2 text-gray-400">
        <span>Toggle Settings</span>
        <span>
          <span className="py-1.5 px-2 m-2 text-sm font-medium rounded-md border bg-gray-800 border-gray-600">
            Ctrl
          </span>
          +
          <span className="py-1.5 px-2 m-2 text-sm font-medium rounded-md border bg-gray-800 border-gray-600">
            ,
          </span>
        </span>
      </div>
      <div className="grid content-center grid-cols-2 text-gray-400">
        <span>Open New Folder</span>
        <span>
          <span className="py-1.5 px-2 m-2 text-sm font-medium rounded-md border bg-gray-800 border-gray-600">
            Ctrl
          </span>
          +
          <span className="py-1.5 px-2 m-2 text-sm font-medium rounded-md border bg-gray-800 border-gray-600">
            O
          </span>
        </span>
      </div>
      <div className="grid content-center grid-cols-2 text-gray-400">
        <span>Create New File</span>
        <span>
          <span className="py-1.5 px-2 m-2 text-sm font-medium rounded-md border bg-gray-800 border-gray-600">
            Ctrl
          </span>
          +
          <span className="py-1.5 px-2 m-2 text-sm font-medium rounded-md border bg-gray-800 border-gray-600">
            N
          </span>
        </span>
      </div>
    </div>
  );
};
