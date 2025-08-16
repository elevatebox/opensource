// API Base URL - change this to match your server
const API_URL = 'http://localhost:3000/api';

// DOM Elements
const calendarDays = document.getElementById('calendar-days');
const monthYear = document.getElementById('month-year');
const prevMonthBtn = document.getElementById('prev-month');
const nextMonthBtn = document.getElementById('next-month');
const todayDateEl = document.getElementById('today-date');
const todayTimeEl = document.getElementById('today-time');
const entryContainer = document.getElementById('entry-container');
const viewEntry = document.getElementById('view-entry');
const entryForm = document.getElementById('entry-form');
const entryTextarea = document.getElementById('entry-textarea');
const entryDate = document.getElementById('entry-date');
const entryText = document.getElementById('entry-text');
const saveEntryBtn = document.getElementById('save-entry');
const cancelEntryBtn = document.getElementById('cancel-entry');
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modal-title');
const modalDate = document.getElementById('modal-date');
const modalEntryText = document.getElementById('modal-entry-text');
const modalViewEntry = document.getElementById('modal-view-entry');
const modalSetReminder = document.getElementById('modal-set-reminder');
const modalReminderList = document.getElementById('modal-reminder-list');
const reminderTitle = document.getElementById('reminder-title');
const saveReminderBtn = document.getElementById('save-reminder');
const reminderList = document.getElementById('reminder-list');
const closeModalBtn = document.querySelector('.close-modal');

// State variables
let currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();
let entries = [];
let reminders = [];
let selectedDate = '';

// Initialize the application
function initApp() {
    updateDateTime();
    loadEntries();
    loadReminders();
    renderCalendar();
    
    // Set up event listeners
    prevMonthBtn.addEventListener('click', () => {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        renderCalendar();
    });
    
    nextMonthBtn.addEventListener('click', () => {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        renderCalendar();
    });
    
    saveEntryBtn.addEventListener('click', saveEntry);
    cancelEntryBtn.addEventListener('click', hideEntryForm);
    closeModalBtn.addEventListener('click', closeModal);
    saveReminderBtn.addEventListener('click', saveReminder);
    
    // Update time every minute
    setInterval(updateDateTime, 60000);
}

// Convert to IST (Indian Standard Time)
function getISTDate(date = new Date()) {
    // IST is UTC+5:30
    const istTime = new Date(date.getTime() + (5.5 * 60 * 60 * 1000));
    return istTime.toISOString().split('T')[0]; // Return YYYY-MM-DD format
}

// Format date as "Day, Month Date, Year"
function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        timeZone: 'Asia/Kolkata' // IST timezone
    });
}

// Update current date and time display
function updateDateTime() {
    const now = new Date();
    // IST is UTC+5:30
    const istTime = new Date(now.getTime() + (5.5 * 60 * 60 * 1000));
    
    todayDateEl.textContent = istTime.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        timeZone: 'Asia/Kolkata'
    });
    
    todayTimeEl.textContent = istTime.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
        timeZone: 'Asia/Kolkata'
    });
}

// Load entries from API
async function loadEntries() {
    try {
        const response = await fetch(`${API_URL}/entries`);
        if (!response.ok) throw new Error('Failed to load entries');
        entries = await response.json();
        renderCalendar(); // Re-render calendar with entry data
    } catch (error) {
        console.error('Error loading entries:', error);
    }
}

// Load reminders from API
async function loadReminders() {
    try {
        const response = await fetch(`${API_URL}/reminders`);
        if (!response.ok) throw new Error('Failed to load reminders');
        reminders = await response.json();
        renderCalendar(); // Re-render calendar with reminder data
    } catch (error) {
        console.error('Error loading reminders:', error);
    }
}

// Render calendar
function renderCalendar() {
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay(); // 0-6 (Sunday-Saturday)
    
    // Update header
    monthYear.textContent = `${firstDay.toLocaleString('default', { month: 'long' })} ${currentYear}`;
    
    // Clear existing days
    calendarDays.innerHTML = '';
    
    // Get today's date in IST
    const today = getISTDate();
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDay; i++) {
        const prevMonthLastDay = new Date(currentYear, currentMonth, 0).getDate();
        const prevMonthDay = prevMonthLastDay - (startingDay - i - 1);
        const dayEl = document.createElement('div');
        dayEl.classList.add('day', 'other-month');
        dayEl.textContent = prevMonthDay;
        calendarDays.appendChild(dayEl);
    }
    
    // Add days of the current month
    for (let i = 1; i <= daysInMonth; i++) {
        const dayEl = document.createElement('div');
        dayEl.classList.add('day');
        dayEl.textContent = i;
        
        // Format date for comparison
        const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
        
        // Check if this day is today
        if (dateStr === today) {
            dayEl.classList.add('today');
        }
        
        // Check if this day has an entry
        if (entries.some(entry => entry.date === dateStr)) {
            dayEl.classList.add('has-entry');
        }
        
        // Check if this day has a reminder
        if (reminders.some(reminder => reminder.date === dateStr)) {
            dayEl.classList.add('has-reminder');
        }
        
        // Check if this is a future date
        if (dateStr > today) {
            dayEl.classList.add('future');
        }
        
        // Add click event
        dayEl.addEventListener('click', () => handleDayClick(dateStr));
        
        calendarDays.appendChild(dayEl);
    }
    
    // Add empty cells for days after the last day of the month
    const daysAfter = 42 - (startingDay + daysInMonth); // 6 rows * 7 days = 42
    for (let i = 1; i <= daysAfter; i++) {
        const dayEl = document.createElement('div');
        dayEl.classList.add('day', 'other-month');
        dayEl.textContent = i;
        calendarDays.appendChild(dayEl);
    }
}

// Handle day click
function handleDayClick(dateStr) {
    selectedDate = dateStr;
    const today = getISTDate();
    
    if (dateStr === today) {
        // Show entry form for today
        showEntryForm(dateStr);
    } else if (dateStr < today) {
        // Show past entry in modal if exists
        const entry = entries.find(e => e.date === dateStr);
        if (entry) {
            showEntryModal(entry);
        } else {
            showNoEntryModal(dateStr);
        }
    } else {
        // Show reminder form for future date
        showReminderModal(dateStr);
    }
}

// Show entry form for today
function showEntryForm(dateStr) {
    entryDate.textContent = formatDate(dateStr);
    
    // Check if entry exists for today
    const entry = entries.find(e => e.date === dateStr);
    if (entry) {
        entryTextarea.value = entry.content;
        entryText.textContent = entry.content;
    } else {
        entryTextarea.value = '';
        entryText.textContent = 'No entry for today yet.';
    }
    
    viewEntry.style.display = 'none';
    entryForm.style.display = 'flex';
}

// Hide entry form
function hideEntryForm() {
    entryForm.style.display = 'none';
    viewEntry.style.display = 'block';
}

// Save entry
async function saveEntry() {
    const content = entryTextarea.value.trim();
    if (!content) {
        alert('Please write something in your diary entry.');
        return;
    }
    
    try {
        const response = await fetch(`${API_URL}/entries`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ content })
        });
        
        if (!response.ok) throw new Error('Failed to save entry');
        
        // Update UI
        entryText.textContent = content;
        hideEntryForm();
        
        // Reload entries to update calendar
        loadEntries();
        
        alert('Entry saved successfully!');
    } catch (error) {
        console.error('Error saving entry:', error);
        alert('Failed to save entry. Please try again.');
    }
}

// Show modal for past entry
function showEntryModal(entry) {
    modalTitle.textContent = `Entry for ${formatDate(entry.date)}`;
    modalDate.textContent = entry.date;
    modalEntryText.textContent = entry.content;
    
    // Show entry view, hide reminder form
    modalViewEntry.style.display = 'block';
    modalSetReminder.style.display = 'none';
    
    // Check if there are reminders for this date
    const dateReminders = reminders.filter(r => r.date === entry.date);
    if (dateReminders.length > 0) {
        displayReminders(dateReminders);
    } else {
        modalReminderList.style.display = 'none';
    }
    
    // Show modal
    modal.style.display = 'flex';
}

// Show modal for no entry
function showNoEntryModal(dateStr) {
    modalTitle.textContent = `No Entry for ${formatDate(dateStr)}`;
    modalDate.textContent = dateStr;
    modalEntryText.textContent = 'No diary entry was made on this date.';
    
    // Show entry view, hide reminder form
    modalViewEntry.style.display = 'block';
    modalSetReminder.style.display = 'none';
    
    // Check if there are reminders for this date
    const dateReminders = reminders.filter(r => r.date === dateStr);
    if (dateReminders.length > 0) {
        displayReminders(dateReminders);
    } else {
        modalReminderList.style.display = 'none';
    }
    
    // Show modal
    modal.style.display = 'flex';
}

// Show modal for setting reminder
function showReminderModal(dateStr) {
    modalTitle.textContent = `Set Reminder for ${formatDate(dateStr)}`;
    modalDate.textContent = dateStr;
    reminderTitle.value = '';
    
    // Hide entry view, show reminder form
    modalViewEntry.style.display = 'none';
    modalSetReminder.style.display = 'block';
    
    // Check if there are reminders for this date
    const dateReminders = reminders.filter(r => r.date === dateStr);
    if (dateReminders.length > 0) {
        displayReminders(dateReminders);
    } else {
        modalReminderList.style.display = 'none';
    }
    
    // Show modal
    modal.style.display = 'flex';
}

// Display reminders in modal
function displayReminders(dateReminders) {
    reminderList.innerHTML = '';
    
    dateReminders.forEach(reminder => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${reminder.title}</span>
            <i class="fas fa-trash delete-reminder" data-id="${reminder.id}"></i>
        `;
        
        // Add delete event listener
        li.querySelector('.delete-reminder').addEventListener('click', () => {
            deleteReminder(reminder.id);
        });
        
        reminderList.appendChild(li);
    });
    
    modalReminderList.style.display = 'block';
}

// Save reminder
async function saveReminder() {
    const title = reminderTitle.value.trim();
    if (!title) {
        alert('Please enter a reminder title.');
        return;
    }
    
    try {
        const response = await fetch(`${API_URL}/reminders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ date: selectedDate, title })
        });
        
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to save reminder');
        }
        
        // Clear input
        reminderTitle.value = '';
        
        // Reload reminders to update UI
        await loadReminders();
        
        // Update modal with new reminders
        const dateReminders = reminders.filter(r => r.date === selectedDate);
        displayReminders(dateReminders);
        
        alert('Reminder set successfully!');
    } catch (error) {
        console.error('Error saving reminder:', error);
        alert(error.message || 'Failed to save reminder. Please try again.');
    }
}

// Delete reminder
async function deleteReminder(id) {
    if (!confirm('Are you sure you want to delete this reminder?')) {
        return;
    }
    
    try {
        const response = await fetch(`${API_URL}/reminders/${id}`, {
            method: 'DELETE'
        });
        
        if (!response.ok) throw new Error('Failed to delete reminder');
        
        // Reload reminders to update UI
        await loadReminders();
        
        // Update modal with new reminders
        const dateReminders = reminders.filter(r => r.date === selectedDate);
        if (dateReminders.length > 0) {
            displayReminders(dateReminders);
        } else {
            modalReminderList.style.display = 'none';
        }
        
        alert('Reminder deleted successfully!');
    } catch (error) {
        console.error('Error deleting reminder:', error);
        alert('Failed to delete reminder. Please try again.');
    }
}

// Close modal
function closeModal() {
    modal.style.display = 'none';
}

// Close modal when clicking outside
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        closeModal();
    }
});

// Initialize the app when the DOM is loaded
document.addEventListener('DOMContentLoaded', initApp);
