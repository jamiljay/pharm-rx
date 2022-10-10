import axios from 'axios';

import PharmacyFields from '../interfaces/PharmacyFields';

const PHARMACY_LIST = [
  {
    "name": "ReCept",
    "pharmacyId": "NRxPh-HLRS"
  },
  {
    "name": "My Community Pharmacy",
    "pharmacyId": "NRxPh-BAC1"
  },
  {
    "name": "No Name Pharmacy",
    "pharmacyId": "NRxPh-SJC1"
  },
  {
    "name": "NY Pharmacy",
    "pharmacyId": "NRxPh-ZEREiaYq"
  }
];

const USER_LOCATION = {
  'latitude': 37.48771670017411,
  'longitude': -122.22652739630438
};

export const getUsersLocation = async () => {
  // TODO: pull from browser
  return Promise.resolve(USER_LOCATION);
};

export const getPharmacies = async () => {
  // TODO: get from server
  return Promise.resolve(PHARMACY_LIST);
};

export const getPharmacyDetails = async (pharmacyId: string) => {
  const { data } = await axios.get(`/pharmacies/info/${pharmacyId}`);
  return data;
};

// Credit: https://www.geodatasource.com/developers/javascript
const getLatLngDistance = ( lat1: number, lon1: number, lat2: number, lon2: number ) => {
  const radlat1 = Math.PI * lat1 / 180;
  const radlat2 = Math.PI * lat2 / 180;
  const theta = lon1 - lon2;
  const radtheta = Math.PI * theta / 180;
  const dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  return dist;
};

export const lookupNearbyPharmacy = async () => {
  // TODO: pull users location
  // TODO: ask backend devs to give me a better API
  const userLocation = await getUsersLocation();
  const pharmacyDistances = await getPharmacies().then(async (pharmacies) => {
    const pharmResponses = await Promise.all(
      pharmacies.map(({ pharmacyId }) => getPharmacyDetails(pharmacyId))
    );
    return pharmResponses.map((pharmResponse) => {
      const { value } = pharmResponse as { value: PharmacyFields };
      return {
        pharmacyId: value.id,
        name: value.name,
        distance: getLatLngDistance(
          value.address.latitude,
          value.address.longitude,
          userLocation.latitude,
          userLocation.longitude
        )
      };
    });
  });

  const closest = pharmacyDistances.reduce((closest, pharmacy) => {
    if (!closest || closest.distance > pharmacy.distance) return pharmacy;
    return closest;
  }, null as unknown as { pharmacyId: string, name: string, distance: number });

  return Promise.resolve(closest);
};

export const getDrugs = async () => {
  const response = await axios.get('/prod/medicationListFromNIH/medicationListFromNIH.txt');
  return response.data.split(',\n') as string[];
};
