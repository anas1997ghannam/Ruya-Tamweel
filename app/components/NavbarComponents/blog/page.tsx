import { getCurrentUser } from "@/lib/auth";
import { cookies } from "next/headers";
import BlogPage from "./blog";

export default async function BlogWrapper() {
  const token = (await cookies()).get("token")?.value;
  const user = getCurrentUser(token);

  return <BlogPage userId={user?.userId} />;
}
