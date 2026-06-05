import { endOfDay, parseISO, startOfDay } from 'date-fns';
import { AppointmentForm } from '@/components/appointment-fom';
import { DatePicker } from '@/components/date-picker';
import { PeriodSection } from '@/components/period-section';
import { Button } from '@/components/ui/button';
import { prisma } from '@/lib/prisma';
import { groupAppointmentsByPeriod } from '@/utils/appointmentsUtils';

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ date?: string }>;
}) {
  const { date } = await searchParams;
  const selectedDate = date ? parseISO(date) : new Date();

  const appointment = await prisma.appointment.findMany({
    where: {
      scheduleAt: {
        gte: startOfDay(selectedDate),
        lte: endOfDay(selectedDate),
      },
    },
    orderBy: {
      scheduleAt: 'asc',
    },
  });

  const periods = groupAppointmentsByPeriod(appointment);

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

        <div className="hidden md:flex items-center gap-4">
          <DatePicker />
        </div>
      </div>

      <div className="mt-3 mb-8 md:hidden">
        <DatePicker />
      </div>

      <div className="pb-24 mb:pb-0">
        {/* faz um map no array dos 3 objetos */}
        {periods.map((period, i) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: <map>
          <PeriodSection period={period} key={i} />
        ))}
      </div>

      <div
        className="fixed bottom-0 left-0 right-0 flex justify-center bg-[#23242C]
       py-4.5 px-6 md:mb-6 md:right-6 md:left-auto md:top-auto md:w-auto md:bg-transparent md:p-0"
      >
        <AppointmentForm>
          <Button variant="brand">Novo Agendamento</Button>
        </AppointmentForm>
      </div>
    </div>
  );
}
