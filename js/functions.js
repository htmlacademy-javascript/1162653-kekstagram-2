const HOURS_TO_MINUTES = 60;

// Функция для преобразования заданного времени в минуты
const timeToMinutes = (time) => {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * HOURS_TO_MINUTES + minutes;
};

// Проверяем, находится ли встреча в пределах рабочего дня
const isMeetingPossible = (dayStart, dayEnd, meetingStart, meetingLength) => {
  const startOfDay = timeToMinutes(dayStart);
  const endOfDay = timeToMinutes(dayEnd);
  const startOfMeeting = timeToMinutes(meetingStart);
  const endOfMeeting = startOfMeeting + meetingLength;

  return startOfMeeting >= startOfDay && endOfMeeting <= endOfDay;
};


isMeetingPossible('08:00', '17:30', '14:00', 90); // true
isMeetingPossible('8:0', '10:0', '8:0', 120); // true
isMeetingPossible('08:00', '14:30', '14:00', 90); // false
isMeetingPossible('14:00', '17:30', '08:0', 90); // false
isMeetingPossible('8:00', '17:30', '08:00', 900); // false
