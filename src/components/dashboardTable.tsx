import { useEffect, useMemo, useState } from "react";
import { Column } from "react-table";
import TableHOC from "./tableHOC";

interface DataType {
  _id: string;
  quantity: number;
  discount: number;
  amount: number;
  status: string;
}

const columns: Column<DataType>[] = [
  {
    Header: "Id",
    accessor: "_id",
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
  const [rows, setRows] = useState<DataType[]>([]);

  useEffect(() => {
    if (data) {
      setRows(
        data.map((i) => ({
          _id: i._id,
          quantity: i.quantity,
          discount: i.discount,
          amount: i.amount,
          status: i.status,
        }))
      );
    }
  }, [data]);

  const Table = useMemo(
    () =>
      TableHOC<DataType>(columns, rows, "Top Transaction", rows.length > 6),
    [rows] // only depend on rows, as columns is a constant
  );

  return Table();
};

export default DashboardTable;
