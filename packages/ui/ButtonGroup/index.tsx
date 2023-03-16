import { ReactNode } from 'react'
import styled, { css } from 'styled-components'
export const ButtonGroup = ({ options }: GroupProps) => {
  return (
    <ButtonGroupStyled options={options}>
      {options.map(({ component, onSelect }, index) => {
        return (
          <>
            <input
              type={'radio'}
              id={`button-${index}`}
              key={`input-${index}`}
              onClick={onSelect}
              name={'button-group'}
            />
            <label key={`index-${index}`} htmlFor={`button-${index}`}>
              {component}
            </label>
          </>
        )
      })}
    </ButtonGroupStyled>
  )
}

interface InputProps {
  component: ReactNode
  onSelect: () => void
}

type GroupProps = {
  options: InputProps[]
} & React.HTMLProps<HTMLDivElement>

const ButtonGroupStyled = styled.div<GroupProps>`
  display: flex;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  border-radius: 100px;
  height: 100%;

  & > label {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    padding: 8px 24px;
    border: 2px solid #b1b1b1;
    color: #1e4c40;
    width: 100%;
    // Add a negative margin to overlap the borders
    margin: -1px;
  }

  /* apply first and last border radius */
  & > label:first-of-type {
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
  }
  & > label:last-of-type {
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
  }

  & > input {
    display: none;
  }

  & > input:checked + label {
    border-color: #1e4c40;
    z-index: 10;
  }

  //svg grey when not checked

  & > input:not(:checked) + label svg {
    color: #7e7e7e;
  }
`
