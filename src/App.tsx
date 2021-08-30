import { MoviesProvider } from "./components/hooks/useMovies";

import { SideBar } from "./components/SideBar";
import { Content } from "./components/Content";

import "./styles/global.scss";

export function App() {
  return (
    <div className="containerBody">
      <MoviesProvider>
        <SideBar />
        <Content />
      </MoviesProvider>
    </div>
  );
}
