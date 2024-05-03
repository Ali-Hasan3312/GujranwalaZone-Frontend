import { Column } from "react-table";
import TableHOC from "./tableHOC";
import { useCallback } from "react";
interface DataType {
    id: string;
    quantity: number;
    discount: number;
    amount: number;
    status: string;
  }
  
  const columns: Column<DataType>[] = [
    {
      Header: "Id",
      accessor: "id",
    },
    {
      Header: "Quantity",
      accessor: "quantity",
    },
    {
      Header: "Discount",
      accessor: "discount",
    },
    {
      Header: "Amount",
      accessor: "amount",
    },
    {
      Header: "Status",
      accessor: "status",
    },
  ];
const DashboardTable = ({ data = [] }: { data: DataType[] }) => {
    const Table = useCallback(
        TableHOC<DataType>(
            columns,
            data,
            "Top Transaction"
          ),[]
    );
      return (
        Table()
      ) ;
}

export default DashboardTable