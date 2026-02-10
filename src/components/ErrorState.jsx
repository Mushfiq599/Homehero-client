export default function ErrorState({ message = "Something went wrong." }) {
  return (
    <div className="max-w-2xl mx-auto py-10">
      <div className="alert alert-error">
        <span className="text-sm">{message}</span>
      </div>
    </div>
  );
}
