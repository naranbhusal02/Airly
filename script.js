document.addEventListener('DOMContentLoaded', () => {
    const radioPlayer = document.getElementById('radioPlayer');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const playPauseIcon = playPauseBtn.querySelector('i');
    const volumeSlider = document.getElementById('volumeSlider');
    const volumeIcon = document.getElementById('volumeIcon');
    const loadingIndicator = document.getElementById('loadingIndicator');
    const errorMessage = document.getElementById('errorMessage');
    const albumArt = document.querySelector('.album-art');
    const audioWaves = document.querySelector('.audio-waves');
    const currentTimeDisplay = document.getElementById('currentTime');

    let isPlaying = false;

    // Pausa & resume functionality js code
    playPauseBtn.addEventListener('click', togglePlayPause);

    function togglePlayPause() {
        if(isPlaying) {
            radioPlayer.pause();
        }
        else {
            radioPlayer.play().catch(handlePlayError);
            loadingIndicator.classList.remove('hidden');
        }
    }

    // JS Code functionality of volumes controlss
    volumeSlider.addEventListener('input', (e) => {
        const volume = parseFloat(e.target.value);
        radioPlayer.volume = volume;
        updateVolumeIcon(volume);
    });

    function updateVolumeIcon(volume) {
        volumeIcon.className = 'fas';
        if(volume ===0) {
            volumeIcon.classList.add('fa-volume-mute');
        } else if(volume < 0.5) {
            volumeIcon.classList.add('fa-volume-down');
        } else {
            volumeIcon.classList.add('fa-volume-up');
        }
    }

    // Audio player events js codes
    radioPlayer.addEventListener('playing', () => {
        isPlaying = true;
        playPauseIcon.classList.remove('fa-play');
        playPauseIcon.classList.add('fa-pause');
        loadingIndicator.classList.add('hidden');
        albumArt.classList.add('playing');
        audioWaves.classList.add('active');
        errorMessage.classList.add('hidden');
    });

    radioPlayer.addEventListener('pause', () => {
        isPlaying = false;
        playPauseIcon.classList.remove('fa-pause');
        playPauseIcon.classList.add('fa-play');
        albumArt.classList.remove('playing');
        audioWaves.classList.remove('active');
    });

    radioPlayer.addEventListener('waiting', () => {
        loadingIndicator.classList.remove('hidden');
    });

    radioPlayer.addEventListener('error', handlePlayError);

    function handlePlayerError() {
        loadingIndicator.classList.add('hidden');
        errorMessage.classList.remove('hidden');
        errorMessage.textContent = 'Error playing the radio stream. Please try again later.';
        isPlaying = false;
        playPauseIcon.classList.remove('fa-pause');
        playPauseIcon.classList.add('fa-play');
        albumArt.classList.remove('playing');
        audioWaves.classList.remove('active');
    }

    // Code to update the current time display in the radio player module
    function updateCurrentTime() {
        const now = new Date();
        const timeString = now.toLocaleTimeString();
        currentTimeDisplay.textContent = timeString;
    }

    // Update the live seconds display
    setInterval(updateCurrentTime, 1000);
    updateCurrentTime(); //fist update on the loading of page

    // Butttons to mute and unmute the volume
    let previousVolume = 1;
    volumeIcon.addEventListener('click', () => {
        if(radioPlayer.volume >0) {
            previousVolume = radioPlayer.volume;
            radioPlayer.volume = 0;
            volumeSlider.value = 0;
        } else {
            radioPlayer.volume = previousVolume;
            volumeSlider.value = previousVolume;
        }
        updateVolumeIcon(radioPlayer.volume);
    });
    });