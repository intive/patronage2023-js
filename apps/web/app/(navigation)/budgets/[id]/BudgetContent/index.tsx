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

import useSuperfetch from "lib/hooks/useSuperfetch";
import { device } from "lib/media-queries";
import { useTranslate } from "lib/hooks";
import { ExportResponseProps } from "lib/types";
import fixCurrencyObject from "lib/validations/fixCurrenyObject";
import { LinkStyled } from "ui/SideNavigationBar/SubMenu/SubMenu.styled";
import { ButtonWithDropdown, Icon, Separator, Button, useToast } from "ui";

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
  gap: 6px;
`;

const ImportButton = styled(Button)`
  font-size: 0.9em;
  padding: 12px;
  ${device.tablet} {
    padding: 12px 25px;
    font-size: 16px;
  }
  ${device.desktop} {
    padding: 12px 34px;
    text-decoration: none;
  }
`;

const ButtonStyled = styled(Button)`
  padding: 0;
  font-weight: normal;
  color: ${({ theme }) => theme.button.primary.main};
  &:hover {
    text-decoration: none;
  }
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
  const superFetch = useSuperfetch();

  const { data: session } = useSession();
  const showToast = useToast();

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

  const { data: exportData } = useQuery({
    queryKey: ["exportedTransactionsCsvUri"],
    queryFn: async (): Promise<ExportResponseProps> => {
      return superFetch(
        `${env.NEXT_PUBLIC_API_URL}budgets/${id}/transactions/export`
      ).catch((err) => console.error(err));
    },
    enabled: !!session,
  });

  const exportByMail = useQuery({
    queryKey: ["exporIncomesExpensesByEmail"],
    queryFn: async () =>
      await superFetch(
        `${env.NEXT_PUBLIC_API_URL}budgets/${id}/transactions/export/mail`,
        { method: "POST", body: { budgetId: { value: id } } }
      ),
    onSuccess: () => {
      showToast({
        variant: "confirm",
        message: tExport(dictExport.toastMessages.emailSent),
      });
    },
    enabled: false,
  });

  const exportLink = (
    <LinkStyled href={exportData?.uri} download title="csv">
      <Icon icon="file_download" size={12} />
      <span>{tExport(dictExport.exportButtonText)}</span>
    </LinkStyled>
  );

  const emailButton = (
    <ButtonStyled
      onClick={() => exportByMail.refetch()}
      title="email"
      variant="simple">
      <Icon icon="file_upload" size={12} />
      <span>{tExport(dictExport.sendEmailText)}</span>
    </ButtonStyled>
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
        <ImportButton
          disabled={!budget}
          onClick={() => setImportModalOpen(true)}
          variant="secondary">
          {tButton(dictButton.import)}
        </ImportButton>
        <ButtonWithDropdown
          variant="secondary"
          items={exportTransactionsItems}
          disabled={!budget}
          label={tButton(dictButton.export)}
        />
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
          importEndpoint={`budgets/${id}/transactions/import`}
          allowedFileExtensions={[".csv"]}
          downloadButtonLabel={tImport(dictImport.downloadButtonText)}
          importButtonLabel={tImport(dictImport.importButtonText)}
          noDataSavedToastMsg={tImport(dictImport.noTransactionSaved)}
          instructionScreen={() =>
            ImportCSVInstructionScreen({
              exampleHeader:
                "Name,Value,TransactionType,CategoryType,Date,Status",
              exampleFirstLine:
                "Transaction name,-5.0000,Expense,Subscriptions,2023-06-12 19:28:26,Active",
            })
          }
        />
      )}
    </>
  );
};
