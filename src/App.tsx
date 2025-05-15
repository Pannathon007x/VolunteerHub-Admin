import { useRoutes } from "react-router-dom";
import Navbar from "./components/Navbar";
import { routes } from "./routes";

export default function App() {
  const element = useRoutes(routes);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      {/* ตรงนี้จะเรนเดอร์หน้าเพจตามเส้นทาง */}
      <div className="flex-1">
        {element}
      </div>
      {/* <Footer /> ถ้ามี */}
    </div>
  );
}
