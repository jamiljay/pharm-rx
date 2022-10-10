import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';

import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Chip } from 'primereact/chip';
import { Message } from 'primereact/message';

import OrderHistoryContext from '../../contexts/OrderHistory';
import PharmacyFields from '../../interfaces/PharmacyFields';
import DrugSelector from '../../components/DrugSelector';
import Loading from '../../components/Loading';
import { getPharmacyDetails, getDrugs } from '../../components/utilities';

import './index.scss';

const Pharmacy = () => {
  const params = useParams();
  const { getOrder, addOrder } = useContext(OrderHistoryContext);
  const [isLoading, setIsLoading] = useState(true);
  const [pharmacy, setPharmacy] = useState<PharmacyFields>();
  const [allDrugs, setAllDrugs] = useState<string[]>([]);
  const [availableDrugs, setAvailableDrugs] = useState<string[]>([]);
  const [selectedDrugs, setSelectedDrugs] = useState<string[]>([]);
  const pharmacyId = params.pharmacyId || '';
  const pharmacyOrders = getOrder(pharmacyId);

  const loadPharmacy = async () => {
    const pharmResponse = await getPharmacyDetails(pharmacyId);
    const drugResposne = await getDrugs();
    const { value } = pharmResponse as { value: PharmacyFields }; 
    setPharmacy(value);
    setAllDrugs(drugResposne);
    if (pharmacyOrders) {
      setSelectedDrugs(pharmacyOrders);
      setAvailableDrugs(allDrugs.filter((d) => !pharmacyOrders.includes(d)));
    } else {
      setAvailableDrugs(drugResposne);
    }

    setIsLoading(false);
  };

  const onDrugSelected = (drug: string) => {
    const selected = [drug, ...selectedDrugs];
    setSelectedDrugs(selected);
    setAvailableDrugs(allDrugs.filter((d) => !selected.includes(d)));
  };

  const onDrugRemoved = (drug: string) => {
    const selected = selectedDrugs.filter((d) => d !== drug);
    setSelectedDrugs(selected);
    setAvailableDrugs(allDrugs.filter((d) => !selected.includes(d)));
  };

  const onOrderPlaced = () => {
    if (selectedDrugs.length) {
      addOrder(pharmacyId, selectedDrugs);
    }
  };

  useEffect(() => {
    loadPharmacy();
  }, []);

  if (isLoading) {
    return <Loading text="Loading Pharmacy" />;
  }

  if (!pharmacy) {
    return (
      <Message severity="warn" text="Pharmacy was not found."></Message>
    );
  }

  return (
    <div className="grid ml-2 m-r2">
      <div className="col-8">
        <Card title={pharmacy.name}>
          <strong>Phone:</strong> {pharmacy.primaryPhoneNumber || 'N/A'}
          <br />
          <br />
          <strong>Hours:</strong>
          <br />
          {pharmacy.pharmacyHours || 'N/A'}
          <br />
          <br />
          <strong>Address:</strong>
          <br />
          {pharmacy.address.streetAddress1}
          <br />
          {pharmacy.address.city} {pharmacy.address.usTerritory}, {pharmacy.address.postalCode}
        </Card>
      </div>
      <div className="col-4">
        {!pharmacyOrders ? (
          <Card>
            Drugs at this Pharmacy
            <DrugSelector
              available={availableDrugs}
              selected={selectedDrugs}
              onAdd={onDrugSelected}
              onRemove={onDrugRemoved} />
            <Button label='Place Order' onClick={onOrderPlaced} />
          </Card>
        ) : (
          <Card>
            <h4 className="mt-0">Your order has been placed!!</h4>
            {pharmacyOrders.map((drug) => (
              <Chip key={drug} label={drug} className="mr-1 mb-1" />
            ))}
          </Card>
        )}
      </div>
    </div>
  );
}

export default Pharmacy;
