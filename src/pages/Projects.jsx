import Navbar from "../components/Navbar";
import Carousel from "../components/Carousel";
import Card from "../components/Card";
import projects from "../data/project_list";

function Projects() {
    return (
        <div style={{ height: "100vh", width: "100vw", backgroundColor: "black", overflow: "hidden", position: "relative" }}>
            <div style={{ position: "absolute", top: 0, left: 0, width: "100%", zIndex: 100 }}>
                <Navbar />
            </div>

            <Carousel>
                {projects.map((project, index) => (
                    <Card
                        key={index}
                        title={project.title}
                        description={project.description}
                        image={project.image}
                        link={project.link}
                    />
                ))}
            </Carousel>
        </div>
    )
}

export default Projects