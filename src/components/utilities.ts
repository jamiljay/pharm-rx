import axios from 'axios';

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

export const lookupNearbyPharmacy = async (lat: number, lng: number) => {
  // const response = await axios.get(`/${pharmacyId}`);
  console.log(lat, lng);
};

export const getDrugs = async () => {
  const response = await axios.get('/prod/medicationListFromNIH/medicationListFromNIH.txt');
  return response.data.split(',\n') as string[];
};
