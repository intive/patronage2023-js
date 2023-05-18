"use client";
import styled from "styled-components";
import MultiCardLayout from "../MultiCardLayout";
import { UsersList } from "./UsersList";

const users = [
  {
    "id": "9206faf4-b041-4f8b-9f21-554c7ecd8b62",
    "email": "barandmaster@gmail.com",
    "firstName": "Dadsasd",
    "lastName": "asdasd",
    "attributes": {
      "avatar": [
        "/avatars/4.svg"
      ]
    },
    "createdTimestamp": 1682619002716,
    "createdVia": "Email"
  },
  {
    "id": "431f1668-34b0-4fc6-9e45-1f01e1f6180f",
    "email": "test@example.com",
    "firstName": "fstgrh",
    "lastName": "asdfasff",
    "attributes": {
      "avatar": [
        "/avatars/2.svg"
      ]
    },
    "createdTimestamp": 1683829673840,
    "createdVia": "Email"
  },
  {
    "id": "82eb6757-b858-45eb-9c79-5d29a4485290",
    "email": "rockybalboa@gmail.com",
    "firstName": "Rocky",
    "lastName": "Balboa",
    "attributes": {
      "avatar": [
        "6"
      ]
    },
    "createdTimestamp": 1684424205921,
    "createdVia": "Email"
  },
  {
    "id": "7a914ca8-79eb-4596-9555-48f3723d20d7",
    "email": "barand@o2.pl",
    "firstName": "Damian",
    "lastName": "Dara",
    "attributes": {
      "avatar": [
        "/avatars/8.svg"
      ]
    },
    "createdTimestamp": 1682525426588,
    "createdVia": "Email"
  },
  {
    "id": "6eec83a0-e98a-423f-bd9e-2bb91d80ba31",
    "email": "super@o2.pl",
    "firstName": "Damian",
    "lastName": "Daranowski",
    "attributes": {
      "avatar": [
        "/avatars/3.svg"
      ]
    },
    "createdTimestamp": 1683829435891,
    "createdVia": "Email"
  },
  {
    "id": "e67062b3-9701-4a9c-8981-4ff7b7f26acc",
    "email": "kjarzyna@zs.com",
    "firstName": "Krzysztof",
    "lastName": "Jarzyna",
    "attributes": {
      "avatar": [
        "/avatars/6.svg"
      ]
    },
    "createdTimestamp": 1683027691058,
    "createdVia": "Email"
  },
  {
    "id": "892b1d4e-b863-4de4-9e11-dc7f577205a7",
    "email": "jankowalski@gmail.com",
    "firstName": "Jan",
    "lastName": "Kowalski",
    "attributes": {
      "avatar": [
        "/avatars/1.svg"
      ]
    },
    "createdTimestamp": 1682526813678,
    "createdVia": "Email"
  },
  {
    "id": "84a2d0e9-c229-481c-9962-d7a5d0a3899f",
    "email": "jkowalski2@gmail.com",
    "firstName": "Jan",
    "lastName": "Kowalski",
    "attributes": {
      "avatar": [
        "/avatars/3.svg"
      ]
    },
    "createdTimestamp": 1682339426946,
    "createdVia": "Email"
  },
  {
    "id": "e17252ba-279e-45c7-ba1b-67003deb6c03",
    "email": "jkowalski@gmail.com",
    "firstName": "Jan",
    "lastName": "Kowalski",
    "attributes": {
      "avatar": [
        "/avatars/5.svg"
      ]
    },
    "createdTimestamp": 1682444250929,
    "createdVia": "Email"
  },
  {
    "id": "a3028ea5-6f66-4c77-a4a6-c9a4fe638397",
    "email": "jkowalskiooooooooo@gmail.com",
    "firstName": "Jan",
    "lastName": "Kowalski",
    "attributes": {
      "avatar": [
        "1"
      ]
    },
    "createdTimestamp": 1684418990932,
    "createdVia": "Email"
  },
  {
    "id": "76b71554-c0d7-44b2-8ffb-872a3481b754",
    "email": "mariankowalski@gmail.com",
    "firstName": "Marian",
    "lastName": "Kowalski",
    "attributes": {
      "avatar": [
        "1"
      ]
    },
    "createdTimestamp": 1684419366551,
    "createdVia": "Email"
  },
  {
    "id": "437a1199-61a0-4ae8-9023-c33371c1c980",
    "email": "pepe@gmail.com",
    "firstName": "Pepe",
    "lastName": "Kowalski",
    "attributes": {
      "avatar": [
        "8"
      ]
    },
    "createdTimestamp": 1684423994687,
    "createdVia": "Email"
  },
  {
    "id": "f6b98249-72a8-4e77-96c5-9a145434d5d9",
    "email": "ricokowalski25@gmail.com",
    "firstName": "Ricardo",
    "lastName": "Kowalski",
    "attributes": {
      "avatar": [
        "1"
      ]
    },
    "createdTimestamp": 1684421916131,
    "createdVia": "Email"
  },
  {
    "id": "5255f678-f8f6-4e55-b92a-993f3d3e56f3",
    "email": "ricokowalski@gmail.com",
    "firstName": "Rico",
    "lastName": "Kowalski",
    "attributes": {
      "avatar": [
        "1"
      ]
    },
    "createdTimestamp": 1684420046205,
    "createdVia": "Email"
  },
  {
    "id": "6ee384e6-7795-438b-b9b0-729f5d3402e5",
    "email": "wesolypepe@gmail.com",
    "firstName": "Pepe",
    "lastName": "Kowalski",
    "attributes": {
      "avatar": [
        "4"
      ]
    },
    "createdTimestamp": 1684423888440,
    "createdVia": "Email"
  },
  {
    "id": "10472f37-7d20-408e-ad84-ea6c2d4a26ef",
    "email": "andrzej.nowak@gmail.com",
    "firstName": "Andrzej",
    "lastName": "Nowak",
    "attributes": null,
    "createdTimestamp": 1683028135538,
    "createdVia": "Email"
  },
  {
    "id": "d30c0a05-b315-4ae7-a7f6-05e41f1d632b",
    "email": "michalrico@gmail.com",
    "firstName": "michal",
    "lastName": "rico",
    "attributes": {
      "avatar": [
        "1"
      ]
    },
    "createdTimestamp": 1684422443921,
    "createdVia": "Email"
  },
  {
    "id": "89ab744d-a254-4a02-a3fc-010f30aaaba7",
    "email": "ricardo@ricardo.com",
    "firstName": "ricardo",
    "lastName": "rico",
    "attributes": {
      "avatar": [
        "/avatars/3.svg"
      ]
    },
    "createdTimestamp": 1684425935335,
    "createdVia": "Email"
  },
  {
    "id": "ca103397-4117-487e-96ed-ef2d929b6242",
    "email": "szczepaniak.michal@gmail.com",
    "firstName": "Michal",
    "lastName": "Szczepaniak",
    "attributes": {
      "avatar": [
        "/avatars/1.svg"
      ]
    },
    "createdTimestamp": 1683733629230,
    "createdVia": "Email"
  },
  {
    "id": "a8f0ecaa-637b-4f8c-b76d-bc23063962b4",
    "email": "czlowiektest@gmail.com",
    "firstName": "Czlowiek",
    "lastName": "Test",
    "attributes": {
      "avatar": [
        "/avatars/2.svg"
      ]
    },
    "createdTimestamp": 1683892113764,
    "createdVia": "Email"
  },
  {
    "id": "95a824fb-1723-43f0-8e6b-782a4dca046a",
    "email": "marcintest@gmail.com",
    "firstName": "Marcin",
    "lastName": "Test",
    "attributes": {
      "avatar": [
        "/avatars/2.svg"
      ]
    },
    "createdTimestamp": 1684426420312,
    "createdVia": "Email"
  },
  {
    "id": "c5a6908c-c7c3-4d6e-a944-12398355ca31",
    "email": "olawyporkiewicz@gmail.com",
    "firstName": "Ola",
    "lastName": "Wy",
    "attributes": {
      "avatar": [
        "https://play-lh.googleusercontent.com/UjaAdTYsArv7zAJbqGWjQw2ftuOtnAlvokffC3TQQ2K12mwk0YdXUF2wZBTBA2kDZIk=w240-h480-rw"
      ]
    },
    "createdTimestamp": 1684419047909,
    "createdVia": "Email"
  },
  {
    "id": "82063f2e-9d9a-4b38-a22e-5572cee9ddf4",
    "email": "smutnarzaba@png.pl",
    "firstName": "smutna",
    "lastName": "zaba",
    "attributes": {
      "avatar": [
        "https://media.npr.org/assets/img/2017/09/12/macaca_nigra_self-portrait-3e0070aa19a7fe36e802253048411a38f14a79f8-s1100-c50.jpg"
      ]
    },
    "createdTimestamp": 1681833214367,
    "createdVia": "Email"
  }
];

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const TitleStyled = styled.h1`
  align-self: flex-start;
  width: 100%;
  font-family: "Signika", sans-serif;
  font-size: 32px;
  font-weight: 600;
  line-height: 48px;
  color: ${({ theme }) => theme.main};
`;

export default function UsersPage() {
  const mainCardContent = (
    <>
      <PageWrapper>
        <TitleStyled>Users</TitleStyled>
        <UsersList users={users}/>
      </PageWrapper>
    </>
  );
  const data = "Some user info";
  const shown = true;
  //conditionally render aside if needed e.g. pass user info to it etc.
  return (
    <MultiCardLayout
      main={mainCardContent}
      aside={shown ? <>{data}</> : <></>}
    />
  );
}
