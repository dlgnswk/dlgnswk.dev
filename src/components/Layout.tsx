import { Header } from "./Header";
import { Main } from "./Main";

export const Layout = () => {
  return (
    <div className="lg:m-10 mg:m-10 sm:m-10">
      <Header />
      <Main />
    </div>
  );
};
