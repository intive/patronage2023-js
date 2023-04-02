import styled from "styled-components";

export const SettingsSubMenu = ({ title, items }: SettingsSubMenuProps) => {
  return (
    <SettingsSubMenuStyled>
      <h3>{title}</h3>
      <ul>
        {items.map(({ label }) => (
          <ListItemStyled>{label}</ListItemStyled>
        ))}
      </ul>
    </SettingsSubMenuStyled>
  );
};

type SettingsSubMenuProps = {
  title: string;
  items: [];
};

const SettingsSubMenuStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ListItemStyled = styled.li`
  list-style: none;
  padding: 0;
`;
