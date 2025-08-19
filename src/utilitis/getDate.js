export function getDate(dateSring) {
    const dateData = new Date(dateSring);
    const formattedDate = dateData.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
    const formattedTime = dateData.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    });
    return {
        date: formattedDate,
        time: formattedTime,
    }
}