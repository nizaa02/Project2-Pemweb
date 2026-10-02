const songs = {
    sad: [
        ["The Night We Met", "Lord Huron"],
        ["Traitor", "Olivia Rodrigo"],
        ["Glimpse of Us", "Joji"],
        ["End of Beginning", "Joe Keery"],
    ],
    chill: [
        ["Snooze", "SZA"],
        ["I Like Me Better", "Lauv"],
    ],
    study: [
        ["Coffee", "beabadoobee"],
    ],
    happy: [
        ["Cruel Summer", "Taylor Swift"]
    ],
    night: [
        ["I Wanna Be Yours", "Arctic Monkeys"],
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
                    document.createElement(
                        "div"
                    );
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
                    <button
                        class="delete-button"
                        title="Hapus lagu"
                    >
                        ×
                    </button>
                `;
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