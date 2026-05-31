import type { Appointment as AppointmentPrisma } from '@/generated/prisma/browser';
import type {
  AppointmentPeriod,
  AppointmentPeriodDay,
} from '@/types/appointment';

function getPeriod(hour: number): AppointmentPeriodDay {
  if (hour >= 9 && hour < 12) return 'morning';
  if (hour >= 13 && hour < 18) return 'afternoon';
  return 'evening';
}

export function groupAppointmentsByPeriod(
  appointments: AppointmentPrisma[]
): AppointmentPeriod[] {
  //pega todos os appointments e adiciona o items time, service e period
  const transformedAppointments = appointments?.map((item) => ({
    ...item,
    time: item.scheduleAt.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
    }),
    service: item.description,
    period: getPeriod(item.scheduleAt.getHours()),
  }));
  //pega todos transformedAppointments e os filtra por periodo, em um vetor/array
  const morningAppointments = transformedAppointments.filter(
    (apt) => apt.period === 'morning'
  );
  const afternoonAppointments = transformedAppointments.filter(
    (apt) => apt.period === 'afternoon'
  );
  const eveningAppointments = transformedAppointments.filter(
    (apt) => apt.period === 'evening'
  );
  //retorna um array com três objetos. Cada um dos objetos possui um array com os agendamentos
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
