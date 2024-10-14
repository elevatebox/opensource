document.addEventListener('DOMContentLoaded', function () {
    const coAdminsTab = document.getElementById('coAdminsTab');
    const studentsTab = document.getElementById('studentsTab');
    const coAdminsContent = document.getElementById('coAdminsContent');
    const studentsContent = document.getElementById('studentsContent');

    coAdminsTab.addEventListener('click', function () {
        coAdminsTab.classList.add('active');
        studentsTab.classList.remove('active');
        coAdminsContent.classList.add('show');
        studentsContent.classList.remove('show');
    });

    studentsTab.addEventListener('click', function () {
        studentsTab.classList.add('active');
        coAdminsTab.classList.remove('active');
        studentsContent.classList.add('show');
        coAdminsContent.classList.remove('show');
    });
});
