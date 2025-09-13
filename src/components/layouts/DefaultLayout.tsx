import Header from "./Header";
import { Outlet } from "react-router-dom";

export default function DefaultLayout() {
  return (
    <>
      <Header />
      <div className="flex">
        <main className="flex-1 bg-white p-8">
          <Outlet />
        </main>
      </div>
    </>
  );
}
