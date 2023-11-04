
function getClockElements() {
    return {
      day_hours: document.getElementById("hours"),
      day_minutes: document.getElementById("minutes"),
      day_seconds: document.getElementById("seconds"),
      day_period: document.getElementById("period"),
      day_of_the_week: document.getElementById("today"),
      current_date: document.getElementById("current_date"),
      spacer_a: document.getElementById("spacer1"),
      spacer_b: document.getElementById("spacer2"),
    };
  }
  
  function getCurrentTime() {
    let currentClock = moment().format("LTS");
    const [time, period] = currentClock.split(" ");
    const [hours, minutes, seconds] = time.split(":");
    const day_of_the_week = moment().format("ddd");
    const month_year =moment().format('LL');
  
    return { hours, minutes, seconds, day_of_the_week, period, month_year };
  }
  
  function updateClockDisplay({ hours, minutes, seconds, day_of_the_week, period, month_year }, elements) {
    elements.day_hours.innerHTML = hours;
    elements.day_minutes.innerHTML = minutes;
    elements.day_seconds.innerHTML = seconds;
    elements.day_period.innerHTML = period;
    elements.day_of_the_week.innerHTML = day_of_the_week;
    elements.current_date.innerHTML = month_year;
    elements.spacer_a.innerHTML = ":";
    elements.spacer_b.innerHTML = ":";
  }
  
  function startClockUpdate() {
    setInterval(() => {
      const currentTime = getCurrentTime();
      const elements = getClockElements();
      updateClockDisplay(currentTime, elements);
    }, 1000);
  }
  
  startClockUpdate();
  