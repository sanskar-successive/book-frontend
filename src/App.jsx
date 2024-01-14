import Router from "./routes/Router";
import { ErrorBoundary } from "react-error-boundary";


const App = () => {
  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      <Router />
    </ErrorBoundary>

  );
}

export default App;
