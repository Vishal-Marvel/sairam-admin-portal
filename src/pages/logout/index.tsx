import { useSession } from "@/providers/context/SessionContext";

export default function LogoutPage() {
  const { clearSession } = useSession();
  clearSession();
  return <>Logout</>;
}
