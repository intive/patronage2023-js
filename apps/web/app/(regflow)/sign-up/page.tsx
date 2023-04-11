import { ProfileScreen } from "./ProfileScreen";

export default function SignUpPage() {
  return <ProfileScreen back={() => alert("Back")} done={() => alert("Done")} />;
}
