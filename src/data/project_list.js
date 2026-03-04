const host = window.location.hostname;
const projects = [
    {
        title: "Bloom Mind",
        description: "Bloom Mind is a platform for mental health and wellness. users can interact with the web application to understand their mental health and get personalized recommendations.",
        image: "/images/bloom_mind.png",
        link: `http://${host}:8082/`
    },
    {
        title: "Finnalyze",
        description: "A revolutionary AI-driven application that optimizes workflow efficiency for large enterprises.",
        image: "/images/finnalyze.png",
        link: `http://${host}:8083/`
    },
    {
        title: "Synthesia",
        description: "Synthesia is an AI Enabled Music Visualization Platform",
        image: "/images/synthesia.png",
        link: `http://${host}:8081/`
    },
    {
        title: "Aether",
        description: "Aether is my very own Physics Engine Which Was Created Using C++ and Aims to Integrate Reinforcement Learning Learning Techniques to Enable AI Integration for Game Simutlation Natively.",
        image: "/images/aether.png",
        link: "https://theazapto.github.io/Aether/"
    },
    {
        title: "Hallucin8",
        description: "Hallucin8 is an AI Driven Dream Creator. It Uses A Surreal Image Generation -> Image Describer -> Image Generation Loop to Create a Dream Like Experience where Art Evolves with Every Iteration.",
        image: "/images/hallucin8.png",
        link: "https://github.com/TheAzapto/Hallucin8"
    }
];

export default projects;