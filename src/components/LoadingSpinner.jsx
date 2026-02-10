export default function LoadingSpinner({ label = "Loading..." }) {
  return (
    <div className="flex items-center justify-center py-10">
      <div className="flex items-center gap-3">
        <span className="loading loading-spinner loading-md" />
        <span className="opacity-70">{label}</span>
      </div>
    </div>
  );
}
