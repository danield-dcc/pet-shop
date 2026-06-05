'use server';

import { revalidatePath } from 'next/cache';
import z from 'zod';
import { prisma } from '@/lib/prisma';
import { calculatePeriod, formatDateTime } from '@/utils/appointmentsUtils';

const appointmentSchema = z.object({
  tutorName: z.string(),
  petName: z.string(),
  phone: z.string(),
  description: z.string(),
  scheduleAt: z.date(),
});

type AppointmentData = z.infer<typeof appointmentSchema>;

export async function createAppointment(data: AppointmentData) {
  try {
    const parsedData = appointmentSchema.parse(data);

    const { scheduleAt } = parsedData;

    // biome-ignore lint/correctness/useParseIntRadix: <explanation>
    const hour = parseInt(formatDateTime(scheduleAt));

    const { isMorning, isAfternoon, isEvening } = calculatePeriod(hour);

    if (!isMorning && !isAfternoon && !isEvening) {
      return {
        error:
          'Agendamentos só podem ser feitos entre 9h e 12h, 13h e 18h ou 18h e 21h',
      };
    }

    const existingAppointments = await prisma.appointment.findFirst({
      where: {
        scheduleAt,
      },
    });

    if (existingAppointments) {
      return {
        error: 'Este horário já está reservado',
      };
    }

    await prisma.appointment.create({
      data: { ...parsedData },
    });

    revalidatePath('/');
  } catch (error) {
    console.log(error);
    return { error: 'Erro ao criar agendamento. Tente novamente.' };
  }
}

export async function updateAppointment(id: string, data: AppointmentData) {
  try {
    const parsedData = appointmentSchema.parse(data);

    const { scheduleAt } = parsedData;

    // biome-ignore lint/correctness/useParseIntRadix: <explanation>
    const hour = parseInt(formatDateTime(scheduleAt));

    const { isMorning, isAfternoon, isEvening } = calculatePeriod(hour);

    if (!isMorning && !isAfternoon && !isEvening) {
      return {
        error:
          'Agendamentos só podem ser feitos entre 9h e 12h, 13h e 18h ou 18h e 21h',
      };
    }

    const existingAppointments = await prisma.appointment.findFirst({
      where: {
        scheduleAt,
        id: {
          not: id,
        },
      },
    });

    if (existingAppointments) {
      return {
        error: 'Este horário já está reservado',
      };
    }

    await prisma.appointment.update({
      where: {
        id,
      },
      data: {
        ...parsedData,
      },
    });

    revalidatePath('/');
  } catch (error) {
    console.log(error);
    return { error: 'Erro ao atualizar agendamento. Tente novamente.' };
  }
}

export async function deleteAppointment(id: string) {
  try {
    await prisma.appointment.delete({
      where: {
        id,
      },
    });

    revalidatePath('/');
  } catch (error) {
    console.log(error);
    return { error: 'Erro ao remover agendamento. Tente novamente.' };
  }
}
