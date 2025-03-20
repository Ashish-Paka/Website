// Function to show details for a selected timeline section
function showDetails(sectionId) {
    let details = document.querySelectorAll('.details-box');
    details.forEach(box => box.classList.remove('active'));
    document.getElementById(sectionId).classList.add('active');
  }
  
  // Example: Make knowledge map nodes clickable to display further info (you can later replace alert with a modal or detailed section)
  document.querySelectorAll('.knowledge-node').forEach(node => {
    node.addEventListener('click', function() {
      alert(`More info about: ${this.innerText}`);
    });
  });
  