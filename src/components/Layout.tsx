import { Header } from "./Header";
import { Main } from "./Main";

export const Layout = () => {
  return (
    <>
      <Header />
      <div className="mx-auto mt-4 w-full sm:w-full md:w-2/3 lg:w-1/2">
        <Main />
    </div>
    </>
  );
};
