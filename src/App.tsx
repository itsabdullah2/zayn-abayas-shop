import { Button } from "./components/ui/button";

function App() {
  return (
    <main className="h-dvh flex flex-col items-center justify-center">
      <h1 className="font-bold text-3xl text-gray-900">
        Welcome to the Coffee Break
      </h1>
      <Button
        className="bg-slate-900 cursor-pointer text-white mt-4"
        size={"lg"}
      >
        Get started
      </Button>
    </main>
  );
}

export default App;
