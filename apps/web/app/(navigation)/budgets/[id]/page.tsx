import { BudgetContent } from "./BudgetContent";

interface PageProps {
  params: {
    id: string;
  };
}
export default function BudgetsPage({ params }: PageProps) {
  return <BudgetContent id={params.id} />;
}
