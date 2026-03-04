import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import '../style/preloader.css'

export default function Preloader({ onComplete }) {
    const preloaderRef = useRef(null)
    const logoRef = useRef(null)
    const textRef = useRef(null)
    const loopTlRef = useRef(null)
    const readyRef = useRef(false)
    const [done, setDone] = useState(false)

    useEffect(() => {
        const paths = logoRef.current.querySelectorAll('path')

        // Set up paths for stroke drawing
        paths.forEach((path) => {
            const length = path.getTotalLength()
            gsap.set(path, {
                strokeDasharray: length,
                strokeDashoffset: length,
                fill: 'transparent',
                stroke: 'var(--accent-color)',
                strokeWidth: 4,
            })
        })

        // Looping animation timeline
        const loopTl = gsap.timeline({ repeat: -1, repeatDelay: 0.3 })
        loopTlRef.current = loopTl

        // Draw strokes
        paths.forEach((path, i) => {
            const length = path.getTotalLength()
            loopTl.to(path, {
                strokeDashoffset: 0,
                duration: 0.8,
                ease: 'power2.inOut',
            }, i * 0.3)
        })

        // Fill in
        loopTl.to(paths, {
            fill: 'var(--accent-color)',
            stroke: 'var(--accent-color)',
            duration: 0.3,
            ease: 'power2.in',
            stagger: 0.1,
        }, '-=0.2')

        // Scale bounce
        loopTl.fromTo(logoRef.current,
            { scale: 1 },
            { scale: 1.15, duration: 0.2, ease: 'power2.out', yoyo: true, repeat: 1 }
        )

        // Hold
        loopTl.to({}, { duration: 0.5 })

        // Reset back for next loop
        paths.forEach((path) => {
            const length = path.getTotalLength()
            loopTl.set(path, {
                strokeDashoffset: length,
                fill: 'transparent',
                stroke: 'var(--accent-color)',
            })
        })
        loopTl.set(logoRef.current, { scale: 1 })

        // Greeting text appears once
        gsap.fromTo(textRef.current,
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out', delay: 0.6 }
        )

        // Listen for page fully loaded
        const checkReady = () => {
            readyRef.current = true
        }

        if (document.readyState === 'complete') {
            // Wait at least one full loop (~2.5s min)
            setTimeout(checkReady, 2000)
        } else {
            window.addEventListener('load', () => {
                // Ensure at least one full animation cycle plays
                setTimeout(checkReady, 1500)
            })
        }

        // Watch for the ready signal at each loop repeat
        const onRepeat = () => {
            if (readyRef.current) {
                loopTl.pause()
                exitAnimation()
            }
        }
        loopTl.eventCallback('onRepeat', onRepeat)

        return () => {
            loopTl.kill()
        }
    }, [])

    const exitAnimation = () => {
        const paths = logoRef.current.querySelectorAll('path')

        // One final clean draw + fill
        const exitTl = gsap.timeline({
            onComplete: () => {
                gsap.to(preloaderRef.current, {
                    yPercent: -100,
                    duration: 0.6,
                    ease: 'power4.inOut',
                    delay: 0.15,
                    onComplete: () => {
                        setDone(true)
                        onComplete?.()
                    },
                })
            },
        })

        paths.forEach((path) => {
            const length = path.getTotalLength()
            exitTl.set(path, {
                strokeDashoffset: length,
                fill: 'transparent',
            })
        })

        paths.forEach((path, i) => {
            exitTl.to(path, {
                strokeDashoffset: 0,
                duration: 0.6,
                ease: 'power2.inOut',
            }, i * 0.2)
        })

        exitTl.to(paths, {
            fill: 'var(--accent-color)',
            duration: 0.25,
            stagger: 0.08,
        }, '-=0.15')

        exitTl.to(logoRef.current, {
            scale: 1.2,
            duration: 0.15,
            ease: 'power2.out',
            yoyo: true,
            repeat: 1,
        })
    }

    if (done) return null

    return (
        <div className="preloader" ref={preloaderRef}>
            <div className="preloader-content">
                <svg
                    ref={logoRef}
                    className="preloader-logo"
                    viewBox="0 0 507.99999 508"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <g transform="translate(-3.499995,29)">
                        <path
                            d="M 19.99999,399.99999 199.99999,50 h 20 a 50,50 45 0 1 50,50 V 340 H 240 a 20.000006,20.000006 44.999999 0 1 -20,-20 l -1e-5,-200 -149.999999,279.99999 z"
                        />
                        <path
                            d="M 96.240703,388.03863 196.12301,196.59755 A 7.3556091,7.3556091 13.776406 0 1 209.99999,200 V 329.99998 A 20.000015,20.000015 45 0 0 230,350 h 140 c 99.99999,2e-5 100,-250 10e-6,-250 h -20 a 9.9999969,9.9999969 135 0 0 -10,10 v 220 a 10,10 135 0 1 -10,10 H 290 V 60.000006 A 10.000006,10.000006 135 0 1 300.00001,50 H 420 c 100,0 100,350 0,350 l -316.5085,-10e-6 a 8.1783414,8.1783414 58.776407 0 1 -7.250797,-11.96136 z"
                        />
                    </g>
                </svg>
                <span className="preloader-text" ref={textRef}>welcome</span>
            </div>
        </div>
    )
}
