<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Chronic Disease Management Platform</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f6f9;
      color: #333;
      display: flex;
      justify-content: center;
      padding: 20px;
    }
    .container {
      max-width: 1000px;
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 20px;
    }
    h2 {
      text-align: center;
      color: #2a3d66;
    }
    /* Section Styles */
    .section {
      background: #fff;
      border-radius: 8px;
      padding: 15px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      display: flex;
      align-items: center;
      gap: 15px;
      cursor: pointer;
      transition: transform 0.2s;
    }
    .section:hover {
      transform: scale(1.02);
    }
    /* Icon Style */
    .icon {
      font-size: 40px;
      color: #2a3d66;
      flex-shrink: 0;
    }
    /* Text Styles */
    .text {
      flex-grow: 1;
    }
    .text h3 {
      font-size: 18px;
      color: #2a3d66;
    }
    .text p {
      font-size: 14px;
      color: #666;
    }
    /* Example Color Coding */
    .medicine { background-color: #e3f7f1; }
    .video-call { background-color: #e0e7ff; }
    .health-center { background-color: #fce4e6; }
    .appointment { background-color: #e6f0fc; }
    .reminder { background-color: #fff3e0; }
    .exercise { background-color: #f2f6e9; }
    .food-plan { background-color: #f5e0fc; }
    .checkup { background-color: #e0f4fc; }
    .doctor { background-color: #fdecef; }
    /* Button */
    .button {
      display: inline-block;
      padding: 10px 20px;
      background-color: #2a3d66;
      color: #fff;
      text-align: center;
      border-radius: 5px;
      text-decoration: none;
      font-size: 16px;
      transition: background 0.3s;
    }
    .button:hover {
      background-color: #405785;
    }
  </style>
</head>
<body>

<div class="container">
  <h2>Welcome to Your Health Dashboard</h2>

  <!-- Order Medicine -->
  <div class="section medicine">
    <div class="icon">💊</div>
    <div class="text">
      <h3>Order Medicine</h3>
      <p>Request your medications to be delivered to your doorstep.</p>
    </div>
  </div>

  <!-- Video Call with Doctor -->
  <div class="section video-call">
    <div class="icon">📹</div>
    <div class="text">
      <h3>Video Call with Doctor</h3>
      <p>Connect with your healthcare provider for a virtual consultation.</p>
    </div>
  </div>

  <!-- Nearest Health Centers -->
  <div class="section health-center">
    <div class="icon">🏥</div>
    <div class="text">
      <h3>Find Nearby Health Centers</h3>
      <p>Locate the nearest health centers for quick assistance.</p>
    </div>
  </div>

  <!-- Book Appointment -->
  <div class="section appointment">
    <div class="icon">📅</div>
    <div class="text">
      <h3>Book an Appointment</h3>
      <p>Schedule an appointment with your doctor.</p>
    </div>
  </div>

  <!-- Medicine Reorder Reminder -->
  <div class="section reminder">
    <div class="icon">⏰</div>
    <div class="text">
      <h3>Medicine Reorder Reminder</h3>
      <p>Receive reminders to reorder your medications.</p>
    </div>
  </div>

  <!-- Exercise Suggestions -->
  <div class="section exercise">
    <div class="icon">💪</div>
    <div class="text">
      <h3>Exercise Suggestions</h3>
      <p>Get simple exercises to manage your condition.</p>
    </div>
  </div>

  <!-- Food Plan -->
  <div class="section food-plan">
    <div class="icon">🍎</div>
    <div class="text">
      <h3>Personalized Food Plan</h3>
      <p>Follow a diet plan to improve your health.</p>
    </div>
  </div>

  <!-- Checkup Reminder -->
  <div class="section checkup">
    <div class="icon">🔬</div>
    <div class="text">
      <h3>Checkup Reminder</h3>
      <p>Don't forget your scheduled blood tests and checkups.</p>
    </div>
  </div>

  <!-- Choose Doctor -->
  <div class="section doctor">
    <div class="icon">👨‍⚕</div>
    <div class="text">
      <h3>Choose Your Doctor</h3>
      <p>Select a doctor specializing in Pulmonology, Cardiology, and more.</p>
    </div>
  </div>

  <!-- General Button (for Example) -->
  <a href="#" class="button">Get Started</a>
</div>

</body>
</html>