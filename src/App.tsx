import { useState } from 'react';
import { Outlet, Link } from "react-router-dom";

import { Menubar } from 'primereact/menubar';

import OrderHistoryContext from './contexts/OrderHistory';

const App = () => {
  const [orders, setOrders] = useState<{ [key: string]: string[] }>({});
  const addOrder = (pharmacyId: string, drugs: string[]) => {
    setOrders({ [pharmacyId]: drugs, ...orders });
  };
  const getOrder = (pharmacyId: string) => orders[pharmacyId];
  const value = { orders, addOrder, getOrder };

  return (
    <OrderHistoryContext.Provider value={value}>
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
    </OrderHistoryContext.Provider>
  );
};

export default App;
