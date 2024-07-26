const getTimeFromSeconds = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    if (hours < 1) {
        return `${minutes}:${remainingSeconds}`;
    }

    return `${hours}:${minutes}:${remainingSeconds}`;
}

module.exports = getTimeFromSeconds;