import SheetMeno from "@/components/template/room/sidebar/SheetMeno.tsx";
import Search from "@/components/template/room/sidebar/Search.tsx";
import UsersList from "@/components/template/room/sidebar/UsersList.tsx";

export default function Sidebar() {
  return (
    <section className="h-screen p-2 space-y-8">
      {/*  search*/}
      <div className="flex items-center justify-between gap-2">
        <SheetMeno />

        <Search />
      </div>

      <UsersList />
    </section>
  );
}
