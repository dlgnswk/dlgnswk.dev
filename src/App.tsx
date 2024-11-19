import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Header } from "./components/Header";
import { Main } from "./components/Main";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <div className="mx-auto mt-4 w-full sm:w-full md:w-2/3 lg:w-1/2">
        <Main />
      </div>
    </QueryClientProvider>
  );
}

export default App;
