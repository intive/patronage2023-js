import { SkeletonLoading } from "ui";
import styled from "styled-components";
import { PropsWithChildren } from "react";
import { ITableBodyProps } from "ka-table/props";
import "css/transactionsTableSuspense.css";

interface TransactionsTableSuspenseProps extends ITableBodyProps {
  rowsNumber: number;
}

const GradientTrStyled = styled.tr`
  position: absolute;
  left: 0;
  bottom: 0;
  background: linear-gradient(to bottom, transparent, white);
  width: 100%;
  height: 100%;
`;

const SingleSkeletonWrapperContent = ({
  children,
}: PropsWithChildren<unknown>) => {
  return <div className="wrapper-content-div">{children}</div>;
};

//to create single tr (thanks to tr, rows are properly displayed in table body)
//thanks to <ITableBodyProps> we have access to `columns` prop for colSpan
const DataRow = ({ columns }: ITableBodyProps) => {
  return (
    <tr>
      <td className={"loading-cell"} colSpan={columns.length}>
        <div>
          <SkeletonLoading
            height={50}
            count={1}
            containerClassName="flex-content-wrapper"
            wrapper={SingleSkeletonWrapperContent}
          />
        </div>
      </td>
    </tr>
  );
};

//function for creating array full of <DataRow/> components
const spawnRows = (props: TransactionsTableSuspenseProps) => {
  const rowsArray = [];
  let id = 1;

  for (let i = 0; i < props.rowsNumber; i++) {
    rowsArray.push(<DataRow {...props} key={id++} />);
  }

  return rowsArray;
};

export const TransactionsTableSuspense = (
  props: TransactionsTableSuspenseProps
) => {
  return (
    <>
      {spawnRows(props)}
      <GradientTrStyled />
    </>
  );
};
