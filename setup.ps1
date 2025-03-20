# PowerShell Script: setup.ps1
# This script creates the full folder structure and placeholder files for your portfolio website.

# Set your project folder name
$projectName = "YourPortfolioProject"

# Create the root project folder and navigate into it
New-Item -ItemType Directory -Path $projectName -Force | Out-Null
Set-Location $projectName

# Create subdirectories
New-Item -ItemType Directory -Path "assets/images" -Force | Out-Null
New-Item -ItemType Directory -Path "assets/icons" -Force | Out-Null
New-Item -ItemType Directory -Path "assets/audio" -Force | Out-Null
New-Item -ItemType Directory -Path "css" -Force | Out-Null
New-Item -ItemType Directory -Path "js" -Force | Out-Null
New-Item -ItemType Directory -Path "pages" -Force | Out-Null

# Create index.html (Landing Page with Interactive Timeline)
@"
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Ashish Paka – Robotics & Autonomous Systems Portfolio</title>
  <link rel="stylesheet" href="css/style.css" />
  <link rel="stylesheet" href="css/timeline.css" />
  <link rel="stylesheet" href="css/responsive.css" />
</head>
<body class="light-mode">
  <!-- Fixed Top Navigation -->
  <header class="site-header">
    <div class="logo-container">
      <a href="index.html">
        <img src="assets/images/logo.png" alt="Ashish Logo" class="site-logo">
      </a>
    </div>
    <nav class="main-nav">
      <ul>
        <li><a href="index.html">Home</a></li>
        <li><a href="pages/about.html">About Me</a></li>
        <li><a href="pages/education.html">Education</a></li>
        <li><a href="pages/experience.html">Experience</a></li>
        <li><a href="pages/projects.html">Projects</a></li>
        <li><a href="pages/skills.html">Skills</a></li>
        <li><a href="pages/publications.html">Publications & Patents</a></li>
        <li><a href="pages/knowledge-map.html">Knowledge Map</a></li>
        <li><a href="pages/resume.html">Resume</a></li>
        <li><a href="pages/contact.html">Contact</a></li>
      </ul>
    </nav>
    <div class="theme-toggle">
      <button id="themeToggleBtn">
        <img src="assets/icons/light_mode_icon.svg" alt="Toggle Theme" id="themeIcon">
      </button>
    </div>
  </header>

  <!-- Interactive Timeline Section -->
  <main class="timeline-container">
    <h1>Connecting the Dots: My Robotics Journey</h1>
    <div class="timeline-track">
      <!-- Timeline Stop 1: About Me (Default Expanded) -->
      <div class="timeline-stop" data-stop="about-me">
        <div class="minimized-card active">
          <img src="assets/images/your_headshot.jpg" alt="Ashish Headshot">
          <div class="minimized-text">
            <h3>About Me</h3>
            <p>Robotics Engineer passionate in advanced perception...</p>
            <p>Transformative robotics technologies...</p>
          </div>
        </div>
        <div class="maximized-card show">
          <button class="close-card">X</button>
          <h2>About Me</h2>
          <p>
            Robotics Engineer passionate in advanced perception and autonomous systems to shape the future human robot future.
            Looking for opportunities to work and developing transformative robotics technologies that meaningfully impact life on Earth and drive global progress.
          </p>
          <ul>
            <li><strong>Contact:</strong> +1 (480)-651-5047 | <a href="mailto:ashishpaka1998@gmail.com">ashishpaka1998@gmail.com</a></li>
            <li><strong>GitHub:</strong> <a href="https://github.com/Ashish-Paka" target="_blank">github.com/Ashish-Paka</a></li>
            <li><strong>LinkedIn:</strong> <a href="http://www.linkedin.com/in/ashish-autonomousrobotics" target="_blank">linkedin.com/in/ashish-autonomousrobotics</a></li>
          </ul>
          <p><em>Priorities: Robotics, Reinforcement Learning, Autonomous Driving, Machine Learning, Deep Learning, Mechanical Design, Prototyping.</em></p>
          <p><strong>Note:</strong> For detailed navigation, please use the top tabs.</p>
          <a class="more-link" href="pages/about.html">Learn More About Me</a>
        </div>
      </div>

      <!-- Timeline Stop 2: Early Education -->
      <div class="timeline-stop" data-stop="early-education">
        <div class="minimized-card">
          <img src="assets/images/education_icon.png" alt="Early Education">
          <div class="minimized-text">
            <h3>Early Education</h3>
            <p>Pre-University: Telangana Board (95.2%)</p>
            <p>High School: ICSE (91.5%)</p>
          </div>
        </div>
        <div class="maximized-card">
          <button class="close-card">X</button>
          <h2>Early Education</h2>
          <p>
            <strong>Pre-University (12th Board):</strong> Telangana Board of Intermediate Education, Sri Chaitanya Narayana Junior Kalasala – Hyderabad, India – Major in Physics, Chemistry, and Maths – 95.2%.
          </p>
          <p>
            <strong>High School (ICSE):</strong> Kalpa School, Hyderabad, Telangana, India – 91.5%.
          </p>
          <p><strong>Note:</strong> For detailed navigation, please use the top tabs.</p>
          <a class="more-link" href="pages/education.html">Learn More About Education</a>
        </div>
      </div>

      <!-- Timeline Stop 3: Education -->
      <div class="timeline-stop" data-stop="education">
        <div class="minimized-card">
          <img src="assets/images/education_icon.png" alt="Education">
          <div class="minimized-text">
            <h3>Education</h3>
            <p>M.S. in Robotics & Autonomous Systems<br>ASU (GPA: 3.96/4.0)</p>
            <p>B.Tech in Mechanical Engineering<br>Manipal (GPA: 7.49/10)</p>
          </div>
        </div>
        <div class="maximized-card">
          <button class="close-card">X</button>
          <h2>Education</h2>
          <p>
            <strong>M.S. in Robotics & Autonomous Systems, Arizona State University</strong><br>
            GPA: 3.96/4.0, August 2023 – May 2025<br>
            Courses: Linear Algebra, Machine Learning and Deep Learning, Perception in Robotics, AR-VR Systems, Expressive Robotics, Modeling and Control of Robots, Advanced System Modeling, Dynamics and Control, Reinforcement Learning, Multi-Robot Systems.<br>
            <em>LOGOS ROBOTICS LAB:</em> Research on shared action space for human-robot collaboration under Prof. Nakul Gopalan.
          </p>
          <p>
            <strong>B.Tech in Mechanical Engineering, Manipal Institute of Technology</strong><br>
            GPA: 7.49/10.00, July 2016 – June 2020<br>
            Major: Mechanical Design. Courses: Turbo Machines, Heat Transfer, Fluid Mechanics, FEA, Production Planning and Control, Material Science and Metallurgy, Thermodynamics, Strength of Materials, CAE, Mechanical Design, Kinematics and Dynamics of Machinery, Tribology, Fatigue and Fracture, IC Engines and Emissions, Fluid Drives and Circuits, Physics of Materials and Radiation Physics.
          </p>
          <p><strong>Note:</strong> For detailed navigation, please use the top tabs.</p>
          <a class="more-link" href="pages/education.html">Learn More About My Education</a>
        </div>
      </div>

      <!-- Timeline Stop 4: Experience -->
      <div class="timeline-stop" data-stop="experience">
        <div class="minimized-card">
          <img src="assets/images/experience_icon.png" alt="Experience">
          <div class="minimized-text">
            <h3>Experience</h3>
            <p>LTTS, BHEL, thrustMIT Rocketry, LOGOS LAB Research</p>
          </div>
        </div>
        <div class="maximized-card">
          <button class="close-card">X</button>
          <h2>Experience</h2>
          <p>
            <strong>Larsen & Toubro Technology Services (LTTS), Bangalore, India</strong><br>
            September 2020 – June 2023<br>
            • Mechanical product design & analysis using Creo, SOLIDWORKS, CATIA, Fusion360, and Inventor for design and ANSYS workbench & APDL for FEA/CFD.<br>
            • Designed refrigeration containers, buses, and electronics systems for international clients (Carrier Transicold, Scania, Eaton, Cooper Lighting).<br>
            • Progressed from Intern → GET → Associate Engineer → Engineer within 2 years.
          </p>
          <p>
            <strong>thrustMIT Rocketry</strong><br>
            Aug 2017 – Sep 2020<br>
            • Senior Structures & Composites Member on rockets (Project Vyom & Project Arya).<br>
            • Won the Spot Award for Design for “Project Arya” at SA Cup 2019.
          </p>
          <p>
            <strong>LOGOS ROBOTICS LAB (Research)</strong><br>
            • Developing shared action spaces for human-robot collaboration.
          </p>
          <p>
            <strong>Internships:</strong><br>
            • BHEL, Hyderabad: Developed Plain Plug Gauge tool and worked on gas/steam turbine design.<br>
            • Design & simulation of Total Knee Replacement Implants.
          </p>
          <p><strong>Note:</strong> For detailed navigation, please use the top tabs.</p>
          <a class="more-link" href="pages/experience.html">Learn More About My Experience</a>
        </div>
      </div>

      <!-- Timeline Stop 5: Projects -->
      <div class="timeline-stop" data-stop="projects">
        <div class="minimized-card">
          <img src="assets/images/projects_icon.png" alt="Projects">
          <div class="minimized-text">
            <h3>Projects</h3>
            <p>Swarm Robotics, VoxFormer, Expressive Robot Hand,<br> AR/VR, 6-DOF Path Planning, Image Recognition</p>
          </div>
        </div>
        <div class="maximized-card">
          <button class="close-card">X</button>
          <h2>Projects</h2>
          <p>
            <strong>Swarm Robotics for Autonomous Collaborative Mapping:</strong><br>
            Researched and implemented swarm robotics with reinforcement learning; deployed multi-robot systems with TOF cameras and LiDAR. <a href="https://github.com/Ashish-Paka/Multi-Robot_Systems_CollaborativeMapping" target="_blank">GitHub Link</a>
          </p>
          <p>
            <strong>Optimized VoxFormer for Autonomous Driving:</strong><br>
            Designed a sparse voxel transformer-based model for semantic scene representation using camera inputs. <a href="https://github.com/Ashish-Paka/Voxformer_AutonomousDriving_TransformerModel" target="_blank">GitHub Link</a>
          </p>
          <p>
            <strong>Expressive Robot Hand:</strong><br>
            Developed a computer vision-enabled robotic hand for gesture mimicry and autonomous operation. <a href="https://github.com/Ashish-Paka/Expressive-Robot-Hand" target="_blank">GitHub Link</a>
          </p>
          <p>
            <strong>AR-VR Pass-through & Virtual Reality Environment:</strong><br>
            Created immersive AR/VR applications using Meta Quest and Unity. <a href="https://github.com/stars/Ashish-Paka/lists/ar-vr-development" target="_blank">GitHub Link</a>
          </p>
          <p>
            <strong>6-DOF Path Planning for Industrial Robot Arm:</strong><br>
            Developed an algorithm for precise 3D navigation with optimized trajectory planning. <a href="https://github.com/Ashish-Paka/6DOFCOBOT_TrajectoryPlanning_Kinematics" target="_blank">GitHub Link</a>
          </p>
          <p>
            <strong>Image Recognition for E-Commerce:</strong><br>
            Implemented ML/DL methods for product image classification and personalized recommendations. <a href="https://github.com/Ashish-Paka/ML-DL-Models-Comparison_Images_FashionMNISTDataset-Classification_SearchPersonalisation" target="_blank">GitHub Link</a>
          </p>
          <p><strong>Note:</strong> For detailed navigation, please use the top tabs.</p>
          <a class="more-link" href="pages/projects.html">Learn More About My Projects</a>
        </div>
      </div>

      <!-- Timeline Stop 6: Knowledge Map -->
      <div class="timeline-stop" data-stop="knowledge-map">
        <div class="minimized-card">
          <img src="assets/images/knowledge_map_icon.png" alt="Knowledge Map">
          <div class="minimized-text">
            <h3>Knowledge Map</h3>
            <p>Skill Evolution & Research</p>
            <p>Robotics & Autonomous Systems Engineer</p>
          </div>
        </div>
        <div class="maximized-card">
          <button class="close-card">X</button>
          <h2>Integrated Knowledge Map</h2>
          <p>
            <strong>Central Node:</strong> “Robotics & Autonomous Systems Engineer”
          </p>
          <p>
            <strong>Supporting Nodes:</strong><br>
            – <em>(2010-2016)</em> Science & Math Foundation<br>
            – <em>(2016-2020)</em> Mechanical Engineering, Rocketry-level Design, FEA, CFD, Aerospace, Composites<br>
            – <em>(2020-2023)</em> Industry Experience in Mechanical Design for International Clients<br>
            – <em>(2023-Present)</em> Robotics & AI Mastery: Reinforcement Learning, AI, Motion Planning, Multi-Robot Systems, Perception, Computer Vision, SLAM, ADAS, Embedded Systems, AR/VR, Patent & Research Work.
          </p>
          <p>
            <strong>Current Research:</strong><br>
            Shared Action Spaces for Human-Robot Collaboration, AI-driven Robotics & Learning-Based Motion Planning, Swarm Robotics, Soft Robotics, Morphing 3D Structures, Perception & Autonomous Decision-Making.
          </p>
          <p>
            <strong>Links:</strong> 
            <a href="https://github.com/Ashish-Paka/Multi-Robot_Systems_CollaborativeMapping" target="_blank">Swarm Robotics</a> | 
            <a href="https://github.com/Ashish-Paka/Voxformer_AutonomousDriving_TransformerModel" target="_blank">VoxFormer</a> | 
            <a href="https://github.com/Ashish-Paka/Expressive-Robot-Hand" target="_blank">Expressive Robot Hand</a> | 
            <a href="http://www.linkedin.com/in/ashish-autonomousrobotics" target="_blank">LinkedIn</a> | 
            <a href="https://www.thrustmit.in/" target="_blank">thrustMIT</a>
          </p>
          <p><strong>Note:</strong> For detailed navigation, please use the top tabs.</p>
          <a class="more-link" href="pages/knowledge-map.html">Explore My Knowledge Map</a>
        </div>
      </div>

    </div>
  </main>

  <script src="js/main.js"></script>
  <script src="js/timeline.js"></script>
</body>
</html>
EOF

# Create CSS file: css/style.css
cat << 'EOF' > css/style.css
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  background-color: var(--bg-color, #f5f5f5);
  color: var(--text-color, #222);
}
.light-mode {
  --bg-color: #ffffff;
  --text-color: #222;
  --link-color: #007BFF;
}
.dark-mode {
  --bg-color: #121212;
  --text-color: #f4f4f4;
  --link-color: #FFC107;
}
a {
  color: var(--link-color);
  text-decoration: none;
}
a:hover {
  text-decoration: underline;
}
.site-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #333;
  color: #fff;
  padding: 0.5rem 1rem;
  position: sticky;
  top: 0;
  z-index: 1000;
}
.main-nav ul {
  list-style: none;
  display: flex;
  margin: 0;
  padding: 0;
}
.main-nav li {
  margin: 0 0.5rem;
}
.main-nav a {
  color: #fff;
  padding: 0.5rem 1rem;
}
.theme-toggle button {
  background: none;
  border: none;
  cursor: pointer;
}
EOF

# Create CSS file: css/timeline.css
cat << 'EOF' > css/timeline.css
.timeline-container {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}
.timeline-track {
  display: flex;
  gap: 2rem;
  overflow-x: auto;
  white-space: nowrap;
  position: relative;
}
.timeline-stop {
  min-width: 300px;
  position: relative;
  display: inline-block;
}
.minimized-card {
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 6px;
  padding: 1rem;
  cursor: pointer;
  transition: transform 0.3s;
  width: 300px;
}
.minimized-card:hover {
  transform: scale(1.02);
}
.minimized-card img {
  max-width: 100%;
  border-radius: 6px;
}
.minimized-text h3 {
  margin: 0.5rem 0 0.25rem 0;
}
.maximized-card {
  display: none;
  background: #fff;
  border: 2px solid #333;
  border-radius: 6px;
  padding: 1.5rem;
  position: absolute;
  top: 0;
  left: 0;
  width: 400px;
  min-height: 400px;
  z-index: 999;
  box-shadow: 0 2px 10px rgba(0,0,0,0.3);
  transition: all 0.3s;
}
.maximized-card.show {
  display: block;
}
.maximized-card h2 {
  margin-top: 0;
}
.close-card {
  position: absolute;
  top: 5px;
  right: 10px;
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
}
.more-link {
  display: inline-block;
  margin-top: 1rem;
  color: var(--link-color);
  text-decoration: underline;
  cursor: pointer;
}
EOF

# Create CSS file: css/responsive.css
cat << 'EOF' > css/responsive.css
@media (max-width: 768px) {
  .timeline-track {
    flex-direction: column;
  }
  .minimized-card, .maximized-card {
    width: 90%;
    margin: 0 auto;
  }
  .site-header {
    flex-direction: column;
    align-items: flex-start;
  }
  .main-nav ul {
    flex-direction: column;
  }
}
EOF

# Create JS file: js/main.js
cat << 'EOF' > js/main.js
const themeToggleBtn = document.getElementById('themeToggleBtn');
const themeIcon = document.getElementById('themeIcon');

function setTheme(mode) {
  document.body.className = mode;
  localStorage.setItem('theme', mode);
  themeIcon.src = mode === 'dark-mode'
    ? 'assets/icons/dark_mode_icon.svg'
    : 'assets/icons/light_mode_icon.svg';
}

themeToggleBtn.addEventListener('click', () => {
  const currentTheme = document.body.classList.contains('dark-mode') ? 'dark-mode' : 'light-mode';
  const newTheme = currentTheme === 'dark-mode' ? 'light-mode' : 'dark-mode';
  setTheme(newTheme);
});

window.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme') || 'light-mode';
  setTheme(savedTheme);
});
EOF

# Create JS file: js/timeline.js with proper JavaScript (not PowerShell syntax)
cat << 'EOF' > js/timeline.js
document.addEventListener('DOMContentLoaded', () => {
  const timelineStops = document.querySelectorAll('.timeline-stop');
  const audio = new Audio('assets/audio/metallic_scroll.mp3');
  
  timelineStops.forEach((stop) => {
    const minimizedCard = stop.querySelector('.minimized-card');
    const maximizedCard = stop.querySelector('.maximized-card');
    
    minimizedCard.addEventListener('click', () => {
      // Play metallic scroll sound
      audio.currentTime = 0;
      audio.play();
      
      // Close any other open cards
      timelineStops.forEach(otherStop => {
        if (otherStop !== stop) {
          const otherMax = otherStop.querySelector('.maximized-card');
          const otherMin = otherStop.querySelector('.minimized-card');
          otherMax.classList.remove('show');
          otherMin.classList.remove('active');
        }
      });
      
      // Toggle current card
      minimizedCard.classList.toggle('active');
      maximizedCard.classList.toggle('show');
    });
  });
});
EOF

# Create placeholder page files in the pages directory
$pages = @("about", "education", "experience", "projects", "skills", "publications", "knowledge-map", "resume", "contact")
foreach ($page in $pages) {
  $content = @"
<!DOCTYPE html>
<html lang='en'>
<head>
  <meta charset='UTF-8'>
  <meta name='viewport' content='width=device-width, initial-scale=1.0'>
  <title>$($page.ToUpper()) - Ashish Paka</title>
  <link rel='stylesheet' href='../css/style.css'>
  <link rel='stylesheet' href='../css/responsive.css'>
</head>
<body class='light-mode'>
  <header class='site-header'>
    <div class='logo-container'>
      <a href='../index.html'>
        <img src='../assets/images/logo.png' alt='Ashish Logo' class='site-logo'>
      </a>
    </div>
    <nav class='main-nav'>
      <ul>
        <li><a href='../index.html'>Home</a></li>
        <li><a href='about.html'>About Me</a></li>
        <li><a href='education.html'>Education</a></li>
        <li><a href='experience.html'>Experience</a></li>
        <li><a href='projects.html'>Projects</a></li>
        <li><a href='skills.html'>Skills</a></li>
        <li><a href='publications.html'>Publications & Patents</a></li>
        <li><a href='knowledge-map.html'>Knowledge Map</a></li>
        <li><a href='resume.html'>Resume</a></li>
        <li><a href='contact.html'>Contact</a></li>
      </ul>
    </nav>
    <div class='theme-toggle'>
      <button id='themeToggleBtn'>
        <img src='../assets/icons/light_mode_icon.svg' alt='Toggle Theme' id='themeIcon'>
      </button>
    </div>
  </header>
  <main class='page-content'>
    <h1>$($page.ToUpper())</h1>
    <p>Placeholder content for the ${page} page. Update this content with detailed information from your resume, GitHub, and LinkedIn posts.</p>
  </main>
  <script src="../js/main.js"></script>
</body>
</html>
"@
  $filePath = "pages\$page.html"
  $content | Out-File -Encoding UTF8 $filePath


# Create README.md
@"
# Ashish Paka – Robotics & Autonomous Systems Portfolio

This is a highly interactive, structured, and visually engaging portfolio website that integrates my career journey, research, skills, and projects culminating in an interactive Knowledge Map.

## Folder Structure
- **assets/**: Contains images, icons, and audio files.
- **css/**: Contains global styles, timeline-specific styles, and responsive styles.
- **js/**: Contains JavaScript files for theme toggle and timeline interactions.
- **pages/**: Contains individual pages (About Me, Education, Experience, Projects, etc.).
- **index.html**: The landing page with an interactive timeline.

## Deployment
- You can deploy this project using GitHub Pages or Netlify.
- Update the content as needed and push to your GitHub repository for automatic deployment.
"@ | Out-File -Encoding UTF8 README.md

Write-Output "Project structure created successfully. Open the folder in your code editor (e.g., 'code .') to start editing."
