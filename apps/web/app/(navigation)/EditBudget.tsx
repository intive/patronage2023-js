"use client";

import * as Tabs from "@radix-ui/react-tabs";
import { Form, Field, FormInstance } from "houseform";
import { useTranslate } from "lib/hooks";
import { useValidateBudgetModal } from "./useValidateBudgetModal";
import { BudgetFixed } from "lib/types";
import {
  Modal,
  IconPicker,
  Input,
  CustomDatePicker,
  Button,
  IconType,
} from "ui";
import {
  SeparatorStyledTop,
  TabsStyled,
  TabsTriggerStyled,
  ContentStyled,
  ParagraphStyled,
  IconPickerStyled,
  InputWrapperFullStyled,
  TextAreaWrapperStyled,
  TextareaStyled,
  TextareaErrorStyled,
  InputWrapperFullFlex,
  DatePickerErrorStyled,
  DatePickerWrapperStyled,
  SeparatorStyled,
  ButtonWrapperStyled,
  ErrorMessageWrapper,
  SettingsTab,
  ShareTab,
} from "./CreateNewBudget.styled";
import { useSession } from "next-auth/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { env } from "env.mjs";
import { icons } from "./CreateNewBudget";
import { useState } from "react";
import { ErrorMessage } from "ui";
import { ShareBudget } from "./ShareBudget";

interface EditBudgetProps {
  budget: BudgetFixed;
  onClose: () => void;
}

interface EditedBudgetBEProps {
  name: string;
  description: string;
  iconName: string;
  period: {
    startDate: string;
    endDate: string;
  };
}

export const EditBudget = ({ budget, onClose }: EditBudgetProps) => {
  const { t, dict } = useTranslate("EditBudgetModal");
  const [errMsg, setErrMsg] = useState("");
  const { checkNameOnChange, checkNameOnSubmit, checkDescription, checkDate } =
    useValidateBudgetModal("AddNewBudgetModal");

  console.log(budget.id);

  const budgetUsersId = budget.budgetUsers.map((user) => user.id);
  const [budgetUsers, setBudgetUsers] = useState(budgetUsersId);
  console.log("budgetUsers: " + budgetUsers);

  const [editedBudget, setEditedBudget] = useState<EditedBudgetBEProps>({
    name: budget.name,
    description: budget.description,
    iconName: budget.icon,
    period: { startDate: budget.startDate, endDate: budget.endDate },
  });
  console.log("editedBudget: " + JSON.stringify(editedBudget));

  //BE integration
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  // temporary just for current version of query
  const filteredUsers = budgetUsers.filter(
    (user) => !budgetUsersId.includes(user)
  );
  console.log(filteredUsers);
  const url = `${env.NEXT_PUBLIC_API_URL}budgets/${budget.id}/users`;
  console.log(url);

  const updateBudgetUsersMutation = useMutation({
    mutationFn: (budgetUsers: string[]) => {
      return fetch(url, {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + session?.user.accessToken,
        },
        body: JSON.stringify(budgetUsers),
      });
    },
    onError: () => {
      setErrMsg(t(dict.errors.errorDefault));
      return;
    },
    onSettled: (data) => {
      switch (data!.status) {
        case 200:
          queryClient.invalidateQueries({ queryKey: ["budgets"] });
          onClose();
          break;
        case 400:
          setErrMsg(t(dict.errors.error400));
          break;
        case 401:
          setErrMsg(t(dict.errors.error401));
          break;
        default:
          setErrMsg(t(dict.errors.errorDefault));
          return;
      }
    },
  });

  const sendEditedBudgetMutation = useMutation({
    mutationFn: (edited: EditedBudgetBEProps) => {
      return fetch(`${env.NEXT_PUBLIC_API_URL}/budgets/${budget.id}/edit`, {
        method: "PUT",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + session?.user.accessToken,
        },
        body: JSON.stringify(edited),
      });
    },
    onError: () => {
      setErrMsg(t(dict.errors.errorDefault));
      return;
    },
    onSettled: (data) => {
      switch (data!.status) {
        case 201:
          queryClient.invalidateQueries({ queryKey: ["budgets"] });

          // onClose();
          break;
        case 400:
          setErrMsg(t(dict.errors.error400));
          break;
        case 401:
          setErrMsg(t(dict.errors.error401));
          break;
        default:
          setErrMsg(t(dict.errors.errorDefault));
          return;
      }
    },
  });
  //BE integration end

  const defaultValueTabs = "settings";

  const getDateObject = (dateType: string) => {
    if (dateType === "start-date") {
      return editedBudget.period.startDate
        ? new Date(editedBudget.period.startDate)
        : null;
    } else if (dateType === "end-date")
      return editedBudget.period.endDate
        ? new Date(editedBudget.period.endDate)
        : null;
  };

  const checkEndDateOnChangeValidate = (
    endDateValue: Date | null,
    form: FormInstance<any>
  ) => {
    const startDateValue = form.getFieldValue("start-date")!.value;

    if (startDateValue && endDateValue) {
      if (startDateValue > endDateValue)
        return Promise.reject(t(dict.errors.dateBeforeStart));
    }
    return Promise.resolve(true);
  };

  return (
    <Modal
      header={t(dict.title)}
      onClose={() => onClose && onClose()}
      fullHeight>
      {errMsg.length > 0 && (
        <ErrorMessageWrapper>
          <ErrorMessage message={errMsg} onClose={() => setErrMsg("")} />
        </ErrorMessageWrapper>
      )}
      <SeparatorStyledTop />
      <TabsStyled defaultValue={defaultValueTabs}>
        <Tabs.List>
          <TabsTriggerStyled value="settings">
            {t(dict.tabs.settings)}
          </TabsTriggerStyled>
          <TabsTriggerStyled value="share">
            {t(dict.tabs.share)}
          </TabsTriggerStyled>
        </Tabs.List>
        <Form
          onSubmit={(values) => {
            // const editedBudget: EditedBudgetBEProps = {
            //   name: values["budget-name"],
            //   description: values["description"],
            //   iconName: values["icon"],
            //   period: {
            //     startDate: values["start-date"].toISOString(),
            //     endDate: values["end-date"].toISOString(),
            //   },
            // };

            sendEditedBudgetMutation.mutate(editedBudget);
            updateBudgetUsersMutation.mutate(filteredUsers);
          }}>
          {({ submit }) => (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                submit();
              }}>
              <ContentStyled>
                <SettingsTab value="settings">
                  <ParagraphStyled>
                    {t(dict.paragraphs.details)}
                  </ParagraphStyled>
                  <IconPickerStyled>
                    <Field
                      name="icon"
                      initialValue={editedBudget.iconName as IconType}>
                      {({ value, setValue }) => (
                        <IconPicker
                          defaultIcon={value}
                          icons={icons}
                          onSelect={(icon) => {
                            setValue(icon);
                            setEditedBudget({
                              ...editedBudget,
                              iconName: icon,
                            });
                          }}
                        />
                      )}
                    </Field>
                  </IconPickerStyled>
                  <InputWrapperFullStyled>
                    <Field
                      name="budget-name"
                      initialValue={editedBudget.name}
                      onSubmitValidate={checkNameOnSubmit}
                      onChangeValidate={checkNameOnChange}>
                      {({ value, setValue, errors }) => (
                        <Input
                          name="budget-name"
                          value={value}
                          hasError={errors.length > 0}
                          supportingLabel={errors.length ? errors : null}
                          onChange={(e) => {
                            setValue(e.currentTarget.value);
                            setEditedBudget({
                              ...editedBudget,
                              name: e.currentTarget.value,
                            });
                          }}
                          onInputCleared={() => setValue("")}
                          label={t(dict.inputNames.budgetName)}>
                          {budget.name}
                        </Input>
                      )}
                    </Field>
                  </InputWrapperFullStyled>
                  <Field
                    name="description"
                    initialValue={editedBudget.description}
                    onSubmitValidate={checkDescription}
                    onChangeValidate={checkDescription}>
                    {({ value, setValue, errors }) => {
                      return (
                        <TextAreaWrapperStyled>
                          <TextareaStyled
                            id="description"
                            name="description"
                            placeholder={editedBudget.description}
                            label={t(dict.inputNames.description)}
                            value={value}
                            hasError={errors.length > 0}
                            onChange={(e) => {
                              setValue(e.currentTarget.value);
                              setEditedBudget({
                                ...editedBudget,
                                description: e.currentTarget.value,
                              });
                            }}
                          />
                          <TextareaErrorStyled>
                            {errors.at(0)}
                          </TextareaErrorStyled>
                        </TextAreaWrapperStyled>
                      );
                    }}
                  </Field>
                  <ParagraphStyled>
                    {t(dict.paragraphs.budgetPeriod)}
                  </ParagraphStyled>
                  <InputWrapperFullFlex>
                    <Field
                      name="start-date"
                      initialValue={getDateObject("start-date")}
                      onSubmitValidate={checkDate}
                      onChangeValidate={checkDate}>
                      {({ value, setValue, errors }) => (
                        <DatePickerWrapperStyled>
                          <CustomDatePicker
                            hasError={errors.length > 0}
                            label={t(dict.inputNames.startDate)}
                            selected={value}
                            onSelect={(date) => {
                              setValue(date);
                              setEditedBudget({
                                ...editedBudget,
                                period: {
                                  ...editedBudget.period,
                                  startDate: date ? date.toISOString() : "",
                                },
                              });
                            }}
                          />
                          <DatePickerErrorStyled>
                            {errors.at(0)}
                          </DatePickerErrorStyled>
                        </DatePickerWrapperStyled>
                      )}
                    </Field>
                    <div style={{ alignSelf: "flex-start", marginTop: "18px" }}>
                      {t(dict.paragraphs.wordIt)}
                    </div>
                    <Field
                      name="end-date"
                      listenTo={["start-date"]}
                      initialValue={getDateObject("end-date")}
                      onSubmitValidate={checkDate}
                      onChangeValidate={(val, form) =>
                        checkEndDateOnChangeValidate(val, form)
                      }>
                      {({ value, setValue, errors }) => (
                        <DatePickerWrapperStyled>
                          <CustomDatePicker
                            hasError={errors.length > 0}
                            label={t(dict.inputNames.endDate)}
                            selected={value}
                            onSelect={(date) => {
                              setValue(date);
                              setEditedBudget({
                                ...editedBudget,
                                period: {
                                  ...editedBudget.period,
                                  endDate: date ? date.toISOString() : "",
                                },
                              });
                            }}
                          />
                          <DatePickerErrorStyled>
                            {errors[0]}
                          </DatePickerErrorStyled>
                        </DatePickerWrapperStyled>
                      )}
                    </Field>
                  </InputWrapperFullFlex>
                </SettingsTab>
                <ShareTab value="share">
                  <ShareBudget
                    owner={budget.userId}
                    budgetUsers={budgetUsers}
                    setBudgetUsers={setBudgetUsers}
                  />
                </ShareTab>
              </ContentStyled>
              <div>
                <SeparatorStyled />
                <ButtonWrapperStyled>
                  <Button onClick={submit}>{t(dict.button)}</Button>
                </ButtonWrapperStyled>
              </div>
            </form>
          )}
        </Form>
      </TabsStyled>
    </Modal>
  );
};
