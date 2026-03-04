import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import '../style/about.css'
import projects from '../data/project_list'


gsap.registerPlugin(ScrollTrigger)

function About() {
    const currentYear = new Date().getFullYear()
    const experience = currentYear - 2025
    const projectCount = projects.length
    const technologies = '5+'

    const wrapperRef = useRef(null)
    const accentRef = useRef(null)
    const labelRef = useRef(null)
    const titleRef = useRef(null)
    const descRef = useRef(null)
    const statsRef = useRef(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: wrapperRef.current,
                    start: 'top 75%',
                    end: 'top 25%',
                    toggleActions: 'play none none none',
                },
            })

            // Accent line grows from 0 width
            tl.fromTo(accentRef.current,
                { width: 0, opacity: 0 },
                { width: 60, opacity: 1, duration: 0.6, ease: 'power3.out' }
            )

                // Label slides in from left
                .fromTo(labelRef.current,
                    { x: -30, opacity: 0 },
                    { x: 0, opacity: 1, duration: 0.5, ease: 'power2.out' },
                    '-=0.3'
                )

                // Title animates in word-by-word
                .fromTo(titleRef.current,
                    { y: 40, opacity: 0, clipPath: 'inset(0 0 100% 0)' },
                    {
                        y: 0,
                        opacity: 1,
                        clipPath: 'inset(0 0 0% 0)',
                        duration: 0.7,
                        ease: 'power3.out',
                    },
                    '-=0.2'
                )

                // Description fades up
                .fromTo(descRef.current,
                    { y: 30, opacity: 0 },
                    { y: 0, opacity: 0.75, duration: 0.6, ease: 'power2.out' },
                    '-=0.3'
                )

            // Stats stagger in
            if (statsRef.current) {
                // Make the parent container visible first
                tl.set(statsRef.current, { opacity: 1 }, '-=0.2')
                const statItems = statsRef.current.querySelectorAll('.about-stat')
                tl.fromTo(statItems,
                    { y: 40, opacity: 0, scale: 0.9 },
                    {
                        y: 0,
                        opacity: 1,
                        scale: 1,
                        duration: 0.5,
                        ease: 'back.out(1.7)',
                        stagger: 0.15,
                    },
                    '-=0.15'
                )
            }


        }, wrapperRef)

        return () => ctx.revert()
    }, [])

    return (
        <div className='about-wrapper' ref={wrapperRef}>
            <div className='about-content'>
                <div className='about-accent-line' ref={accentRef}></div>
                <span className='about-label' ref={labelRef}>ABOUT ME</span>
                <h2 className='about-title' ref={titleRef}>AI/ML Engineer &amp; Full Stack Developer</h2>
                <p className='about-description' ref={descRef}>
                    I am an Artificial Intelligence and Machine Learning Engineer with a passion for building web applications.
                    I have experience in full-stack development and am always looking to learn new technologies. I love turning complex problems into elegant,
                    intuitive solutions.
                </p>
                <div className='about-stats' ref={statsRef}>
                    <div className='about-stat'>
                        <span className='about-stat-number'>{experience}</span>
                        <span className='about-stat-label'>Years Experience</span>
                    </div>
                    <div className='about-stat'>
                        <span className='about-stat-number'>{projectCount}</span>
                        <span className='about-stat-label'>Projects Built</span>
                    </div>
                    <div className='about-stat'>
                        <span className='about-stat-number'>{technologies}</span>
                        <span className='about-stat-label'>Technologies</span>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default About