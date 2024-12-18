import ReactEmojis from "@souhaildev/reactemojis";

export default function NoMessages() {
  return (
    <div className="flex-center h-full">
      <div className="flex flex-col items-center gap-2 backdrop-blur-sm p-2 rounded-3xl">
        <ReactEmojis emoji="🤗" />
        <span className="font-semibold">No Messages here yet...</span>
      </div>
    </div>
  );
}
