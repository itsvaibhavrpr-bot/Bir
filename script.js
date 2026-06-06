document.addEventListener("DOMContentLoaded", () => {
    // Background Elements (Floating Hearts)
    const bgContainer = document.getElementById('background-elements');
    function createHeart() {
        const heart = document.createElement('i');
        heart.classList.add('fas', 'fa-heart', 'floating-heart');
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = Math.random() * 5 + 5 + 's';
        heart.style.fontSize = Math.random() * 20 + 10 + 'px';
        bgContainer.appendChild(heart);
        setTimeout(() => { heart.remove(); }, 10000);
    }
    setInterval(createHeart, 500);

    // Audio Setup
    const bgMusic = document.getElementById('bgMusic');
    const musicToggle = document.getElementById('musicToggle');
    let isPlaying = false;

    musicToggle.addEventListener('click', () => {
        if (isPlaying) {
            bgMusic.pause();
            musicToggle.innerHTML = '<i class="fas fa-music"></i>';
        } else {
            bgMusic.play().catch(e => console.log("Audio play blocked", e));
            musicToggle.innerHTML = '<i class="fas fa-pause"></i>';
        }
        isPlaying = !isPlaying;
    });

    // Helper: Switch sections
    function switchSection(currentId, nextId) {
        document.getElementById(currentId).classList.remove('active');
        setTimeout(() => {
            document.getElementById(currentId).classList.add('hidden');
            const next = document.getElementById(nextId);
            next.classList.remove('hidden');
            // small delay to allow display:block to apply before fading in
            setTimeout(() => next.classList.add('active'), 50);
        }, 1000);
    }

    // 1. Opening Section
    const openingText = "A Special Day For The Most Beautiful Girl In My World ❤️";
    const openingElem = document.getElementById('opening-text');
    let idx = 0;
    function typeOpening() {
        if (idx < openingText.length) {
            openingElem.textContent += openingText.charAt(idx);
            idx++;
            setTimeout(typeOpening, 30);
        } else {
            setTimeout(() => {
                document.getElementById('enter-btn').classList.remove('hidden');
            }, 1000);
        }
    }
    setTimeout(typeOpening, 1000);

    document.getElementById('enter-btn').addEventListener('click', () => {
        if(!isPlaying) {
            bgMusic.play().catch(e => console.log(e));
            isPlaying = true;
            musicToggle.innerHTML = '<i class="fas fa-pause"></i>';
        }
        switchSection('opening', 'cake-section');
    });

    // 2. Cake Section
    document.getElementById('blow-candles-btn').addEventListener('click', () => {
        const flames = document.querySelectorAll('.flame');
        flames.forEach(flame => {
            flame.style.opacity = '0';
        });
        document.getElementById('blow-candles-btn').classList.add('hidden');
        document.getElementById('cake-msg').classList.remove('hidden');
        fireConfetti();
        
        setTimeout(() => {
            switchSection('cake-section', 'letter-section');
        }, 4000);
    });

    // 3. Letter Section
    const letterText = `My dearest Prachi, i dpnt know to tell you how much i love you\n\ni know i am not putting so much efforts but still its god who is binding us continuosly \n\n you know i fight with you ,i argument with you ,,i am non chalant for u but remember i am for you my babyyy\n\n  i love uh i love you soo sooo much meri jaaaan  \n\nYou are the most beautiful chapter of my life. Every smile of yours makes my world brighter. Every moment with you feels like a dream I never want to wake up from.\n\nAlmost 4 years together, and my love for you only grows stronger each day. On your birthday, I want you to know that you are loved more than words can express. Thank you for bringing happiness, laughter, and endless love into my life.\n\nHappy Birthday mera shona mona pyara bacha  ❤️\n\nForever Yours.`;
    const typedLetterElem = document.getElementById('typed-letter');
    let letterIdx = 0;
    
    document.getElementById('open-letter-btn').addEventListener('click', () => {
        document.getElementById('envelope').classList.add('open');
        document.getElementById('open-letter-btn').classList.add('hidden');
        
        setTimeout(() => {
            function typeLetter() {
                if (letterIdx < letterText.length) {
                    if (letterText.charAt(letterIdx) === '\n') {
                        typedLetterElem.innerHTML += '<br>';
                    } else {
                        typedLetterElem.innerHTML += letterText.charAt(letterIdx);
                    }
                    letterIdx++;
                    setTimeout(typeLetter, 50);
                } else {
                    setTimeout(() => switchSection('letter-section', 'memories-section'), 4000);
                }
            }
            typeLetter();
        }, 1000);
    });

    // 4. Memories Section
    document.getElementById('next-to-reasons-btn').addEventListener('click', () => {
        switchSection('memories-section', 'reasons-section');
    });

    // 5. Reasons Section
    const flipCards = document.querySelectorAll('.flip-card');
    flipCards.forEach(card => {
        card.addEventListener('click', () => {
            card.classList.toggle('flipped');
        });
    });
    document.getElementById('next-to-meter-btn').addEventListener('click', () => {
        switchSection('reasons-section', 'meter-section');
        setTimeout(fillMeter, 1000);
    });

    // 6. Love Meter
    function fillMeter() {
        const fill = document.getElementById('meter-fill');
        const text = document.getElementById('meter-text');
        let width = 0;
        const interval = setInterval(() => {
            if (width >= 100) {
                clearInterval(interval);
                text.textContent = '100% ...Wait!';
                setTimeout(() => {
                    text.style.color = '#ff3366';
                    text.style.fontSize = '2.5rem';
                    document.getElementById('meter-msg').classList.remove('hidden');
                    document.getElementById('next-to-game-btn').classList.remove('hidden');
                }, 1000);
            } else {
                width++;
                fill.style.width = width + '%';
                text.textContent = width + '%';
            }
        }, 30);
    }
    
    document.getElementById('next-to-game-btn').addEventListener('click', () => {
        switchSection('meter-section', 'game-section');
    });

    // 7. Game Section
    const btnNo = document.getElementById('btn-no');
    const btnYes = document.getElementById('btn-yes');
    let hoverCount = 0;

    btnNo.addEventListener('mouseover', () => {
        hoverCount++;
        const x = Math.random() * (window.innerWidth - btnNo.offsetWidth - 100) - ((window.innerWidth - btnNo.offsetWidth)/2 - 50);
        const y = Math.random() * (window.innerHeight - btnNo.offsetHeight - 100) - ((window.innerHeight - btnNo.offsetHeight)/2 - 50);
        
        btnNo.style.transform = `translate(${x}px, ${y}px) scale(${1 - hoverCount*0.05})`;
        
        if (hoverCount > 5) {
            document.getElementById('game-msg').classList.remove('hidden');
            setTimeout(() => {
                document.getElementById('next-to-timeline-btn').classList.remove('hidden');
            }, 2000);
        }
    });

    btnNo.addEventListener('click', (e) => {
        e.preventDefault();
    });

    btnYes.addEventListener('click', () => {
        document.getElementById('game-msg').textContent = "I Love You Too! ❤️";
        document.getElementById('game-msg').classList.remove('hidden');
        btnNo.classList.add('hidden');
        setTimeout(() => {
            document.getElementById('next-to-hold-heart-btn').classList.remove('hidden');
        }, 1000);
    });

    document.getElementById('next-to-hold-heart-btn').addEventListener('click', () => {
        switchSection('game-section', 'hold-heart-section');
    });

    // 7.5 Hold Heart Task
    const holdHeartBtn = document.getElementById('big-hold-heart');
    const heartProgressFill = document.getElementById('heart-progress-fill');
    let holdInterval;
    let holdProgress = 0;
    let isHolding = false;
    let taskCompleted = false;

    function startHold(e) {
        if(e && e.type === 'touchstart') e.preventDefault();
        if(taskCompleted) return;
        isHolding = true;
        holdHeartBtn.style.transform = 'scale(1.2)';
        holdHeartBtn.style.color = '#ff3366';
        
        clearInterval(holdInterval);
        holdInterval = setInterval(() => {
            if(holdProgress >= 100) {
                clearInterval(holdInterval);
                taskCompleted = true;
                holdHeartBtn.style.transform = 'scale(1.5)';
                holdHeartBtn.classList.add('pulse');
                document.getElementById('hold-heart-msg').classList.remove('hidden');
                document.getElementById('next-to-timeline-btn').classList.remove('hidden');
                fireConfetti();
            } else {
                holdProgress += 2;
                heartProgressFill.style.width = holdProgress + '%';
            }
        }, 50);
    }

    function endHold(e) {
        if(taskCompleted) return;
        isHolding = false;
        clearInterval(holdInterval);
        holdHeartBtn.style.transform = 'scale(1)';
        holdHeartBtn.style.color = 'var(--rose-gold)';
        
        const drainInterval = setInterval(() => {
            if(isHolding || holdProgress <= 0 || taskCompleted) {
                clearInterval(drainInterval);
            } else {
                holdProgress -= 3;
                if(holdProgress < 0) holdProgress = 0;
                heartProgressFill.style.width = holdProgress + '%';
            }
        }, 50);
    }

    holdHeartBtn.addEventListener('mousedown', startHold);
    holdHeartBtn.addEventListener('touchstart', startHold, {passive: false});
    window.addEventListener('mouseup', endHold);
    window.addEventListener('touchend', endHold);

    document.getElementById('next-to-timeline-btn').addEventListener('click', () => {
        switchSection('hold-heart-section', 'timeline-section');
        setTimeout(revealTimeline, 500);
    });

    // 8. Timeline Section
    function revealTimeline() {
        const items = document.querySelectorAll('.timeline-item');
        items.forEach((item, index) => {
            setTimeout(() => {
                item.classList.add('show');
            }, index * 800);
        });
    }

    document.getElementById('next-to-gift-btn').addEventListener('click', () => {
        switchSection('timeline-section', 'gift-section');
    });

    // 9. Gift Section
    const giftBox = document.getElementById('gift-box');
    giftBox.addEventListener('click', () => {
        giftBox.classList.add('opened');
        giftBox.style.animation = 'none';
        fireConfetti();
        setTimeout(() => {
            document.getElementById('gift-msg').classList.remove('hidden');
            setTimeout(() => {
                document.getElementById('next-to-proposal-btn').classList.remove('hidden');
            }, 1500);
        }, 1000);
    });

    document.getElementById('next-to-proposal-btn').addEventListener('click', () => {
        switchSection('gift-section', 'proposal-section');
    });

    // 10. Proposal Section
    function startFlashback() {
        const items = document.querySelectorAll('.flashback-item');
        let currentIdx = 0;
        
        if(items.length > 0) {
            function showNext() {
                items[currentIdx].classList.remove('show');
                if(items[currentIdx].tagName === 'VIDEO') {
                    items[currentIdx].pause();
                    items[currentIdx].currentTime = 0;
                }
                
                currentIdx = (currentIdx + 1) % items.length;
                
                items[currentIdx].classList.add('show');
                
                if(items[currentIdx].tagName === 'VIDEO') {
                    items[currentIdx].play().catch(e => {
                        setTimeout(showNext, 4000);
                    });
                    items[currentIdx].onended = showNext;
                } else {
                    setTimeout(showNext, 4000);
                }
            }

            items[0].classList.add('show');
            if(items[0].tagName === 'VIDEO') {
                items[0].play().catch(e => setTimeout(showNext, 4000));
                items[0].onended = showNext;
            } else {
                setTimeout(showNext, 4000);
            }
        }
    }

    document.getElementById('forever-btn').addEventListener('click', () => {
        document.getElementById('forever-btn').classList.add('hidden');
        document.getElementById('proposal-yes').classList.remove('hidden');
        startFireworks();
        
        // Transition to Flashback after 4 seconds of fireworks
        setTimeout(() => {
            switchSection('proposal-section', 'flashback-section');
            setTimeout(startFlashback, 1000);
        }, 4000);
    });

    // Simple Confetti & Fireworks Canvas System
    const canvas = document.getElementById('fireworksCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    let particles = [];

    class Particle {
        constructor(x, y, color, isFirework) {
            this.x = x;
            this.y = y;
            this.color = color;
            this.radius = Math.random() * 3 + 1;
            this.velocity = {
                x: (Math.random() - 0.5) * (isFirework ? 15 : 8),
                y: (Math.random() - 0.5) * (isFirework ? 15 : 8)
            };
            this.friction = 0.95;
            this.gravity = 0.2;
            this.opacity = 1;
            this.isFirework = isFirework;
        }

        draw() {
            ctx.save();
            ctx.globalAlpha = this.opacity;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
            ctx.restore();
        }

        update() {
            this.draw();
            this.velocity.x *= this.friction;
            this.velocity.y *= this.friction;
            this.velocity.y += this.gravity;
            this.x += this.velocity.x;
            this.y += this.velocity.y;
            this.opacity -= 0.015;
        }
    }

    function fireConfetti() {
        const colors = ['#ff3366', '#ffd700', '#ffb6c1', '#ffffff', '#8a2be2'];
        for (let i = 0; i < 150; i++) {
            particles.push(new Particle(canvas.width / 2, canvas.height / 2, colors[Math.floor(Math.random() * colors.length)], false));
        }
    }

    let fireworksInterval;
    function startFireworks() {
        const colors = ['#ff3366', '#ffd700', '#ffb6c1', '#ffffff', '#00ffff', '#ff00ff'];
        
        function explode() {
            const x = Math.random() * canvas.width;
            const y = Math.random() * (canvas.height / 2); // Explode in top half
            for (let i = 0; i < 100; i++) {
                particles.push(new Particle(x, y, colors[Math.floor(Math.random() * colors.length)], true));
            }
        }

        explode();
        fireworksInterval = setInterval(explode, 800);
    }

    function animateParticles() {
        requestAnimationFrame(animateParticles);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach((particle, index) => {
            if (particle.opacity <= 0) {
                particles.splice(index, 1);
            } else {
                particle.update();
            }
        });
    }

    animateParticles();
});
