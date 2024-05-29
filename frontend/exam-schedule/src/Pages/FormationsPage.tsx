import React from 'react';
import FormationsCarousel from '@/components/FormationsCarousel'; // Adjust the path if necessary
import GC from "@/assets/images/GC.jpg";
import SE from "@/assets/images/SE.jpg";
class Formation {
    title: string;
    description: string;
    imageUrl: string;

    constructor(title: string, description: string, imageUrl: string) {
        this.title = title;
        this.description = description;
        this.imageUrl = imageUrl;
    }
}

const formations = [
    new Formation('Software Engineering', 'Learn how to build software applications.', SE),
    new Formation('Civil Engineering', 'Learn how to design and build infrastructure.', GC),
    new Formation('Data Engineering', 'Discover the fundamentals of designing and building robust data infrastructure.', SE),
    new Formation('Electrical Engineering', 'Learn how to design and develop electrical systems and equipment.', GC),
    new Formation('Mechanical Engineering', 'Learn about the design and manufacturing of mechanical systems.', GC),
    new Formation('Environmental Engineering', 'Focus on developing solutions to environmental problems.', GC),
];

const FormationsPage: React.FC = () => {
    return (
        <div className="formations-page container mx-auto py-8">
            <h2 className="text-center text-3xl md:text-4xl font-bold">
                Our{" "}
        <span className="text-primary">
          Formations{" "}
        </span>
            </h2>
            <p className="text-center mt-4 mb-10 text-xl text-muted-foreground">
                Check some of our incredible Fields
            </p>
            <FormationsCarousel slides={formations}/>
        </div>
    );
}

export default FormationsPage;
