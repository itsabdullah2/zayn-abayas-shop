import { Suspense } from "react";
import Loading from "./components/layout/Loading";
import Root from "./Root";

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Root />
    </Suspense>
  );
}

export default App;
