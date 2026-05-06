import { Navbar } from "@/shared/components";

export default async function Layout({ children }: Children) {
  return (
    <div className="flex h-dvh flex-col">
      <Navbar />
      <main className="bg-background size-full overflow-y-auto">{children}</main>
    </div>
  );
}
