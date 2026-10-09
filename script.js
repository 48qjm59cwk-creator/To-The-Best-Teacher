/* =========================================================
   OUR LITTLE UNIVERSE
   PERSONALIZATION
========================================================= */


/*
    CHANGE THIS DATE.

    Example:

    If you became friends on January 1, 2024:

    "2024-01-01"
*/

const FRIENDSHIP_DATE = "1997-10-21";



/*
    CHANGE THIS LETTER.

    Write whatever you want here.

    The website will type it automatically
    when the visitor reaches the Letter section.
*/

const LETTER_MESSAGE = `Dear Teacher Bawar,
I cannot express the deep feelings I have for you with just a few superficial sentences, because to me, you are not just a teacher who delivers a lesson; you are the person who changed my concept of life and understanding. you taught me how to think deeply, how not to be afraid of obstacles, and how to be authentic in my steps.
Your presence in my life is like a lamp illuminating my path. Every piece of advice from you, every serious word or lighthearted joke between us, has been a turning point in how I view my surroundings. Thank you so much for all the times you listened to me with patience, and for those honest pieces of advice which, although sometimes difficult, always led me to become better.
I am proud that you were my "teacher" in the classroom and my "closest friend" outside of it. I hope you always remain as energetic and full of hope, and know that your presence in my life is the greatest support and blessing I have.
Always with immense respect and love,
Alan`;



/* =========================================================
   SHORTCUT
========================================================= */

const $ = (selector) => {

    return document.querySelector(selector);

};


const $$ = (selector) => {

    return [
        ...document.querySelectorAll(selector)
    ];

};



/* =========================================================
   INTRO SCREEN
========================================================= */

document.body.classList.add("locked");


$("#enterBtn").addEventListener("click", () => {

    $("#intro").classList.add("exit");

    document.body.classList.remove("locked");

    window.scrollTo(0, 0);

    setTimeout(() => {

        $("#intro").remove();

    }, 1300);

    createShootingStar();

});



/* =========================================================
   MOBILE MENU
========================================================= */

$("#menuToggle").addEventListener(
    "click",
    () => {

        const isOpen =
            $("#nav").classList.toggle("open");


        $("#menuToggle").setAttribute(
            "aria-expanded",
            isOpen
        );

    }
);



$$("nav a").forEach((link) => {

    link.addEventListener(
        "click",
        () => {

            $("#nav").classList.remove("open");

        }
    );

});



/* =========================================================
   FLOATING PARTICLES
========================================================= */

const particleLayer =
    $("#particles");


for (let i = 0; i < 55; i++) {

    const particle =
        document.createElement("span");


    particle.className =
        "particle";


    particle.style.left =
        Math.random() * 100 + "%";


    particle.style.top =
        Math.random() * 100 + "%";


    particle.style.animationDelay =
        Math.random() * 9 + "s";


    particle.style.animationDuration =
        6 + Math.random() * 9 + "s";


    particle.style.opacity =
        (
            0.15 +
            Math.random() * 0.55
        ).toFixed(2);


    particleLayer.appendChild(
        particle
    );

}



/* =========================================================
   SHOOTING STARS
========================================================= */

function createShootingStar() {

    const star =
        document.createElement("span");


    star.className =
        "shooting";


    star.style.left =
        (
            Math.random() * 75 + 5
        ) + "%";


    star.style.top =
        (
            Math.random() * 45 + 5
        ) + "%";


    $("#shooting-stars")
        .appendChild(star);


    setTimeout(() => {

        star.remove();

    }, 1700);

}


setInterval(
    createShootingStar,
    9000
);


setTimeout(
    createShootingStar,
    2500
);



/* =========================================================
   SCROLL REVEAL
========================================================= */

const observer =
    new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "visible"
                    );

                    observer.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: 0.12
        }
    );


$$(".reveal").forEach((element) => {

    observer.observe(element);

});



/* =========================================================
   MOUSE INTERACTION
========================================================= */

window.addEventListener(
    "pointermove",
    (event) => {

        if (window.innerWidth < 800) {
            return;
        }


        const x =
            event.clientX /
            window.innerWidth -
            0.5;


        const y =
            event.clientY /
            window.innerHeight -
            0.5;


        document.documentElement.style
            .setProperty(
                "--mouse-x",
                x.toFixed(3)
            );


        document.documentElement.style
            .setProperty(
                "--mouse-y",
                y.toFixed(3)
            );

    }
);



/* =========================================================
   FRIENDSHIP COUNTER
========================================================= */

function updateDuration() {

    const start =
        new Date(
            FRIENDSHIP_DATE +
            "T00:00:00"
        );


    const now =
        new Date();


    if (
        Number.isNaN(start.getTime()) ||
        start > now
    ) {

        return;

    }


    let years =
        now.getFullYear() -
        start.getFullYear();


    let months =
        now.getMonth() -
        start.getMonth();


    let days =
        now.getDate() -
        start.getDate();



    if (days < 0) {

        months--;

        const previousMonth =
            new Date(
                now.getFullYear(),
                now.getMonth(),
                0
            ).getDate();


        days += previousMonth;

    }



    if (months < 0) {

        years--;

        months += 12;

    }



    $("#ageYears").textContent =
        years;


    $("#ageMonths").textContent =
        months;


    $("#ageDays").textContent =
        days;

}


updateDuration();


setInterval(
    updateDuration,
    86400000
);



/* =========================================================
   LETTER TYPEWRITER
========================================================= */

let letterStarted = false;


const letterObserver =
    new IntersectionObserver(
        (entries) => {

            if (
                !entries[0].isIntersecting ||
                letterStarted
            ) {

                return;

            }


            letterStarted = true;


            const target =
                $("#letterText");


            let index = 0;


            const speed = 18;


            function typeLetter() {

                if (
                    index <
                    LETTER_MESSAGE.length
                ) {

                    target.textContent +=
                        LETTER_MESSAGE[index];


                    index++;


                    setTimeout(
                        typeLetter,
                        LETTER_MESSAGE[
                            index - 1
                        ] === "\n"
                            ? 350
                            : speed
                    );

                }

                else {

                    $(".typing-cursor")
                        .style.display =
                        "none";

                }

            }


            typeLetter();

        },
        {
            threshold: 0.25
        }
    );


letterObserver.observe(
    $("#letter")
);



/* =========================================================
   MEMORY LIGHTBOX
========================================================= */

const lightbox =
    $("#lightbox");


$$(".photo-button").forEach(
    (button) => {

        button.addEventListener(
            "click",
            () => {

                const image =
                    button.dataset.image;


                const caption =
                    button.dataset.caption;


                $("#lightboxCaption")
                    .textContent =
                    caption;


                $("#lightboxImg")
                    .classList
                    .remove("loaded");


                $("#lightboxFallback")
                    .classList
                    .remove("hidden");


                $("#lightboxImg").src =
                    image;



                $("#lightboxImg").onload =
                    () => {

                        $("#lightboxImg")
                            .classList
                            .add("loaded");


                        $("#lightboxFallback")
                            .classList
                            .add("hidden");

                    };



                $("#lightboxImg").onerror =
                    () => {

                        $("#lightboxImg")
                            .classList
                            .remove("loaded");


                        $("#lightboxFallback")
                            .classList
                            .remove("hidden");

                    };



                lightbox.classList.add(
                    "open"
                );


                document.body.classList.add(
                    "locked"
                );

            }
        );

    }
);



function closeLightbox() {

    lightbox.classList.remove(
        "open"
    );


    document.body.classList.remove(
        "locked"
    );

}


$("#closeLightbox")
    .addEventListener(
        "click",
        closeLightbox
    );


lightbox.addEventListener(
    "click",
    (event) => {

        if (
            event.target === lightbox
        ) {

            closeLightbox();

        }

    }
);



document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "Escape"
        ) {

            closeLightbox();

        }

    }
);



/* =========================================================
   MUSIC PLAYER
========================================================= */

const audio =
    $("#audio");


const playButton =
    $("#playBtn");


const musicToggle =
    $("#musicToggle");


const visualizer =
    $("#visualizer");

function startMusic() {
    document.getElementById("audio").play();
}

function toggleAudio() {

    if (audio.paused) {

        audio.play()
            .then(() => {

                playButton.textContent =
                    "Ⅱ";


                playButton.setAttribute(
                    "aria-label",
                    "Pause song"
                );


                musicToggle.classList.add(
                    "active"
                );


                visualizer.classList.add(
                    "playing"
                );

            })
            .catch(() => {

                alert(
                    "Add your song at assets/our-song.mp3"
                );

            });

    }

    else {

        audio.pause();


        playButton.textContent =
            "▶";


        playButton.setAttribute(
            "aria-label",
            "Play song"
        );


        musicToggle.classList.remove(
            "active"
        );


        visualizer.classList.remove(
            "playing"
        );

    }

}



playButton.addEventListener(
    "click",
    toggleAudio
);


musicToggle.addEventListener(
    "click",
    toggleAudio
);



/* Volume */

$("#volume").addEventListener(
    "input",
    (event) => {

        audio.volume =
            event.target.value;

    }
);



/* Audio duration */

audio.addEventListener(
    "loadedmetadata",
    () => {

        $("#duration").textContent =
            formatTime(
                audio.duration
            );

    }
);



/* Audio progress */

audio.addEventListener(
    "timeupdate",
    () => {

        if (audio.duration) {

            $("#progress").value =
                (
                    audio.currentTime /
                    audio.duration
                ) * 100;

        }


        $("#currentTime")
            .textContent =
            formatTime(
                audio.currentTime
            );

    }
);



/* Seek */

$("#progress").addEventListener(
    "input",
    (event) => {

        if (audio.duration) {

            audio.currentTime =
                (
                    event.target.value /
                    100
                ) *
                audio.duration;

        }

    }
);



/* Song finished */

audio.addEventListener(
    "ended",
    () => {

        playButton.textContent =
            "▶";


        musicToggle.classList.remove(
            "active"
        );


        visualizer.classList.remove(
            "playing"
        );

    }
);



function formatTime(seconds) {

    if (
        !Number.isFinite(seconds)
    ) {

        return "0:00";

    }


    const minutes =
        Math.floor(
            seconds / 60
        );


    const remainingSeconds =
        Math.floor(
            seconds % 60
        )
        .toString()
        .padStart(2, "0");


    return `${minutes}:${remainingSeconds}`;

}



/* =========================================================
   FINAL GIFT
========================================================= */

$("#giftBtn").addEventListener(
    "click",
    () => {

        const gift =
            $("#giftBtn");


        if (
            gift.classList.contains(
                "opened"
            )
        ) {

            return;

        }


        gift.classList.add(
            "opened"
        );


        $("#openText")
            .textContent =
            "For you. Always.";


        $("#finalMessage")
            .classList
            .add("show");


        launchConfetti(85);


        for (
            let i = 0;
            i < 4;
            i++
        ) {

            setTimeout(
                createShootingStar,
                i * 280
            );

        }

    }
);



/* =========================================================
   CONFETTI
========================================================= */

function launchConfetti(count) {

    const layer =
        $("#confetti");


    for (
        let i = 0;
        i < count;
        i++
    ) {

        const piece =
            document.createElement("i");


        piece.style.left =
            Math.random() * 100 +
            "%";


        piece.style.top =
            (
                -5 -
                Math.random() * 20
            ) + "%";


        piece.style.transform =
            `rotate(
                ${Math.random() * 360}deg
            )`;


        piece.style.animationDelay =
            Math.random() * 0.8 +
            "s";


        piece.style.animationDuration =
            (
                2 +
                Math.random() * 2
            ) + "s";


        piece.style.width =
            (
                4 +
                Math.random() * 7
            ) + "px";


        piece.style.height =
            (
                7 +
                Math.random() * 10
            ) + "px";


        layer.appendChild(
            piece
        );


        setTimeout(
            () => {

                piece.remove();

            },
            4500
        );

    }

}