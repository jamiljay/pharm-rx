import { useState } from 'react';
import { Outlet, Link, useNavigate } from "react-router-dom";

import { Button } from 'primereact/button';
import { Menubar } from 'primereact/menubar';

import OrderHistoryContext from './contexts/OrderHistory';
import { lookupNearbyPharmacy } from './components/utilities';
import Loading from './components/Loading';

const App = () => {
  const navigate = useNavigate();
  const [isloadingNearby, setIsLoadingNearby] = useState(false);
  const [orders, setOrders] = useState<{ [key: string]: string[] }>({});
  const addOrder = (pharmacyId: string, drugs: string[]) => {
    setOrders({ [pharmacyId]: drugs, ...orders });
  };
  const getOrder = (pharmacyId: string) => orders[pharmacyId];
  const value = { orders, addOrder, getOrder };

  const goToNearest = async () => {
    setIsLoadingNearby(true);
    const pharmacy = await lookupNearbyPharmacy();
    navigate(`/${pharmacy.pharmacyId}`);
    setIsLoadingNearby(false);
  };

  return (
    <OrderHistoryContext.Provider value={value}>
      <div className="app">
        <header className="app-header">
          <Menubar
            className="m-2 mb-4"
            start={(
              <Link to="/">
                <i className="pi pi-home" /> Home
              </Link>
            )}
            end={(
              <Button onClick={goToNearest} className="p-button-text p-0">
                <i className="pi pi-map-marker" /> Nearby Pharmacy
              </Button>
            )}
          />
        </header>
        <main className="p-4">
          {isloadingNearby ? (
            <Loading text="Loading Pharmacy" />
          ): (
            <Outlet />
          )}
        </main>
        <footer>
        </footer>
      </div>
    </OrderHistoryContext.Provider>
  );
};

export default App;
