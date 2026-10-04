/* =========================================================
   BIRTHDAY WEBSITE
   COMPLETE JAVASCRIPT
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       GET ELEMENTS
       ===================================================== */

    const openingScreen =
        document.getElementById("openingScreen");

    const birthdayScreen =
        document.getElementById("birthdayScreen");

    const startButton =
        document.getElementById("startButton");

    const blowButton =
        document.getElementById("blowButton");

    const canvas =
        document.getElementById("fireworksCanvas");

    const finalMessage =
        document.getElementById("finalMessage");


    /* =====================================================
       CHECK ELEMENTS
       ===================================================== */

    if (
        !openingScreen ||
        !birthdayScreen ||
        !startButton ||
        !blowButton ||
        !canvas ||
        !finalMessage
    ) {

        console.error(
            "Birthday project: One or more required HTML elements are missing."
        );

        return;
    }


    /* =====================================================
       CANVAS
       ===================================================== */

    const ctx =
        canvas.getContext("2d");

    if (!ctx) {

        console.error(
            "Birthday project: Canvas could not be initialized."
        );

        return;
    }


    let width =
        window.innerWidth;

    let height =
        window.innerHeight;


    function resizeCanvas() {

        width =
            window.innerWidth;

        height =
            window.innerHeight;


        const ratio =
            Math.min(
                window.devicePixelRatio || 1,
                2
            );


        canvas.width =
            Math.floor(width * ratio);

        canvas.height =
            Math.floor(height * ratio);


        canvas.style.width =
            width + "px";

        canvas.style.height =
            height + "px";


        ctx.setTransform(
            ratio,
            0,
            0,
            ratio,
            0,
            0
        );

    }


    resizeCanvas();


    window.addEventListener(
        "resize",
        resizeCanvas
    );


    /* =====================================================
       FIREWORK ARRAYS
       ===================================================== */

    const rockets = [];

    const particles = [];


    /* =====================================================
       COLORS
       ===================================================== */

    const colors = [

        "#ffffff",
        "#ffd166",
        "#ff5d8f",
        "#ff7b00",
        "#c77dff",
        "#7bdff2",
        "#80ed99",
        "#ff9de2"

    ];


    /* =====================================================
       RANDOM
       ===================================================== */

    function random(min, max) {

        return Math.random() *
            (max - min) +
            min;

    }


    /* =====================================================
       RANDOM COLOR
       ===================================================== */

    function randomColor() {

        return colors[
            Math.floor(
                Math.random() *
                colors.length
            )
        ];

    }


    /* =====================================================
       CREATE ROCKET
       ===================================================== */

    function createRocket(x) {

        if (typeof x !== "number") {

            x =
                random(
                    width * 0.15,
                    width * 0.85
                );

        }


        rockets.push({

            x: x,

            y: height + 10,

            targetY:
                random(
                    height * 0.12,
                    height * 0.45
                ),

            speed:
                random(
                    8,
                    12
                ),

            color:
                randomColor(),

            trail: []

        });

    }


    /* =====================================================
       CREATE EXPLOSION
       ===================================================== */

    function explode(rocket) {

        const amount =
            Math.floor(
                random(
                    90,
                    150
                )
            );


        for (
            let i = 0;
            i < amount;
            i++
        ) {

            const angle =
                Math.random() *
                Math.PI *
                2;


            const speed =
                random(
                    1.5,
                    7
                );


            particles.push({

                x:
                    rocket.x,

                y:
                    rocket.y,

                vx:
                    Math.cos(angle) *
                    speed,

                vy:
                    Math.sin(angle) *
                    speed,

                gravity:
                    random(
                        0.035,
                        0.075
                    ),

                friction:
                    0.985,

                life:
                    random(
                        50,
                        100
                    ),

                maxLife:
                    100,

                size:
                    random(
                        1,
                        3
                    ),

                color:
                    rocket.color

            });

        }


        /* Bright flash */

        for (
            let i = 0;
            i < 20;
            i++
        ) {

            const angle =
                Math.random() *
                Math.PI *
                2;


            const speed =
                random(
                    0.5,
                    4
                );


            particles.push({

                x:
                    rocket.x,

                y:
                    rocket.y,

                vx:
                    Math.cos(angle) *
                    speed,

                vy:
                    Math.sin(angle) *
                    speed,

                gravity: 0,

                friction: 0.9,

                life: 20,

                maxLife: 20,

                size:
                    random(
                        2,
                        5
                    ),

                color:
                    "#ffffff"

            });

        }

    }


    /* =====================================================
       UPDATE ROCKETS
       ===================================================== */

    function updateRockets() {

        for (
            let i =
                rockets.length - 1;

            i >= 0;

            i--
        ) {

            const rocket =
                rockets[i];


            rocket.trail.push({

                x:
                    rocket.x,

                y:
                    rocket.y

            });


            if (
                rocket.trail.length >
                12
            ) {

                rocket.trail.shift();

            }


            rocket.y -=
                rocket.speed;


            rocket.x +=
                Math.sin(
                    rocket.y *
                    0.03
                ) *
                0.5;


            if (
                rocket.y <=
                rocket.targetY
            ) {

                explode(
                    rocket
                );


                rockets.splice(
                    i,
                    1
                );

            }

        }

    }


    /* =====================================================
       DRAW ROCKETS
       ===================================================== */

    function drawRockets() {

        for (
            const rocket of rockets
        ) {

            for (
                let i = 0;
                i < rocket.trail.length;
                i++
            ) {

                const point =
                    rocket.trail[i];


                const alpha =
                    i /
                    rocket.trail.length;


                ctx.beginPath();


                ctx.fillStyle =
                    `rgba(255,255,255,${alpha})`;


                ctx.arc(
                    point.x,
                    point.y,
                    1.5,
                    0,
                    Math.PI * 2
                );


                ctx.fill();

            }


            ctx.beginPath();


            ctx.fillStyle =
                rocket.color;


            ctx.shadowBlur =
                15;

            ctx.shadowColor =
                rocket.color;


            ctx.arc(
                rocket.x,
                rocket.y,
                3,
                0,
                Math.PI * 2
            );


            ctx.fill();


            ctx.shadowBlur = 0;

        }

    }


    /* =====================================================
       UPDATE PARTICLES
       ===================================================== */

    function updateParticles() {

        for (
            let i =
                particles.length - 1;

            i >= 0;

            i--
        ) {

            const particle =
                particles[i];


            particle.vx *=
                particle.friction;


            particle.vy *=
                particle.friction;


            particle.vy +=
                particle.gravity;


            particle.x +=
                particle.vx;


            particle.y +=
                particle.vy;


            particle.life--;


            if (
                particle.life <= 0
            ) {

                particles.splice(
                    i,
                    1
                );

            }

        }

    }


    /* =====================================================
       DRAW PARTICLES
       ===================================================== */

    function drawParticles() {

        for (
            const particle of particles
        ) {

            const alpha =
                Math.max(
                    particle.life /
                    particle.maxLife,
                    0
                );


            ctx.globalAlpha =
                alpha;


            ctx.beginPath();


            ctx.fillStyle =
                particle.color;


            ctx.shadowBlur =
                12;

            ctx.shadowColor =
                particle.color;


            ctx.arc(
                particle.x,
                particle.y,
                particle.size,
                0,
                Math.PI * 2
            );


            ctx.fill();

        }


        ctx.globalAlpha = 1;

        ctx.shadowBlur = 0;

    }


    /* =====================================================
       FIREWORK LOOP
       ===================================================== */

    let fireworksRunning =
        false;


    function fireworksLoop() {

        if (!fireworksRunning) {

            return;

        }


        /*
           Fade previous frame instead
           of completely clearing it.
        */

        ctx.fillStyle =
            "rgba(2,3,12,0.16)";


        ctx.fillRect(
            0,
            0,
            width,
            height
        );


        updateRockets();

        drawRockets();

        updateParticles();

        drawParticles();


        requestAnimationFrame(
            fireworksLoop
        );

    }


    /* =====================================================
       START FIREWORKS
       ===================================================== */

    let fireworksInterval = null;


    function startFireworks() {

        if (fireworksRunning) {

            return;

        }


        fireworksRunning =
            true;


        canvas.style.opacity =
            "1";


        ctx.clearRect(
            0,
            0,
            width,
            height
        );


        /* First fireworks */

        createRocket(
            width * 0.25
        );


        setTimeout(function () {

            createRocket(
                width * 0.5
            );

        }, 350);


        setTimeout(function () {

            createRocket(
                width * 0.75
            );

        }, 700);


        setTimeout(function () {

            createRocket(
                width * 0.35
            );

        }, 1100);


        setTimeout(function () {

            createRocket(
                width * 0.65
            );

        }, 1500);


        /* Continuous fireworks */

        fireworksInterval =
            setInterval(function () {

                if (
                    fireworksRunning
                ) {

                    createRocket();

                }

            }, 900);


        fireworksLoop();

    }


    /* =====================================================
       OPENING SCREEN
       ===================================================== */

    /*
       IMPORTANT:
       The opening screen starts with
       the "active" class in index.html.
    */


    startButton.addEventListener(
        "click",
        function () {

            startButton.disabled =
                true;


            openingScreen.classList.remove(
                "active"
            );


            setTimeout(function () {

                birthdayScreen.classList.add(
                    "active"
                );

                startButton.disabled =
                    false;

            }, 1000);

        }
    );


    /* =====================================================
       BLOW OUT CANDLES
       ===================================================== */

    let candlesBlown =
        false;


    blowButton.addEventListener(
        "click",
        function () {

            if (candlesBlown) {

                return;

            }


            candlesBlown =
                true;


            const flames =
                document.querySelectorAll(
                    ".flame"
                );


            /* Extinguish candles */

            flames.forEach(
                function (
                    flame,
                    index
                ) {

                    setTimeout(
                        function () {

                            flame.classList.add(
                                "extinguished"
                            );

                        },
                        index * 250
                    );

                }
            );


            /* Hide button */

            blowButton.classList.add(
                "hidden"
            );


            /* Start fireworks */

            setTimeout(
                function () {

                    startFireworks();

                },
                1200
            );


            /* Show final message */

            setTimeout(
                function () {

                    finalMessage.classList.add(
                        "show"
                    );

                },
                3200
            );

        }
    );


    /* =====================================================
       INITIAL STATE
       ===================================================== */

    /*
       Make absolutely sure the opening
       screen is visible when the page loads.
    */

    openingScreen.classList.add(
        "active"
    );

});