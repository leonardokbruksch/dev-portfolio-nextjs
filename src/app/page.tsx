import Image from 'next/image';

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-base-200">
        <div className="section-container text-center">
          <h1 className="heading animate-slide-up">
            John Doe
          </h1>
          <p className="text-xl mb-8 animate-slide-up opacity-80">
            Full Stack Software Engineer
          </p>
          <div className="flex gap-4 justify-center animate-slide-up">
            <a href="#projects" className="btn btn-primary">View Projects</a>
            <a href="#contact" className="btn btn-outline btn-primary">Contact Me</a>
          </div>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <a href="#about" className="text-primary">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </a>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="bg-base-100">
        <div className="section-container">
          <h2 className="heading">About Me</h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <p className="text-lg">
                I'm a passionate software engineer with expertise in building modern web applications.
                With 5+ years of experience in full-stack development, I specialize in creating
                scalable and user-friendly solutions.
              </p>
              <p className="text-lg">
                My tech stack includes React, Node.js, TypeScript, and various cloud technologies.
                I'm always eager to learn new technologies and solve complex problems.
              </p>
            </div>
            <div className="relative h-80 w-full">
              <Image
                src="/placeholder-profile.jpg"
                alt="Profile"
                fill
                className="object-cover rounded-lg"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="bg-base-200">
        <div className="section-container">
          <h2 className="heading">Featured Projects</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((project) => (
              <div key={project} className="card bg-base-100 shadow-xl card-hover">
                <figure className="relative h-48">
                  <Image
                    src={`/project-${project}.jpg`}
                    alt={`Project ${project}`}
                    fill
                    className="object-cover"
                  />
                </figure>
                <div className="card-body">
                  <h3 className="card-title text-primary">Project {project}</h3>
                  <p>A brief description of this amazing project and its key features.</p>
                  <div className="card-actions justify-end">
                    <button className="btn btn-primary btn-sm">View Project</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="bg-base-100">
        <div className="section-container">
          <h2 className="heading">Skills</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[
              'React', 'TypeScript', 'Node.js', 'Python',
              'AWS', 'Docker', 'GraphQL', 'MongoDB'
            ].map((skill) => (
              <div key={skill} className="card bg-base-200 p-6 text-center card-hover">
                <h3 className="font-bold text-lg text-primary">{skill}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="bg-base-200">
        <div className="section-container">
          <h2 className="heading">Get In Touch</h2>
          <div className="max-w-2xl mx-auto">
            <form className="space-y-6">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input type="text" placeholder="Your name" className="input input-bordered w-full" />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input type="email" placeholder="your@email.com" className="input input-bordered w-full" />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Message</span>
                </label>
                <textarea className="textarea textarea-bordered h-32" placeholder="Your message"></textarea>
              </div>
              <button type="submit" className="btn btn-primary w-full">Send Message</button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
