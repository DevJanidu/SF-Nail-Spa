import Link from "next/link";

/** Mobile-only sticky Book Appointment bar (SRS FR-11.3). */
export default function StickyBook() {
  return (
    <div className="sticky-book">
      <Link href="/booking" className="btn btn-primary">
        Book Appointment
      </Link>
    </div>
  );
}
