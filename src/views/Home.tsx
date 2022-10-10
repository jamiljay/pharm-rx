import { useEffect, useState, useContext } from 'react';

import OrderHistoryContext from '../contexts/OrderHistory';
import PharmacyListFields from '../interfaces/PharmacyListFields';
import { getPharmacies } from '../components/utilities';
import PharmacyGrid from '../components/PharmacyGrid';
import Loading from '../components/Loading';

const Home = () => {
  const { getOrder } = useContext(OrderHistoryContext);
  const [isLoading, setIsLoading] = useState(true);
  const [pharmacies, setPharmacies] = useState<PharmacyListFields[]>([]);
  const loadPharmacies = async () => {
    const response = await getPharmacies();
    setPharmacies(response.map((pharmacy) => ({
      ...pharmacy,
      order: getOrder(pharmacy.pharmacyId)
    })));
    setIsLoading(false);
  };

  useEffect(() => {
    loadPharmacies();
  }, []);

  if (isLoading) {
    return <Loading text="Loading Pharmacies" />;
  }

  return (
    <PharmacyGrid rows={pharmacies} />
  );
};

export default Home;
