"use client";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { AsideCardContent } from "app/AsideCardContent";
import { useSession } from "next-auth/react";
import styled from "styled-components";

import { env } from "env.mjs";
import MultiCardLayout from "../../../MultiCardLayout";
import { BudgetBasicInformation } from "../BudgetBasinInformation";
import BudgetDetails from "../BudgetDetails/BudgetDetails";
import {
  BudgetBasicInformationSuspense,
  BudgetDetailsSuspense,
} from "../BudgetDetails/BudgetSuspense";
import { CreateNewTransaction } from "../CreateNewTransaction";
import TransactionTableController from "../TransactionTableController";
import { ImportModal } from "components/ImportModal";
import { ImportCSVInstructionScreen } from "components/ImportModal/ImportModal.screens";

import { useTranslate } from "lib/hooks";
import fixCurrencyObject from "lib/validations/fixCurrenyObject";
import { LinkStyled } from "ui/SideNavigationBar/SubMenu/SubMenu.styled";
import {
  ButtonWithDropdown,
  Icon,
  Separator,
  Button as ImportExportButton,
} from "ui";

const BudgetContentWrapperStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  align-self: flex-start;
  gap: 32px;
  width: 100%;
`;
const SeparatorStyled = styled(Separator)`
  display: block;
  width: 100%;
`;

const CreateButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100%;
  gap: 8px;
`;

interface BudgetsContentProps {
  id: string;
}

export const BudgetContent = ({ id }: BudgetsContentProps) => {
  const { t, dict } = useTranslate("BudgetsPage");
  const { t: tExport, dict: dictExport } = useTranslate("ExportFile");
  const { t: tImport, dict: dictImport } = useTranslate("ImportModal");
  const { t: tButton, dict: dictButton } = useTranslate(
    "ImportExportMainButton"
  );
  const [
    createNewTransactionModalVisible,
    setCreateNewTransactionModalVisible,
  ] = useState(false);
  const [transactionType, setTransactionType] = useState("");
  const [importModalOpen, setImportModalOpen] = useState(false);

  const { data: session } = useSession();

  const handleCreateNewTransaction = (transactionType: string) => {
    setTransactionType(transactionType);
    setCreateNewTransactionModalVisible(true);
  };

  const { data: budget } = useQuery({
    queryKey: ["budgets"],
    queryFn: async () => {
      return fetch(`${env.NEXT_PUBLIC_API_URL}budgets/${id}`, {
        headers: {
          accept: "*/*",
          "Content-Type": "application/json",
          Authorization: "Bearer " + session?.user.accessToken,
        },
      }).then((res) => res.json());
    },
    enabled: !!session,
  });

  //href that will come from query export transactions
  const exportLink = (
    <LinkStyled href={""} download title="csv">
      <Icon icon="file_download" size={12} />
      <span>{tExport(dictExport.exportButtonText)}</span>
    </LinkStyled>
  );

  const emailButton = (
    <button
      onClick={() => {
        console.log("email");
      }}>
      email
    </button>
  );

  const exportTransactionsItems = [
    {
      id: "export-transactions-download",
      node: exportLink,
    },
    {
      id: "export-transactions-email",
      node: emailButton,
    },
  ];

  const mainCardContent = (
    <BudgetContentWrapperStyled>
      {budget ? (
        <BudgetBasicInformation budget={fixCurrencyObject(budget)} />
      ) : (
        <BudgetBasicInformationSuspense />
      )}
      <SeparatorStyled />
      <CreateButtonWrapper>
        <ButtonWithDropdown
          disabled={!budget}
          label={t(dict.createButton.label)}
          items={[
            {
              id: "Income",
              node: t(dict.createButton.newIncome),
              callback: () => handleCreateNewTransaction("Income"),
            },
            {
              id: "Expense",
              node: t(dict.createButton.newExpense),
              callback: () => handleCreateNewTransaction("Expense"),
            },
          ]}
        />
        <ImportExportButton
          disabled={!budget}
          onClick={() => setImportModalOpen(true)}>
          {tButton(dictButton.import)}
        </ImportExportButton>
        <ButtonWithDropdown
          items={exportTransactionsItems}
          disabled={!budget}
          label={tButton(dictButton.export)}></ButtonWithDropdown>
      </CreateButtonWrapper>
      {budget ? (
        <BudgetDetails budget={fixCurrencyObject(budget)} />
      ) : (
        <BudgetDetailsSuspense />
      )}
      {budget && (
        <TransactionTableController budget={fixCurrencyObject(budget)} />
      )}
    </BudgetContentWrapperStyled>
  );

  return (
    <>
      <MultiCardLayout main={mainCardContent} aside={<AsideCardContent />} />
      {createNewTransactionModalVisible && (
        <CreateNewTransaction
          type={transactionType}
          onClose={() => setCreateNewTransactionModalVisible(false)}
          budget={budget}
        />
      )}
      {importModalOpen && (
        <ImportModal
          onClose={() => setImportModalOpen(false)}
          importEndpoint=""
          allowedFileExtensions={[".csv"]}
          downloadButtonLabel={tImport(dictImport.importButtonText)}
          importButtonLabel={tImport(dictImport.importButtonText)}
          noDataSavedToastMsg={tImport(dictImport.noTransactionSaved)}
          instructionScreen={() =>
            ImportCSVInstructionScreen({
              exampleHeader: "Type,Id,Name,Value,Category,TransactionDate",
              exampleFirstLine:
                "Income,1,Transaction name, 1000, HomeSpendings, 2023-06-20T14:15:47.392Z ",
            })
          }
        />
      )}
    </>
  );
};
