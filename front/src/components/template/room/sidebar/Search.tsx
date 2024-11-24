import { Input } from "@/components/ui/input.tsx";

export default function Search() {
  return (
    <Input
      className="focus-visible:ring-0 focus-visible:ring-offset-0"
      placeholder="search..."
    />
  );
}
