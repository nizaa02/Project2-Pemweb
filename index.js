const songs = {
    sad: [
        ["The Night We Met", "Lord Huron", "theNightWeMet.mp3"],
        ["Traitor", "Olivia Rodrigo", "traitor.mp3"],
        ["Glimpse of Us", "Joji", "glimpseOfUs.mp3"],
        ["End of Beginning", "Joe Keery"],
        ["Locked out of Heaven", "Bruno Mars"],
        ["You're Gonna Live Forever in Me", "John Mayer"],
        ["Deja Vu", "Olivia Rodrigo"],
        ["Those Eyes", "New West"],
        ["Talking to the Moon", "Bruno Mars"],
        ["Back to Friends", "Sombr"]
    ],
    chill: [
        ["Snooze", "SZA"],
        ["I Like Me Better", "Lauv"],
        ["Until I Found You", "Stephen Sanchez"],
        ["Blue", "Yung Kai"],
        ["Somebody's Pleasure"],
        ["Lover", "Taylor Swift"],
        ["Nobody Gets Me", "SZA"],
        ["Seasons", "Wave to Earth"],
        ["About You", "The 1975"],
        ["Say Yes to Heaven", "Lana Del Rey"]
    ],
    study: [
        ["Coffee", "beabadoobee"],
        ["Cruel Summer", "Taylor Swift"],
        ["High School in Jakarta", "NIKI"],
        ["So High School", "Taylor Swift"],
        ["Shape of My Heart", "Backstreet Boys"],
        ["As It Was", "Harry Styles"],
        ["Gorgeous", "Taylor Swift"],
        ["Walking Back Home", "Vira Talisa"],
        ["Double Take", "Dhruv"],
        ["Every Summertime", "NIKI"]
    ],
    happy: [
        ["Jatuh Suka", "Tulus"],
        ["Saat Bahagia", "Ungu"],
        ["Magic", "Lyla"],
        ["Berdua Bersama", "Jaz"],
        ["Drop Dead", "Olivia Rodrigo"],
        ["My Love Mine All Mine", "Mitski"],
        ["Mine (Taylor's Version", "Taylor Swift"],
        ["Just the Way You Are", "Bruno Mars"],
        ["Style", "Taylor Swift"],
        ["Mata ke Hati", "Hivi!"]
    ],
    night: [
        ["I Wanna Be Yours", "Arctic Monkeys"],
        ["Kita Usahakan Rumah Itu", "Sal Priadi"],
        ["Membasuh", "Hindia"],
        ["Night Changes", "One Direction"],
        ["Here With Me", "d4vd"],
        ["8 Letters", "Why Don't We"],
        ["Someone To Stay", "Vancouver Sleep Clinic"],
        ["Anything You Want", "Reality Club"],
        ["Fix You", "Coldplay"],
        ["The Man Who Can't Be Moved", "The Script"]
    ]
};
const moodInfo = {
    sad: {
        title: "Sad",
        description: "It's okay to feel."
    },
    chill: {
        title: "Chill",
        description: "Take it slow."
    },
    study: {
        title: "Study",
        description: "Focus mode: ON."
    },
    happy: {
        title: "Happy",
        description: "Good vibes only."
    },
    night: {
        title: "Late Night",
        description: "For nights that feel different."
    }
};
let savedSongs = JSON.parse(
    localStorage.getItem("savedSongs")
) || [];
function showNotification(message) {
    const notification = document.createElement("div");
    notification.className = "save-notification";
    notification.textContent = message;
    document.body.appendChild(
        notification
    );
    setTimeout(function () {
        notification.remove();
    }, 2000);
}
function stopOtherAudio(currentAudio) {
    document
        .querySelectorAll(".song-audio")
        .forEach(function (audio) {
            if (audio !== currentAudio) {
                audio.pause();
            }
        });
    document
        .querySelectorAll(".play-button")
        .forEach(function (button) {
            button.textContent = "▶";
        });
    document
        .querySelectorAll(".saved-play-button")
        .forEach(function (button) {
            button.textContent = "▶";
        });
}
const playlist = document.getElementById("playlist");
if (playlist) {
    const url =
        new URLSearchParams(
            window.location.search
        );
    const mood = 
        url.get("mood") || "sad";
    const moodTitle =
        document.getElementById(
            "moodTitle"
        );
    const moodDescription = 
        document.getElementById(
            "moodDescription"
        );
    if (moodInfo[mood]) {
        moodTitle.textContent =
            moodInfo[mood].title;
        moodDescription.textContent =
            moodInfo[mood].description;
    }
    if (songs[mood]) {
        songs[mood].forEach(
            function (song, index) {
                const songCard = 
                    document.createElement("div");
                songCard.className = 
                    "song-card";
                songCard.innerHTML = `
                    <div class="song-number">
                        ${index + 1}
                    </div>
                    <div class="song-info">
                        <h3>
                            ${song[0]}
                        </h3>
                        <p>
                            ${song[1]}
                        </p>
                    </div>
                    <div class="song-actions">
                        <button
                            class="save-button"
                            title="Simpan lagu"
                        >
                            ♡
                        </button>
                        <button
                            class="play-button"
                            title="Putar lagu"
                        >
                            ▶
                        </button>
                    </div>
                    <audio
                        class="song-audio"
                        src="${song[2]}">
                    </audio>
                `;
                const saveButton = 
                    songCard.querySelector(
                        ".save-button"
                    );
                const alreadySaved =
                    savedSongs.some(
                        function (savedSong) {
                            return (
                                savedSong[0] === song[0] &&
                                savedSong[1] === song[1]
                            );
                        }
                    );
                if (alreadySaved) {
                    saveButton.textContent =
                        "♥";
                    saveButton.classList.add(
                        "saved"
                    );
                }
                saveButton.addEventListener(
                    "click",
                    function () {
                        const songExists = 
                            savedSongs.some(
                                function (savedSong) {
                                    return (
                                        savedSong[0] === song[0] &&
                                        savedSong[1] === song[1]
                                    );
                                }
                            );
                        if (!songExists) {
                            savedSongs.push(
                                song
                            );
                            localStorage.setItem(
                                "savedSongs",
                                JSON.stringify(
                                    savedSongs
                                )
                            );
                            saveButton.textContent =
                                "♥";
                            saveButton.classList.add(
                                "saved"
                            );
                            showNotification(
                                `"${song[0]}" berhasil disimpan!`
                            );
                        }
                        else {
                            showNotification(
                                `"${song[0]}" sudah ada di Lagu Tersimpan.`
                            );
                        }
                    }
                );
                const playButton =
                    songCard.querySelector(
                        ".play-button"
                    );
                const audio =
                    songCard.querySelector(
                        ".song-audio"
                    );
                playButton.addEventListener(
                    "click",
                    function () {
                        if (!audio.paused) {
                            audio.pause();
                            playButton.textContent = "▶";
                        }
                        else {
                            stopOtherAudio(audio);
                            audio.play();
                            playButton.textContent = "II";
                        }
                    }
                );
                audio.addEventListener(
                    "ended",
                    function() {
                        playButton.textContent = "▶";
                    }
                );
                playlist.appendChild(
                    songCard
                );
            }
        );
    }
}
const savedPlaylist = 
    document.getElementById(
        "savedPlaylist"
    );
if (savedPlaylist) {
    if (savedSongs.length === 0) {
        savedPlaylist.innerHTML = `
            <div class="empty-saved">
                <h3>Belum ada lagu tersimpan</h3>
                <p>Yuk pilih lagu yang kamu sukai.</p>
            </div>
        `;
    }
    else {
        savedSongs.forEach(
            function (song, index) {
                const songCard =
                    document.createElement(
                        "div"
                    );
                songCard.className =
                    "saved-song-card";
                songCard.innerHTML = `
                    <div class="saved-song-number">
                        ${index + 1}
                    </div>
                    <div class="saved-song-info">
                        <h3>${song[0]}</h3>
                        <p>${song[1]}</p>
                    </div>
                    <div class="saved-song-actions">
                        <button
                            class="saved-song-actions">
                            title="Putar / Pause">
                            ▶
                        </button>
                        <button
                            class="delete-button"
                            title="Hapus lagu">
                            ×
                        </button>
                    </div>
                    <audio 
                        class="song-audio"
                        src="${song[2]}>"
                    </audio>
                `;
                const playButton =
                    songCard.querySelector(
                        ".saved-play-button"
                    );
                const audio =
                    songCard.querySelector(
                        ".song-audio"
                    );
                playButton.addEventListener(
                    "click",
                    function () {
                        if (!audio.paused) {
                            audio.pause();
                            playButton.textContent = 
                                "▶";
                        }
                        else {
                            stopOtherAudio(audio);
                            audio.play();
                            playButton.textContent =
                                "II";
                        }
                    }
                );
                audio.addEventListener(
                    "ended",
                    function () {
                        playButton.textContent =
                            "▶";
                    }
                );
                const deleteButton = 
                    songCard.querySelector(
                        ".delete-button"
                    );
                deleteButton.addEventListener(
                    "click",
                    function () {
                        savedSongs.splice(
                            index,
                            1
                        );
                        localStorage.setItem(
                            "savedSongs",
                            JSON.stringify(
                                savedSongs
                            )
                        );
                        showNotification(
                            `"${song[0]}" dihapus dari Lagu Tersimpan.`
                        );
                        setTimeout(
                            function () {
                                location.reload();
                            },
                            500
                        );
                    }
                );
                savedPlaylist.appendChild(
                    songCard
                );
            }
        );
    }
}