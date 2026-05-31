import { PeriodSection } from '@/components/period-section';
import type { Appointment as AppointmentPrisma } from '@/generated/prisma/browser';
import type {
  AppointmentPeriod,
  AppointmentPeriodDay,
} from '@/types/appointment';

const appointments = [
  {
    id: '1',
    petName: 'Rex',
    description: 'Consulta',
    tutorName: 'João',
    phone: '1234567890',
    scheduleAt: new Date('2025-08-17T10:00:00'),
  },
  {
    id: '2',
    petName: 'Mimi',
    tutorName: 'Maria',
    description: 'Banho',
    phone: '1234567890',
    scheduleAt: new Date('2025-08-17T11:00:00'),
  },
  {
    id: '3',
    petName: 'Nina',
    tutorName: 'Natalia',
    description: 'Consulta',
    phone: '1234567890',
    scheduleAt: new Date('2025-08-17T14:00:00'),
  },
  {
    id: '4',
    petName: 'Nina',
    tutorName: 'Natalia',
    description: 'Consulta',
    phone: '1234567890',
    scheduleAt: new Date('2025-08-17T19:00:00'),
  },
];
function getPeriod(hour: number): AppointmentPeriodDay {
  if (hour >= 9 && hour < 12) return 'morning';
  if (hour >= 13 && hour < 18) return 'afternoon';
  return 'evening';
}

function groupAppointmentsByPeriod(
  appointments: AppointmentPrisma[]
): AppointmentPeriod[] {
  const transformedAppointments = appointments?.map((item) => ({
    ...item,
    time: item.scheduleAt.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
    }),
    service: item.description,
    period: getPeriod(item.scheduleAt.getHours()),
  }));

  const morningAppointments = transformedAppointments.filter(
    (apt) => apt.period === 'morning'
  );
  const afternoonAppointments = transformedAppointments.filter(
    (apt) => apt.period === 'afternoon'
  );
  const eveningAppointments = transformedAppointments.filter(
    (apt) => apt.period === 'evening'
  );

  return [
    {
      title: 'Manhã',
      type: 'morning',
      timeRange: '09h-12h',
      appointments: morningAppointments,
    },
    {
      title: 'Tarde',
      type: 'afternoon',
      timeRange: '13h-18h',
      appointments: afternoonAppointments,
    },
    {
      title: 'Noite',
      type: 'evening',
      timeRange: '19h-21h',
      appointments: eveningAppointments,
    },
  ];
}

export default function Home() {
  const periods = groupAppointmentsByPeriod(appointments);
  return (
    <div className="bg-background-primary p-6">
      <div className="flex items-center justify-between md:mb-8">
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
        {periods.map((period, i) => (
          <PeriodSection period={period} key={i} />
        ))}
      </div>
    </div>
  );
}
