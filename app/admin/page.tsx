import AdminBadge from "@/components/adminBadge";
import Logo from "@/components/logo";
import StatCard from "@/components/statCard";
import { columns } from "@/components/table/columns";
import { DataTable } from "@/components/table/dataTable";
import { Button } from "@/components/ui/button";
import { getRecentAppointmentList } from "@/lib/actions/appointment.actions";
import { getUser } from "@/lib/actions/patient.action";

export default async function Admin() {
  const appointment = await getRecentAppointmentList();

  //todo: this should get admin of panel not users (patient)
  const currentUser = await getUser(appointment.documents[0].userId);

  // manage doctors infos

  return (
    <div className="mx-auto flex max-w-7xl  flex-col space-y-14">
      <header className="admin-header">
        <Logo width={192} height={32} logoStyle="h-8 w-fit " />

        <AdminBadge
          adminName={currentUser.name}
          adminImage={currentUser.image}
        />
      </header>

      <main className="admin-main">
        <section className=" flex justify-between w-full space-y-4">
          <div className="admin-sec">
            <h1 className="header">Welcome {currentUser.name} 👋</h1>
            <p className="text-dark-700">
              Start the day with managing new appointment
            </p>
          </div>
          <div className="admin-ac flex justify-start gap-1">
            <Button variant="ghost" className="border border-dashed">
              Manage Doctors
            </Button>
            <Button variant="ghost" className="border border-dashed">
              Manage Patients
            </Button>
            <Button variant="ghost" className="border border-dashed">
              Manage Appointments
            </Button>
            <Button variant="ghost" className="border border-dashed">
              Logout
            </Button>
          </div>
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
