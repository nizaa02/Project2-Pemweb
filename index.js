const songs = {
    sad: [
        ["The Night We Met", "Lord Huron", "theNightWeMet.mp3"],
        ["Traitor", "Olivia Rodrigo", "traitor.mp3"],
        ["Glimpse of Us", "Joji", "glimpseOfUs.mp3"],
        ["End of Beginning", "Joe Keery", "endOfBeginning.mp3"],
        ["Locked out of Heaven", "Bruno Mars", "lockedOutOfHeaven.mp3"],
        ["You're Gonna Live Forever in Me", "John Mayer", "you'reGonnaLive.mp3"],
        ["Deja Vu", "Olivia Rodrigo", "dejaVu.mp3"],
        ["Those Eyes", "New West", "thoseEyes.mp3"],
        ["Talking to the Moon", "Bruno Mars", "talkingToTheMoon.mp3"],
        ["Back to Friends", "Sombr", "backToFriends.mp3"]
    ],
    chill: [
        ["I Like Me Better", "Lauv", "iLikeMeBetter.mp3"],
        ["Until I Found You", "Stephen Sanchez", "untilFoundYou.mp3"],
        ["Blue", "Yung Kai", "blue.mp3"],
        ["Seasons", "Wave to Earth", "seasons.mp3"],
        ["About You", "The 1975", "aboutYou.mp3"]
    ],
    study: [
        ["High School in Jakarta", "NIKI", "highSchool.mp3"],
        ["So High School", "Taylor Swift", "soHighSchool.mp3"],
        ["Shape of My Heart", "Backstreet Boys", "shapeOfMyHeart.mp3"],
        ["As It Was", "Harry Styles", "asItWas.mp3"],
        ["Gorgeous", "Taylor Swift", "gorgeus.mp3"]
    ],
    happy: [
        ["Jatuh Suka", "Tulus", "jatuhSuka.mp3"],
        ["Saat Bahagia", "Ungu", "saatBahagia.mp3"],
        ["Magic", "Lyla", "magic.mp3"],
        ["Berdua Bersama", "Jaz", "berduaBersama.mp3"],
        ["Drop Dead", "Olivia Rodrigo", "dropDead.mp3"],
        ["My Love Mine All Mine", "Mitski", "myLoveMine.mp3"],
        ["Mine (Taylor's Version", "Taylor Swift", "mine.mp3"],
        ["Just the Way You Are", "Bruno Mars", "justTheWay.mp3"],
        ["Style", "Taylor Swift", "style.mp3"],
        ["Mata ke Hati", "Hivi!", "mataKeHati.mp3"]
    ],
    night: [
        ["I Wanna Be Yours", "Arctic Monkeys", "iWannaBeYours.mp3"],
        ["Kita Usahakan Rumah Itu", "Sal Priadi", "kitaUsahakan.mp3"],
        ["Membasuh", "Hindia", "membasuh.mp3"],
        ["Night Changes", "One Direction", "nightChanges.mp3"],
        ["Here With Me", "d4vd", "hereWithMe.mp3"],
        ["8 Letters", "Why Don't We", "8Letters.mp3"],
        ["Someone To Stay", "Vancouver Sleep Clinic", "someone.mp3"],
        ["Anything You Want", "Reality Club", "anythingYouWant.mp3"],
        ["Fix You", "Coldplay", "fixYou.mp3"],
        ["The Man Who Can't Be Moved", "The Script", "theMan.mp3"]
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
    document.body.appendChild(notification);
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
    const url = new URLSearchParams(
        window.location.search
    );
    const mood = url.get("mood") || "sad";
    const moodTitle =
        document.getElementById("moodTitle");
    const moodDescription = 
        document.getElementById("moodDescription");
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
                    saveButton.textContent = "♥";
                    saveButton.classList.add("saved");
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
                            savedSongs.push(song);
                            localStorage.setItem(
                                "savedSongs",
                                JSON.stringify(savedSongs)
                            );
                            saveButton.textContent = "♥";
                            saveButton.classList.add("saved");
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
                    document.createElement("div");
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
                            class="saved-play-button">
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
                        src="${song[2]}">
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
                    function () {
                        playButton.textContent = "▶";
                    }
                );
                const deleteButton = 
                    songCard.querySelector(
                        ".delete-button"
                    );
                deleteButton.addEventListener(
                    "click",
                    function () {
                        audio.pause();
                        savedSongs.splice(
                            index,
                            1
                        );
                        localStorage.setItem(
                            "savedSongs",
                            JSON.stringify(savedSongs)
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
                savedPlaylist.appendChild(songCard);
            }
        );
    }
}