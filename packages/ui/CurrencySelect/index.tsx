"use client";

import * as React from "react";
import * as Select from "@radix-ui/react-select";
import styled from "styled-components";
import { Icon } from "../Icon";

export type CurrencySelectComponentProps = {
  tag: string;
  label: string;
  id: string | number;
  value: string | number;
} & React.HTMLProps<HTMLElement>;

export const CurrencySelect = ({}: CurrencySelectComponentProps) => {
  return (
    <SelectRoot>
      <SelectTrigger>
        <SelectValue placeholder="Currency" />
        <SelectIcon><Icon icon="arrow_drop_down" iconSize={23} /></SelectIcon>
      </SelectTrigger>
      <SelectPortal>
        <SelectContent position="popper">
          <SelectViewport className="SelectViewport">
            {currency.map((currency) => (
              <SelectItem value={currency.id}>
                {/* <SelectItemIndicator>{currency.tag}</SelectItemIndicator> */}
                <SelectItemText><StyledTag>{currency.tag}</StyledTag> {currency.label}</SelectItemText>
              </SelectItem>
            ))}
          </SelectViewport>
        </SelectContent>
      </SelectPortal>
    </SelectRoot>
  );
};


const SelectRoot = styled(Select.Root)`
`;

const SelectTrigger = styled(Select.Trigger)`
  background-color: ${({theme}) => theme.card.background};
  border: solid 2px ${({ theme }) => theme.input.borderError};
  border-radius: 8px;
  font-size: 1em;
  transition: border-color 200ms ease-out;
  width: 13em;
  height: 56px;
  cursor: pointer;
  padding-bottom: 10px;

  :focus {
    outline: none;
    border-color: ${({ theme }) => theme.input.focus};
  }
`;

const SelectValue = styled(Select.Value)`

`;

const SelectIcon = styled(Select.Icon)`
  color: #626262;
`;

const SelectPortal = styled(Select.Portal)`
  margin-top: 2px;
`;

const SelectContent = styled(Select.Content)`
  border-radius: 1em;
  overflow: hidden;
  background-color: white;
  border: solid 1px ${({ theme }) => theme.input.borderError};
  cursor: pointer;


`;

const SelectViewport = styled(Select.Viewport)`
  box-shadow: 0px 2px 8px rgba(32, 37, 50, 0.08), 0px 2px 4px rgba(32, 37, 50, 0.03);
  min-width: 13em;
`;

const SelectItem = styled(Select.Item)`
  height: 56px;
  outline: none;
  padding: 16px;
  gap: 8px;
  
  :hover {
    color: #397B65;
    background-color: #F1FBF6;
  }
`;

const SelectItemIndicator = styled(Select.ItemIndicator)`
  color: #515151;
`;

const StyledTag = styled.span`
  color: #515151;
  :hover {
    color: #397B65;
  }
`;

const SelectItemText = styled(Select.ItemText)`
  // CANT BE STYLED
  :hover {
    color: #397B65;
  }
`;


// export type CurrencySelectComponentProps = {
//   tag: string;
//   label: string;
//   id: string | number;
//   value: string | number;
// } & React.HTMLProps<HTMLElement>;

// export const CurrencySelect = ({}: CurrencySelectComponentProps) => {
//   return (
//     <Wrapper>
//       <StyledLabel>Currency</StyledLabel>
//       <StyledSelect onChange={handleChange}>
//         <option value="" disabled selected hidden>
//           Select...
//         </option>
//         {currency.map((currency) => (
//           <option value={currency.id}>
//             {currency.name}
//           </option>
//         ))}
//       </StyledSelect>
//       <StyledIcon>
//         <Icon icon="arrow_drop_down" iconSize={23} />
//       </StyledIcon>
//     </Wrapper>
//   );
// };

// const handleChange = (event: any) => {
//   const selectedOption = event.target.value;
//   console.log(`Selected option with ID: ${selectedOption}`);
// };

// const Wrapper = styled.div`
//   position: relative;
// `;

// const StyledSelect = styled.select`
// /* box-sizing: border-box; */
// border: solid 2px ${({ theme }) => theme.input.borderError};
// border-radius: 8px;
// padding: 14px 0 14px 14px;
// font-size: 1em;
// /* line-height: 150%; */
// transition: border-color 200ms ease-out;
// width: 13em;
// appearance: none;
// /* -moz-appearance: none;
// -webkit-appearance: none;
// background-image: url();
// background-position: right center;
// padding-right: 1.5em; */
// cursor: pointer;
// text-overflow: ellipsis;

// :focus {
//   outline: none;
//   border-color: ${({ theme }) => theme.input.focus};
// }

//   .test {
//     background-color: green;
//   }
// `;

// const StyledLabel = styled.label`
//   position: absolute;
//   display: flex;
//   font-size: 12px;
//   font-weight: 600;
//   background-color: ${({ theme }) => theme.input.labelBackground};
//   color: ${({ theme }) => theme.input.neutral};
//   padding-left: 4px;
//   padding-right: 4px;
//   margin-left: 12px;
//   top: -7px;
// `;

// const StyledIcon = styled.span`
//   position: absolute;
//   display: flex;
//   pointer-events: none;
//   margin-left: 180px;
//   margin-top: -37px;
// `;

// const StyledOption = styled.span`
//   color:red;
// `;

const currency = [
  {
    tag: "PLN",
    label: "Polish Zloty",
    id: 1,
  },
  {
    tag: "GBP",
    label: "British Pound",
    id: 2,
  },
  {
    tag: "EUR",
    label: "Euro",
    id: 3,
  },
  {
    tag: "USD",
    label: "United States Dollar",
    id: 4,
  },
];
