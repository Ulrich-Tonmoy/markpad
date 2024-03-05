import { ShortcutKeys } from "@/libs";

export const WelcomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full divide-y-[1rem] divide-transparent">
      <img src="/logo.png" alt="Markpad" className="size-60" />
      {ShortcutKeys.map((shortcut, index) => (
        <div className="grid content-center grid-cols-2 text-gray-400" key={index}>
          <span>{shortcut.name}</span>
          <span>
            {shortcut.keys.map((key, index) => (
              <>
                <span
                  className="py-1.5 px-2 m-2 text-sm font-medium rounded-md border bg-gray-800 border-gray-600"
                  key={index}
                >
                  {key}
                </span>
                {index < shortcut.keys.length - 1 && "+"}
              </>
            ))}
          </span>
        </div>
      ))}
    </div>
  );
};
