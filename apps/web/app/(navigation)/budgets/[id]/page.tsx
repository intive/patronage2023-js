import { BudgetsContent } from "../BudgetsContent";

export default function BudgetsPage({ params }: { params: { id: string } }) {
  return <BudgetsContent id={params.id} />;
}
