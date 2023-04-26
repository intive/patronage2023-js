import { NextPageContext } from "next";
import { BudgetsContent } from "../BudgetsContent";

// TODO: there's probably a next type for this which I can't find
type PageProps = {
  params: {
    id: string;
  };
};

export default function BudgetsPage({ params }: PageProps) {
  const { id } = params;
  return <BudgetsContent id={id} />;
}
