import { SkeletonLoading } from "ui";
import styled from "styled-components";
import { PropsWithChildren } from "react";
import { ITableBodyProps } from "ka-table/props";

const SingleSkeletonWrapperContent = ({
  children,
}: PropsWithChildren<unknown>) => {
  return <div className="wrapper-content-div">{children}</div>;
};

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

const spawnRows = (props: TransactionsTableSuspenseProps) => {
  const rowsArray = [];

  for (let i = 0; i < props.rowsNumber; i++) {
    rowsArray.push(<DataRow {...props} />);
  }

  return rowsArray;
};

const DataRow: React.FC<ITableBodyProps> = ({ columns }) => {
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
