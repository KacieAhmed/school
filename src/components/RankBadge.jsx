export default function RankBadge({ rank, size = 28 }) {
  const s = size;
  const half = s / 2;

  // Shield shape path scaled to size
  const shieldPath = `M${half} ${s * 0.04} L${s * 0.9} ${s * 0.22} L${s * 0.9} ${s * 0.55} C${s * 0.9} ${s * 0.72} ${s * 0.72} ${s * 0.86} ${half} ${s * 0.96} C${s * 0.28} ${s * 0.86} ${s * 0.1} ${s * 0.72} ${s * 0.1} ${s * 0.55} L${s * 0.1} ${s * 0.22} Z`;

  const starY = s * 0.42;
  const starSize = rank.name === 'Grandmaster' ? s * 0.18 : s * 0.22;

  // Number of stars per rank
  const stars = rank.name === 'Grandmaster' ? 3 : rank.name === 'Master' ? 2 : 1;

  function starPath(cx, cy, r) {
    const pts = [];
    for (let i = 0; i < 5; i++) {
      const angle = (i * 72 - 90) * Math.PI / 180;
      pts.push(`${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`);
      const inner = (i * 72 + 36 - 90) * Math.PI / 180;
      pts.push(`${cx + r * 0.4 * Math.cos(inner)},${cy + r * 0.4 * Math.sin(inner)}`);
    }
    return `M${pts.join('L')}Z`;
  }

  return (
    <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} className="flex-shrink-0">
      {/* Shield */}
      <path d={shieldPath} fill={rank.bg + '25'} stroke={rank.color} strokeWidth={1.5} />
      {/* Stars */}
      {stars === 1 && (
        <path d={starPath(half, starY, starSize)} fill={rank.color} />
      )}
      {stars === 2 && (
        <>
          <path d={starPath(half - s * 0.14, starY, starSize * 0.85)} fill={rank.color} />
          <path d={starPath(half + s * 0.14, starY, starSize * 0.85)} fill={rank.color} />
        </>
      )}
      {stars === 3 && (
        <>
          <path d={starPath(half, starY - s * 0.12, starSize * 0.8)} fill={rank.color} />
          <path d={starPath(half - s * 0.16, starY + s * 0.08, starSize * 0.7)} fill={rank.color} />
          <path d={starPath(half + s * 0.16, starY + s * 0.08, starSize * 0.7)} fill={rank.color} />
        </>
      )}
      {/* Rank initial */}
      <text
        x={half}
        y={s * 0.78}
        textAnchor="middle"
        fontSize={s * 0.22}
        fontWeight="bold"
        fill={rank.color}
      >
        {rank.name === 'Grandmaster' ? 'GM' : rank.name === 'Unranked' ? '-' : rank.name[0]}
      </text>
    </svg>
  );
}
