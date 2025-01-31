'use client';

import { motion, useScroll, useTransform } from 'framer-motion';

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
  scale: 1.02,
  y: -5,
  transition: {
    type: "spring",
    stiffness: 300
  }
};

export default function Home() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.97]);

  return (
    <main className="min-h-screen bg-[#0A101F]/80 relative">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      
      {/* Hero Section */}
      <motion.section 
        style={{ opacity, scale }}
        className="relative min-h-screen flex items-center justify-center"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/20 to-transparent opacity-20" />
        <motion.div 
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="section-container text-center relative z-10"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-8"
          >
            <h1 className="heading animate-glow">
              Leonardo Bruksch
            </h1>
            <motion.p 
              variants={fadeInUp}
              className="text-xl mb-8 text-blue-200/80"
            >
              Full Stack Software Engineer
            </motion.p>
          </motion.div>
          <motion.div 
            variants={fadeInUp}
            className="flex gap-4 justify-center"
          >
            <motion.a 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#achievements" 
              className="glass-card px-6 py-3 text-blue-300 hover:text-blue-200 transition-colors"
            >
              View Achievements
            </motion.a>
            <motion.a 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="mailto:leonardokbruksch@hotmail.com?subject=Contact%20from%20Portfolio" 
              className="glass-card px-6 py-3 text-blue-300 hover:text-blue-200 transition-colors border border-blue-500/30 bg-blue-500/10"
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
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-blue-400"
        >
          <a href="#about">
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
        className="relative"
      >
        <div className="absolute inset-0 bg-blue-500/5" />
        <div className="section-container relative">
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
              className="space-y-6"
            >
              <p className="text-lg text-blue-100/90">
                Experienced full-stack software engineer with 5 years of expertise in designing scalable web and mobile applications, 
                as well as architecting efficient serverless backends.
              </p>
              <p className="text-lg text-blue-100/90">
                Passionate about creating innovative solutions, optimizing data, and leading software development efforts. 
                Programming language agnostic, with expertise in technologies such as Next.js, React Native, Spring Boot, and Python.
              </p>
              <p className="text-lg text-blue-100/90">
                Currently working at V-DAQ in Wollongong, Australia, focusing on IoT asset tracking systems and scalable data solutions.
              </p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative h-80 w-full glass-card overflow-hidden rounded-2xl"
            >
              <motion.div className="absolute inset-0 bg-blue-500/10">
                <svg width="100%" height="100%" className="absolute inset-0">
                  <pattern
                    id="pattern"
                    x="0"
                    y="0"
                    width="40"
                    height="40"
                    patternUnits="userSpaceOnUse"
                    patternTransform="rotate(30)"
                  >
                    {[...Array(25)].map((_, i) => (
                      <motion.circle
                        key={i}
                        cx="20"
                        cy="20"
                        r="1"
                        className="fill-blue-400/30"
                        initial={{ scale: 0 }}
                        animate={{ 
                          scale: [1, 1.5, 1],
                          opacity: [0.3, 0.6, 0.3],
                        }}
                        transition={{
                          repeat: Infinity,
                          repeatType: "reverse",
                          duration: 4,
                          delay: i * 0.2,
                          ease: "easeInOut"
                        }}
                      />
                    ))}
                  </pattern>
                  <rect width="100%" height="100%" fill="url(#pattern)" />
                </svg>
                <motion.div 
                  className="absolute inset-0"
                  initial={{ backgroundPosition: '0% 0%' }}
                  animate={{ 
                    backgroundPosition: ['0% 0%', '100% 100%'],
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "linear"
                  }}
                  style={{
                    background: 'radial-gradient(circle at center, rgba(59, 130, 246, 0.2) 0%, transparent 50%)',
                    backgroundSize: '200% 200%'
                  }}
                />
              </motion.div>
              <motion.div 
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <motion.div
                  className="text-4xl font-bold text-blue-300/80"
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "linear"
                  }}
                >
                  <span className="gradient-text">{'<Dev />'}</span>
                </motion.div>
              </motion.div>
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
        className="relative"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent" />
        <div className="section-container relative">
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
                className="glass-card p-6 group"
              >
                <h3 className="text-xl font-semibold mb-4 text-blue-300 group-hover:text-blue-200 transition-colors">
                  {achievement.title}
                </h3>
                <p className="text-blue-100/80">{achievement.description}</p>
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
        className="relative"
      >
        <div className="absolute inset-0 bg-blue-500/5" />
        <div className="section-container relative">
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
                className="glass-card p-6 text-center group"
              >
                <h3 className="font-semibold text-blue-300 group-hover:text-blue-200 transition-colors">
                  {skill}
                </h3>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    </main>
  );
}
