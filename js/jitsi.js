words = [
    'adagio',
    'agitato',
    'allegretto',
    'allegro',
    'altto',
    'andante',
    'andante',
    'andantino',
    'banjo',
    'basso',
    'espressivo',
    'fagotti',
    'flyygeli',
    'grazioso',
    'haitari',
    'harmonikka',
    'harppu',
    'huilu',
    'huuliharppu',
    'jouhikko',
    'kantele',
    'kellopeli',
    'kitara',
    'klarinetti',
    'koto',
    'kulkuset',
    'largo',
    'leggiero',
    'lento',
    'luuttu',
    'lyyra',
    'maestoso',
    'mandoliini',
    'marakassi',
    'marcato',
    'marimba',
    'menuetto',
    'misterioso',
    'moderato',
    'nokkahuilu',
    'oboe',
    'pasuuna',
    'patarumpu',
    'patarumpu',
    'piano',
    'pilli',
    'presto',
    'risoluto',
    'rumpu',
    'saha',
    'sello',
    'sostenuto',
    'spiritoso',
    'staccato',
    'tamburiini',
    'torvi',
    'trumpetti',
    'tuuba',
    'ukulele',
    'urut',
    'virveli',
    'viulu',
    'vivace',
    'vivo'
];

document.addEventListener('DOMContentLoaded', (event) => {
    const $ = (selector) => {
            return document.querySelector(selector);
        },
        joinButton = $('#jitsi-form button#join'),
        roomNameInput = $('form input[type=text]'),
        getRoomName = () => {
            return roomNameInput.value.trim();
        },
        getRoomUrl = () => {
            return `https://meet.jit.si/${getRoomName()}#config.disableAP=true`;
        },
        loadingMessageStyle = $('#loading-message').style,
        roomUrlParagraph = $('#room-url'),
        roomUrl = $('#room-url a'),
        range = document.createRange(),
        sel = window.getSelection(),
        onRoomNameChanged = () => {
            const noRoomName = getRoomName() === "";
            joinButton.disabled = noRoomName;
            roomUrlParagraph.style.visibility = noRoomName ? 'hidden' : 'visible';
            roomUrl.href = roomUrl.textContent = getRoomUrl();
        },
        getRandomNumber = (limit) => {
            return Math.floor(Math.random() * limit);
        },
        getRandomWord = () => {
            return words[getRandomNumber(words.length)];
        };

    if (!window.chrome || (!window.chrome.webstore && !window.chrome.csi)) {
        $('#chrome-message').style.display = 'block';
    }

    document.querySelectorAll('.current-url').forEach((el) => {
        el.href = window.location;
        el.textContent = window.location;
    });

    $('#generate-room-name').addEventListener('click', () => {
        roomNameInput.value = getRandomWord() + '-' + getRandomNumber(100) + '-' + getRandomWord();
        onRoomNameChanged();
    })

    onRoomNameChanged();

    roomNameInput.addEventListener('keyup', onRoomNameChanged);

    joinButton.addEventListener('click', (event) => {
        event.preventDefault();
        joinButton.disabled = true;
        loadingMessageStyle.visibility = 'visible';
        window.location = getRoomUrl();
    });

    window.addEventListener('unload', () => {
        loadingMessageStyle.visibility = 'hidden';
        onRoomNameChanged();
    });

    $('#copy-url').addEventListener('click', () => {
        range.selectNodeContents(roomUrl);
        sel.removeAllRanges();
        sel.addRange(range);
        document.execCommand('copy');
        sel.empty();
        roomNameInput.focus();
    });
});
