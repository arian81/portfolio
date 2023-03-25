import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Whoai from "./Whoai";

const App = () => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Whoai />
    </QueryClientProvider>
  );
};

export default App;
