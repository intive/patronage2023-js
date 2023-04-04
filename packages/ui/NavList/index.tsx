"use client";

import styled from "styled-components";
import { NavItem, Icon, Avatar } from "ui";
import { usePathname } from "next/navigation";

//types of NavItemContents to mark that NavList will receive array full of objects of type below.
export type NavItemContents = {
  title: string;
  icon?: "payments" | "subscriptions" | "savings";
  avatar?: string;
  href: string;
  id: number;
};

//types of NavList props - NavList will receive props `contents` that will be an Array full of objects of NavItemContents type.
export type NavListProps = {
  contents: Array<NavItemContents>;
} & React.HTMLProps<HTMLUListElement>;

const NavListStyled = styled.ul`
  list-style: none;
  width: 100%;
  height: auto;
`;

//span that imitates children element - wrapper for text
const SpanStyled = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
  margin-left: 3%;
`;

//div that imitates children element - wrapper for icon
//with !important this div will always have bcg on "white", even when `active` prop will change bcg of whole li element on "#F1FBF6"
const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white !important;
  padding: 4px 7px;
  border-radius: 8px;
`;

const AvatarStyled = styled(Avatar)`
  width: 2em;
  height: 2em;
`;

export const NavList = ({ contents }: NavListProps) => {
  const currentPage = usePathname();
  return (
    <NavListStyled>
      {contents.map(({ href, id, icon, avatar, title }) => {
        return (
          <NavItem
            active={href === currentPage}
            onClick={() => {}}
            key={id}
            href={href}>
            {icon ? (
              <IconWrapper>
                <Icon icon={icon} color="#1E4C40" />
              </IconWrapper>
            ) : (
              <AvatarStyled src={avatar} />
            )}
            <SpanStyled>{title}</SpanStyled>
          </NavItem>
        );
      })}
    </NavListStyled>
  );
};
