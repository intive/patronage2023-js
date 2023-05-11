import { BudgetsContent } from "./BudgetsContent";

interface PageProps {
  params: {
    id: string;
  };
}
export default function BudgetsPage({ params }: PageProps) {
  return <BudgetsContent id={params.id} />;
}
