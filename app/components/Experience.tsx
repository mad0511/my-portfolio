"use client";

import { Briefcase, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import AnimatedSectionHeader from "./AnimatedSectionHeader";
import { useState, useEffect } from "react";

export default function Experience() {
  const experiences = [
    {
      company: "Publicis Sapient",
      location: "Bangalore, IN(Hybrid)",
      period: "Dec 2021 - June 2023",
      role: "Full Stack Developer",
      year: "2021 - 2023",
      projects: [
        {
          name: "TCP (E-commerce Platform)",
          year: "2023",
          responsibilities: [
            "Developed and integrated advanced features for an e-commerce platform, including dashboards and payment gateway integration.",
            "Worked closely with the design team to optimize UI/UX, improving conversion rates by 15% and enhancing user experience."
          ],
        },
        {
          name: "API Design & Integration",
          year: "2022",
          responsibilities: [
            "Developed RESTful APIs to standardize third-party data, boosting performance and enhancing overall frontend experience.",
            "Utilized Redux for state management, improving app performance by 20% and streamlining secure user authentication with JWT."
          ],
        },
      ],
    },
    {
      company: "DIATOZ Solutions",
      location: "Bangalore, IN",
      period: "Apr 2018 - Dec 2021",
      role: "Software Engineer",
      year: "2018 - 2021",
      projects: [
        {
          name: "EZEVISION (Computer Vision for Vehicle Identification)",
          year: "2018",
          responsibilities: [
            "Built an Angular-based UI for visualizing video footages and integrating computer vision models for real-time vehicle identification.",
            "Optimized video streaming and integrated object detection models to track and identify vehicles in live footage."
          ],
        },
        {
          name: "E2EHIRING (Hiring Platform)",
          year: "2019",
          responsibilities: [
            "Developed an end-to-end hiring platform using React.js, enabling job posting, candidate applications, and real-time chat.",
            "Integrated advanced interview scheduling features, streamlining the recruitment process and enhancing user engagement."
          ],
        },
        {
          name: "SecureLeaf (Document Management & Search Platform)",
          year: "2020",
          responsibilities: [
            "Developed a document management platform with Elasticsearch for secure, efficient policy document search and retrieval.",
            "Implemented token-based authentication and ensured secure access, reducing search time by 70% and improving efficiency."
          ],
        },
        {
          name: "E-BOT (Computer Vision & Chatbot)",
          year: "2021",
          responsibilities: [
            "Integrated computer vision for identity recognition, enabling a chatbot to interact with users based on camera input.",
            "Developed a seamless experience for users by combining vision algorithms with real-time user interaction and engagement."
          ],
        },
      ],
    },
  ];

  const [selectedYear, setSelectedYear] = useState<string>("2019");

  // Collect all years in a unique list and sort them
  const years = [
    ...new Set(
      experiences.flatMap((exp) => exp.projects.map((project) => project.year))
    ),
  ].sort((a, b) => parseInt(a) - parseInt(b));

  // Get all experiences that have projects for the selected year
  const getExperiencesForYear = (year: string) => {
    return experiences.filter((experience) =>
      experience.projects.some((project) => project.year === year)
    );
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedYear(e.target.value);
  };

  useEffect(() => {
    // Only set initial selectedYear if it's not set yet
    if (!selectedYear) {
      setSelectedYear(years[0]);
    }
  }, [years, selectedYear]);

  return (
    <section
      id="experience"
      className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-indigo-900 transition-colors duration-300 overflow-hidden relative"
    >
      <div className="container mx-auto px-6 relative z-10 text-center">
        <AnimatedSectionHeader title="Professional Experience" />

        {/* Slider for Timeline */}
        <div className="mt-12">
          <input
            type="range"
            min={parseInt(years[0])}
            max={parseInt(years[years.length - 1])}
            step={1}
            value={parseInt(selectedYear)}
            onChange={handleSliderChange}
            className="w-full h-2 bg-blue-200 rounded-full cursor-pointer"
          />
          <div className="flex justify-between mt-2">
            {years.map((year, index) => (
              <span
                key={year}
                className={`text-sm text-gray-700 dark:text-gray-300 ${
                  selectedYear === year ? "font-semibold text-blue-700" : ""
                }`}
              >
                {year}
              </span>
            ))}
          </div>
        </div>

        {/* Display Experience Cards for Selected Year */}
        <div className="mt-8">
          {getExperiencesForYear(selectedYear).map((experience, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.2 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl mb-6"
            >
              <h3 className="text-xl font-semibold dark:text-white mb-2">
                {experience.company}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 flex items-center justify-center mb-1">
                <Calendar className="w-5 h-5 mr-2" />
                {experience.period}
              </p>
              <p className="text-lg font-medium dark:text-gray-200 flex items-center justify-center mb-2">
                <Briefcase className="w-5 h-5 mr-2" />
                {experience.role}
              </p>

              <div className="space-y-6">
                {experience.projects
                  .filter((project) => project.year === selectedYear)
                  .map((project, idx) => (
                    <div key={idx} className="space-y-4">
                      <h4 className="text-lg font-semibold dark:text-gray-200">
                        {project.name} ({project.year})
                      </h4>
                      <div className="space-y-2">
                        <h5 className="text-md font-medium dark:text-gray-200">
                          Responsibilities:
                        </h5>
                        <div className="space-y-1 text-gray-700 dark:text-gray-300">
                          {project.responsibilities.map((resp, idx) => (
                            <p key={idx} className="list-disc ml-4">
                              {resp}
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
