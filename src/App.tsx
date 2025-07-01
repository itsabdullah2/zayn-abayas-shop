import { Suspense } from "react";
import Loading from "./components/layout/Loading";
import Root from "./Root";
import { Toaster } from "./components/ui/sonner";

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Root />
      <Toaster />
    </Suspense>
  );
}

export default App;
