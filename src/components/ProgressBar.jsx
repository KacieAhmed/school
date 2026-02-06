export default function ProgressBar({ percentage }) {
  return (
    <div className="w-full bg-surface-light rounded-full h-2.5 overflow-hidden">
      <div
        className="h-full rounded-full bg-gradient-to-r from-primary to-primary-light transition-all duration-500"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}
