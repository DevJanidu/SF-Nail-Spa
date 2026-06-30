import { hours } from "@/lib/data";

export default function HoursTable() {
  // Server-rendered "today" highlight (uses server time; no client mismatch).
  const todayName = new Date().toLocaleDateString("en-US", { weekday: "long" });
  return (
    <table className="info-table">
      <tbody>
        {hours.map((h) => (
          <tr key={h.day} className={h.day === todayName ? "is-today" : ""}>
            <td>{h.day}</td>
            <td>{h.hours}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
