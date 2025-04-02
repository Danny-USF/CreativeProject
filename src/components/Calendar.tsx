import { useState, useEffect } from 'react';
import { Profile } from '../types/Profile';

interface CalendarProps {
  profiles: Profile[];
}

const Calendar = ({ profiles }: CalendarProps) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState<{ date: Date; profile: Profile }[]>([]);

  useEffect(() => {
    // Create events from profiles
    const profileEvents = profiles.map(profile => ({
      date: new Date(profile.birthday),
      profile
    }));
    setEvents(profileEvents);
  }, [profiles]);

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const getMonthName = (date: Date) => {
    return date.toLocaleString('default', { month: 'long' });
  };

  const getEventsForDay = (day: number) => {
    return events.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate.getDate() === day && 
             eventDate.getMonth() === currentDate.getMonth();
    });
  };

  const hasBirthdayOnDay = (day: number) => {
    return events.some(event => {
      const eventDate = new Date(event.date);
      return eventDate.getDate() === day && 
             eventDate.getMonth() === currentDate.getMonth();
    });
  };

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dayEvents = getEventsForDay(day);
      days.push(
        <div key={day} className="calendar-day">
          <span className="day-number">{day}</span>
          {hasBirthdayOnDay(day) && <div className="birthday-marker" />}
          {dayEvents.map((event, index) => {
            const age = currentDate.getFullYear() - new Date(event.date).getFullYear();
            return (
              <div key={index} className="calendar-event">
                🎂 {event.profile.fullName} ({age})
              </div>
            );
          })}
        </div>
      );
    }

    return days;
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  return (
    <div className="calendar">
      <div className="calendar-header">
        <button onClick={() => navigateMonth('prev')}>&lt;</button>
        <h2>{getMonthName(currentDate)} {currentDate.getFullYear()}</h2>
        <button onClick={() => navigateMonth('next')}>&gt;</button>
      </div>
      <div className="calendar-weekdays">
        <div>Sun</div>
        <div>Mon</div>
        <div>Tue</div>
        <div>Wed</div>
        <div>Thu</div>
        <div>Fri</div>
        <div>Sat</div>
      </div>
      <div className="calendar-grid">
        {renderCalendarDays()}
      </div>
    </div>
  );
};

export default Calendar; 