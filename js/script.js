function showDetails(sectionId) {
    let details = document.querySelectorAll('.details-box');
    details.forEach(box => box.style.display = 'none');

    document.getElementById(sectionId).style.display = 'block';
}
