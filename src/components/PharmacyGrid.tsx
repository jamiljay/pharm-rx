import { Link } from "react-router-dom";

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

interface PharmacyData {
  pharmacyId: string
  name: string
}

interface GridProps {
  rows: PharmacyData[]
}

const Grid = ({ rows }: GridProps) => {
  const renderStatus = (rowData: PharmacyData) => (
    <span>check or dot</span>
  );
  const renderNameLink = (rowData: PharmacyData) => (
    <Link to="/pharmacy">Pharmcy Name</Link>
  );
  return (
    <DataTable value={rows} showGridlines responsiveLayout="scroll">
      <Column header="Name" body={renderNameLink} />
      <Column header="Order Placed" body={renderStatus} />
    </DataTable>
  );
}

export default Grid;
