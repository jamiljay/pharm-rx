import { Outlet, Link } from "react-router-dom";
import { Menubar } from 'primereact/menubar';


const App = () => (
  <div className="app">
    <header className="app-header">
      <Menubar
        className="m-2 mb-4"
        start={(
          <>
            <Link to="/">
              <i className="pi pi-home mr-1" /> Home
            </Link>
          </>
        )}
      />
    </header>
    <main className="p-4">
      <Outlet />
    </main>
    <footer>
    </footer>
  </div>
);

export default App;
