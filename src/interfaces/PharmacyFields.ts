interface PharmacyFields {
  pharmacyId: string
  id: string
  name: string
  primaryPhoneNumber: string
  pharmacyHours?: string
  address: {
    streetAddress1: string
    city: string
    postalCode: string
    usTerritory: string
    addressType: string
    externalId: string
    googlePlaceId: string
    isValid: boolean
    latitude: number
    longitude: number
  }
}

export default PharmacyFields;
