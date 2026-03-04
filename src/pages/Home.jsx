import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import '../style/home.css'
import Navbar from '../components/Navbar'
import About from '../components/About'

gsap.registerPlugin(ScrollTrigger)

export default function Home() {
    const nameRef = useRef(null)
    const imageRef = useRef(null)
    const heroRef = useRef(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            // --- Profile image entrance ---
            gsap.fromTo(imageRef.current,
                { scale: 1.15, opacity: 0 },
                {
                    scale: 1,
                    opacity: 1,
                    duration: 1.4,
                    ease: 'power3.out',
                    delay: 0.2,
                }
            )

            // --- Name character-by-character reveal ---
            const nameEl = nameRef.current
            if (nameEl) {
                const text = nameEl.textContent
                nameEl.textContent = ''
                nameEl.style.visibility = 'visible'

                const chars = text.split('').map((char) => {
                    const span = document.createElement('span')
                    span.textContent = char === ' ' ? '\u00A0' : char
                    span.className = 'hero-char'
                    span.style.display = 'inline-block'
                    nameEl.appendChild(span)
                    return span
                })

                gsap.fromTo(chars,
                    {
                        y: 80,
                        opacity: 0,
                        rotateX: -90,
                    },
                    {
                        y: 0,
                        opacity: 1,
                        rotateX: 0,
                        duration: 0.8,
                        ease: 'back.out(1.7)',
                        stagger: 0.04,
                        delay: 0.6,
                    }
                )

                // --- Subtle continuous float for the name ---
                gsap.to(nameEl, {
                    y: -8,
                    duration: 2.5,
                    ease: 'sine.inOut',
                    yoyo: true,
                    repeat: -1,
                    delay: 2,
                })
            }

        })

        return () => ctx.revert()
    }, [])

    return (
        <div>
            <Navbar />
            <div className='hero-section' ref={heroRef}>
                <img
                    src="/images/me.png"
                    className='profile-img'
                    ref={imageRef}
                />
                <div className='HomeWrapper'>
                    <span
                        className='name madimi'
                        ref={nameRef}
                        style={{ visibility: 'hidden' }}
                    >
                        AAYUSH DUTTA
                    </span>
                </div>
            </div>
            <About />
        </div>
    )
}