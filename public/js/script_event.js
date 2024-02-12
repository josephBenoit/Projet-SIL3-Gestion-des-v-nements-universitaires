document.addEventListener('DOMContentLoaded', 
function () 
{
  const prevMonthBtn = document.getElementById('prevMonth');
  const nextMonthBtn = document.getElementById('nextMonth');
  const currentMonthLabel = document.getElementById('currentMonth');
  const calendarBody = document.querySelector('#calendar tbody');
  const eventListContainer = document.getElementById('eventList');
  const eventDetailsContainer = document.getElementById('eventDetails');

  let currentDate = new Date();
  let eventsData = [];

  //Ajouter des evenement, sur le calendrier
  eventsData = [
    { date: '2024-02-10', title: 'Event 1', details: 'Details for Event 1' },
    { date: '2024-02-15', title: 'Event 2', details: 'Details for Event 2' },
    { date: '2024-04-15', title: 'Event 3', details: 'Details for Event 3' },
    { date: '2024-10-15', title: 'Event 17', details: 'Details for Event 17' },
    
    { date: '2024-02-11', title: 'Event 5', details: 'Details for Event 5' },
    { date: '2024-02-16', title: 'Event 6', details: 'Details for Event 6' },
    { date: '2024-02-20', title: 'Event 7', details: 'Details for Event 7' },
    { date: '2024-02-05', title: 'Event 8', details: 'Details for Event 8' },

    { date: '2024-03-21', title: 'Event 9', details: 'Details for Event 9' },
    { date: '2024-03-17', title: 'Event 10', details: 'Details for Event 10' },
    { date: '2024-03-12', title: 'Event 11', details: 'Details for Event 11' },
    { date: '2024-03-19', title: 'Event 12', details: 'Details for Event 12' },

    { date: '2024-04-21', title: 'Event 13', details: 'Details for Event 13' },
    { date: '2024-04-17', title: 'Event 14', details: 'Details for Event 14' },
    { date: '2024-04-18', title: 'Event 15', details: 'Details for Event 15' },
    { date: '2024-02-19', title: 'Event 16', details: 'Details for Event 16' },
  ];

  renderCalendar(currentDate); 
  renderEventList(currentDate);

  prevMonthBtn.addEventListener('click', function () //Aller au mois precedent
  {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar(currentDate);
    renderEventList(currentDate);
  });

  nextMonthBtn.addEventListener('click', function () //Aller au mois suivant
  {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar(currentDate);
    renderEventList(currentDate);
  });

  function renderCalendar(date) //Afficher les jours du mois selectionner
  {
    currentMonthLabel.textContent = getMonthYearString(date);
    calendarBody.innerHTML = '';

    const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    let currentDate = new Date(firstDayOfMonth);

    while (currentDate.getDay() !== 0) 
    {
    currentDate.setDate(currentDate.getDate() - 1);
    }

    while (currentDate <= lastDayOfMonth) 
    {
      const row = document.createElement('tr');

      for (let i = 0; i < 7; i++) 
      {
        const cell = document.createElement('td');
        cell.textContent = currentDate.getDate();
        row.appendChild(cell);

        if (currentDate.getMonth() !== date.getMonth()) 
        {
          cell.classList.add('other-month');
        } 
        else 
        {
          const eventsForDay = getEventsForDay(currentDate);
          if (eventsForDay.length > 0) 
          {
            cell.classList.add('has-events');
            cell.dataset.events = JSON.stringify(eventsForDay);
            cell.addEventListener('click', showEventDetails);
          }
        }

        currentDate.setDate(currentDate.getDate() + 1);
      }

      calendarBody.appendChild(row);
    }
  }

  function getMonthYearString(date) //Retourne la date courente
  {
    const options = { month: 'long', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  }

  function getEventsForDay(date) //Retourne les jours des evenements
  {
    const dateString = formatDate(date);
    return eventsData.filter(event => event.date === dateString);
  }

  function renderEventList(date) //Affiche la liste des evenements
  {
    const eventsForMonth = getEventsForMonth(date);
    const formattedEvents = eventsForMonth.map(event => `<li class="eventsList-li">${event.title}</li>`).join('');
    eventListContainer.innerHTML = formattedEvents;
  }

  function getEventsForMonth(date) //Retourne la date des evenements du mois
  {
    const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    const eventsForMonth = eventsData.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate >= firstDayOfMonth && eventDate <= lastDayOfMonth;
    });
    return eventsForMonth;
  }

  function showEventDetails(event) //Donne les details de l'evenement selectionner
  {
    const selectedDate = new Date(currentDate);
    selectedDate.setDate(parseInt(event.target.textContent));
    const eventsForDay = getEventsForDay(selectedDate);
    const formattedEvents = eventsForDay.map(event => `<li class="eventsList-li">${event.title}</li>`).join('');
    eventDetailsContainer.innerHTML = `<h2>${getMonthYearString(selectedDate)}</h2><ul>${formattedEvents}</ul>`;
    var eventDetails = document.getElementById('eventDetails');
  
    if (eventDetails.style.display === 'none' || eventDetails.style.display === '') 
    {
        eventDetails.style.display = 'block';
    }
  }

  function formatDate(date) //Retourne le format de la date
  {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }     
});

// Afficher le filtre
function toggleFilter() 
{
  var filtreContainer = document.getElementById('filter-container');
  
  if (filtreContainer.style.display === 'none' || filtreContainer.style.display === '') 
  {
      filtreContainer.style.display = 'flex';
  } 
  else 
  {
      filtreContainer.style.display = 'none';
  }
} 

// Cacher les details des evenements
function toggleCalendarBtn() 
{
  var eventDetails = document.getElementById('eventDetails');
  
  if (eventDetails.style.display === 'block' || eventDetails.style.display === '') 
  {
      eventDetails.style.display = 'none';
  }
}