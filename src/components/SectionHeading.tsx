import type { ReactNode } from "react";
import Brushstroke from "./Brushstroke";

type Props = {
  eyebrow?: string;
  title: ReactNode;
  children?: ReactNode;
  center?: boolean;
  brushstroke?: boolean;
};

/** Standard section header: eyebrow + H2 + signature brushstroke + optional lead. */
export default function SectionHeading({
  eyebrow,
  title,
  children,
  center = false,
  brushstroke = true,
}: Props) {
  return (
    <div className={`section-head ${center ? "section-head--center" : ""}`}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 style={{ marginTop: eyebrow ? "0.5rem" : 0 }}>{title}</h2>
      {brushstroke && <Brushstroke className={center ? "brushstroke--center" : ""} />}
      {children && (
        <p className="lead" style={{ marginTop: "1rem" }}>
          {children}
        </p>
      )}
    </div>
  );
}
