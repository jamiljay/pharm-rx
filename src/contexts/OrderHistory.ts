import { createContext } from "react";

interface OrderHistoryFields {
  orders: { [key: string]: string[] }
  getOrder: (pharmacyId: string) => string[]
  addOrder: (pharmacyId: string, drugs: string[]) => void
}

const OrderHistoryContext = createContext<OrderHistoryFields>({
  orders: {},
  getOrder: () => [],
  addOrder: () => {}
});

export default OrderHistoryContext;
