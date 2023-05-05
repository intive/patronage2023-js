import { TransactionsTable } from "./TransactionsTable";
import { useState } from "react";

const TransactionTableController = ({ id }: { id: string }) => {
  //useSession

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pagesPerPage, setPagesPerPage] = useState<number>(5);

  fetch();

  return (
    <>
      <TransactionsTable budget={} setSorting={} />
      //Pagination
    </>
  );
};

export default TransactionTableController;
