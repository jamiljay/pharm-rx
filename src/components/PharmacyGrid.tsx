import { Link } from "react-router-dom";

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

import PharmacyListFields from '../interfaces/PharmacyListFields';

interface GridProps {
  rows: PharmacyListFields[]
}

const Grid = ({ rows }: GridProps) => {
  const renderStatus = (rowData: PharmacyListFields) => (
    rowData.order ? <i className="pi pi-check" /> : <span>-</span>
  );
  const renderNameLink = (rowData: PharmacyListFields) => (
    <Link to={`/${rowData.pharmacyId}`}>{rowData.name}</Link>
  );
  return (
    <DataTable value={rows} showGridlines responsiveLayout="scroll">
      <Column header="Name" body={renderNameLink} />
      <Column header="Order Placed" body={renderStatus} />
    </DataTable>
  );
}

export default Grid;
