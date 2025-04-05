document.addEventListener('DOMContentLoaded', (event) => {
    const params = new URLSearchParams(document.location.search);
    const meetingId = params.get('meeting-id') || '111 222 3333';
    document.querySelectorAll('.meeting-id').forEach((el) => {
        el.textContent = meetingId;
    });
});
