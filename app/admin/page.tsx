import Logo from "@/components/logo";
import StatCard from "@/components/statCard";
import { columns } from "@/components/table/columns";
import { DataTable } from "@/components/table/dataTable";
import { getRecentAppointmentList } from "@/lib/actions/appointment.actions";

export default async function Admin() {
  const appointment = await getRecentAppointmentList();

  return (
    <div className="mx-auto flex max-w-7xl  flex-col space-y-14">
      <header className="admin-header">
        <Logo width={192} height={32} logoStyle="h-8 w-fit " />
        <p className="text-16-semibold">Admin Dashboard</p>
      </header>

      <main className="admin-main">
        <section className="w-full space-y-4">
          <h1 className="header">Welcome 👋</h1>
          <p className="text-dark-700">
            Start the day with managing new appointment
          </p>
        </section>
        <section className="admin-stat">
          <StatCard
            type="scheduled"
            count={appointment.scheduleCount}
            label="Scheduled appointment"
            icon="/assets/icons/appointments.svg"
          />
          <StatCard
            type="pending"
            count={appointment.pendingCount}
            label="Pending appointment"
            icon="/assets/icons/pending.svg"
          />
          <StatCard
            type="cancelled"
            count={appointment.cancelledCount}
            label="Cancelled appointment"
            icon="/assets/icons/cancelled.svg"
          />
        </section>
        <DataTable data={appointment.documents} columns={columns} />
      </main>
    </div>
  );
}
