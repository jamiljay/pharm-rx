import PharmacyGrid from '../components/PharmacyGrid';

const Home = () => {
  const rows = [
    {
      pharmacyId: 'string',
      name: 'Test Pharmcy'
    }
  ];
  return (
    <PharmacyGrid rows={rows} />
  );
};

export default Home;
