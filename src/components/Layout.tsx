import { Header } from "./Header";
import { Main } from "./Main";

export const Layout = () => {
  return (
    <div className="mt-4 mx-auto w-full sm:w-full md:w-2/3 lg:w-1/2">
      <Header />
      <Main />
    </div>
  );
};
