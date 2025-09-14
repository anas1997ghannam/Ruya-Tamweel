// path: app/page.tsx
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";

export default async function LandingPage() {
  const token = (await cookies()).get("token")?.value;

  const user = getCurrentUser(token);

  if (user) {
    if (user.role === "admin") redirect("/admin");
    if (user.role === "entrepreneur") redirect("/dashboard/entrepreneur");
    if (user.role === "investor") redirect("/dashboard/investor");
  } else {
    redirect("/components/home");
  }

  // إذا ما في مستخدم نرجع الواجهة الرئيسية
}
