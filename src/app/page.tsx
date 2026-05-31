import { PeriodSection } from '@/components/period-section';
import { prisma } from '@/lib/prisma';
import { groupAppointmentsByPeriod } from '@/utils/appointmentsUtils';
import { APPOINTMENT_MOCK_DATA } from '@/utils/mock-data';

export default async function Home() {
  const appointment = await prisma.appointment.findMany();
  console.log(appointment);

  const periods = groupAppointmentsByPeriod(APPOINTMENT_MOCK_DATA);

  return (
    <div className="bg-background-primary p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-title-size text-content-primary mb-2">
            Sua agenda
          </h1>
          <p className="text-paragraph-medium-size text-content-secondary">
            Aqui você pode ver todos os clientes e serviços agendados para hoje.
          </p>
        </div>
      </div>

      <div className="pb-24 mb:pb-0">
        {/* faz um map no array dos 3 objetos */}
        {periods.map((period, i) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: <map>
          <PeriodSection period={period} key={i} />
        ))}
      </div>
    </div>
  );
}
