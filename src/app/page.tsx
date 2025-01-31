'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const cardHover = {
  scale: 1.05,
  transition: {
    type: "spring",
    stiffness: 300
  }
};

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ duration: 1 }}
        className="relative h-screen flex items-center justify-center bg-base-200"
      >
        <motion.div 
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="section-container text-center"
        >
          <motion.h1 
            variants={fadeInUp}
            className="heading text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary"
          >
            Leonardo Bruksch
          </motion.h1>
          <motion.p 
            variants={fadeInUp}
            className="text-xl mb-8 opacity-80"
          >
            Full Stack Software Engineer
          </motion.p>
          <motion.div 
            variants={fadeInUp}
            className="flex gap-4 justify-center"
          >
            <motion.a 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#achievements" 
              className="btn btn-primary"
            >
              View Achievements
            </motion.a>
            <motion.a 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="mailto:leonardokbruksch@hotmail.com?subject=Contact%20from%20Portfolio" 
              className="btn btn-outline btn-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              Contact Me
            </motion.a>
          </motion.div>
        </motion.div>
        <motion.div 
          animate={{ 
            y: [0, -10, 0],
          }}
          transition={{ 
            repeat: Infinity,
            duration: 2,
            ease: "easeInOut"
          }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <a href="#about" className="text-primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </a>
        </motion.div>
      </motion.section>

      {/* About Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        id="about" 
        className="bg-base-100"
      >
        <div className="section-container">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="heading"
          >
            About Me
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              <p className="text-lg">
                Experienced full-stack software engineer with 5 years of expertise in designing scalable web and mobile applications, 
                as well as architecting efficient serverless backends.
              </p>
              <p className="text-lg">
                Passionate about creating innovative solutions, optimizing data, and leading software development efforts. 
                Programming language agnostic, with expertise in technologies such as Next.js, React Native, Spring Boot, and Python.
              </p>
              <p className="text-lg">
                Currently working at V-DAQ in Wollongong, Australia, focusing on IoT asset tracking systems and scalable data solutions.
              </p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative h-80 w-full"
            >
              <Image
                src="/placeholder-profile.jpg"
                alt="Profile"
                fill
                className="object-cover rounded-lg"
                priority
              />
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Key Achievements Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        id="achievements" 
        className="bg-base-200"
      >
        <div className="section-container">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="heading"
          >
            Key Achievements
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Cost Reduction through Efficient Backend",
                description: "Implemented new data-intensive storage solutions using event-driven architecture with S3 Buckets, resulting in a 70% reduction in data operational costs."
              },
              {
                title: "IoT Device Integration",
                description: "Developed API systems to facilitate seamless integration of multiple IoT tracking devices, streamlining device communication and data flow."
              },
              {
                title: "Modern Development Practices",
                description: "Led a cultural shift in the team by advocating for use of TypeScript and Test Driven Development across the team."
              }
            ].map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                whileHover={cardHover}
                className="card bg-base-100 shadow-xl card-hover"
              >
                <div className="card-body">
                  <h3 className="card-title text-primary">{achievement.title}</h3>
                  <p>{achievement.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Skills Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        id="skills" 
        className="bg-base-100"
      >
        <div className="section-container">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="heading"
          >
            Technical Skills
          </motion.h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[
              'Next.js',
              'React Native',
              'Spring Boot',
              'Python',
              'TypeScript',
              'AWS Lambda',
              'S3 Buckets',
              'IoT Protocols',
              'REST APIs',
              'MQTT',
              'TDD',
              'Docker',
            ].map((skill, index) => (
              <motion.div
                key={skill}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={cardHover}
                className="card bg-base-200 p-6 text-center card-hover backdrop-blur-sm"
              >
                <h3 className="font-bold text-lg text-primary">{skill}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    </main>
  );
}
