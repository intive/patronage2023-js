import MultiCardLayout from "../MultiCardLayout";

export default function UsersPage() {
  const mainCardContent = <h1>Users</h1>;

  //pass to data aside when clicked on user
  return <MultiCardLayout main={mainCardContent} />;
}
