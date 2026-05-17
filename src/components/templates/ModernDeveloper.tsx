"use client";

import { motion } from "framer-motion";
import { PortfolioData } from "@/types/portfolio";

const fadeIn = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
};

export default function ModernDeveloper({ data }: { data: PortfolioData }) {
  const initials = data.fullName.split(" ").map((n) => n[0]).join("").slice(0, 2);

  return (
    <div className="space-y-0">
      {/* Immersive Hero */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative min-h-[70vh] flex items-center rounded-3xl overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-blue-950" />
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h60v60H0z' fill='none'/%3E%3Cpath d='M30 0v60M0 30h60' stroke='%2300d4ff' stroke-width='0.5'/%3E%3C/svg%3E\")" }} />
        <div className="absolute top-20 right-20 w-96 h-96 rounded-full bg-blue-500/10 blur-[100px]" />
        <div className="absolute bottom-10 left-10 w-72 h-72 rounded-full bg-cyan-500/8 blur-[80px]" />

        <div className="relative z-10 w-full px-8 md:px-16 py-16">
          <div className="grid md:grid-cols-5 gap-12 items-center">
            <div className="md:col-span-3 space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20"
              >
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-xs text-blue-300 font-mono">Disponible</span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                <p className="text-cyan-400 font-mono text-sm mb-2">{"// Bonjour, je suis"}</p>
                <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight leading-[1.1]">
                  {data.fullName}
                </h1>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-xl md:text-2xl text-blue-400 font-mono font-medium"
              >
                {`> ${data.professionalTitle}`}
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="text-gray-400 text-lg leading-relaxed max-w-2xl"
              >
                {data.bio}
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="flex flex-wrap gap-3 pt-2"
              >
                {data.contact.email && (
                  <a href={`mailto:${data.contact.email}`} className="px-5 py-2.5 rounded-xl bg-blue-500 text-white font-medium text-sm hover:bg-blue-600 transition-colors">
                    Me contacter
                  </a>
                )}
                {data.contact.linkedin && (
                  <a href={data.contact.linkedin} target="_blank" rel="noopener noreferrer" className="px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white font-medium text-sm hover:bg-white/10 transition-colors">
                    LinkedIn
                  </a>
                )}
                {data.contact.github && (
                  <a href={data.contact.github} target="_blank" rel="noopener noreferrer" className="px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white font-medium text-sm hover:bg-white/10 transition-colors">
                    GitHub
                  </a>
                )}
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
              className="md:col-span-2 hidden md:flex justify-center"
            >
              <div className="relative">
                <div className="w-48 h-48 rounded-3xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-6xl font-black text-white shadow-2xl shadow-blue-500/25 rotate-3">
                  {initials}
                </div>
                <div className="absolute -bottom-4 -right-4 w-48 h-48 rounded-3xl border-2 border-blue-500/20 -rotate-3" />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Compétences Techniques */}
      {data.skills.length > 0 && (
        <motion.section
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-50px" }}
          transition={{ staggerChildren: 0.04 }}
          className="py-16 px-8 md:px-16"
        >
          <motion.div variants={fadeIn} className="mb-8">
            <span className="text-blue-500 font-mono text-sm">{"<section>"}</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mt-1">Stack Technique</h2>
          </motion.div>
          <div className="flex flex-wrap gap-3">
            {data.skills.map((skill, i) => (
              <motion.span
                key={i}
                variants={fadeIn}
                whileHover={{ scale: 1.08, y: -2 }}
                className="px-5 py-2.5 rounded-xl text-sm font-mono font-medium bg-gradient-to-br from-gray-900 to-gray-800 text-cyan-300 border border-gray-700 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10 transition-all cursor-default"
              >
                {skill}
              </motion.span>
            ))}
          </div>
          <div className="mt-4">
            <span className="text-blue-500 font-mono text-sm">{"</section>"}</span>
          </div>
        </motion.section>
      )}

      {/* Expériences */}
      {data.experience.length > 0 && (
        <motion.section
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-50px" }}
          transition={{ staggerChildren: 0.15 }}
          className="py-16 px-8 md:px-16 bg-gradient-to-b from-transparent via-gray-50/50 to-transparent rounded-3xl"
        >
          <motion.h2 variants={fadeIn} className="text-3xl md:text-4xl font-bold text-gray-800 mb-10">
            Parcours Professionnel
          </motion.h2>
          <div className="space-y-8">
            {data.experience.map((exp, i) => (
              <motion.div
                key={i}
                variants={fadeIn}
                className="group relative grid md:grid-cols-4 gap-6"
              >
                <div className="md:col-span-1">
                  <p className="text-sm font-mono text-gray-400 md:sticky md:top-8">{exp.period}</p>
                </div>
                <div className="md:col-span-3 p-6 rounded-2xl bg-white border border-gray-100 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-500/5 transition-all">
                  <h3 className="text-xl font-bold text-gray-800">{exp.role}</h3>
                  <p className="text-blue-500 font-medium mt-1">{exp.company}</p>
                  <p className="text-gray-600 mt-3 leading-relaxed">{exp.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      )}

      {/* Formation & Projets — Side by side */}
      <div className="grid md:grid-cols-2 gap-8 py-16 px-8 md:px-16">
        {data.education.length > 0 && (
          <motion.section
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-50px" }}
            transition={{ staggerChildren: 0.1 }}
          >
            <motion.h2 variants={fadeIn} className="text-3xl font-bold text-gray-800 mb-6">
              Formation
            </motion.h2>
            <div className="space-y-4">
              {data.education.map((edu, i) => (
                <motion.div
                  key={i}
                  variants={fadeIn}
                  className="p-5 rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50/50 border border-blue-100"
                >
                  <h3 className="font-bold text-gray-800">{edu.degree}</h3>
                  <p className="text-sm text-blue-600 font-medium">{edu.institution}</p>
                  <p className="text-xs text-gray-400 mt-1">{edu.period}</p>
                  {edu.description && <p className="text-sm text-gray-600 mt-2">{edu.description}</p>}
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {data.projects.length > 0 && (
          <motion.section
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-50px" }}
            transition={{ staggerChildren: 0.1 }}
          >
            <motion.h2 variants={fadeIn} className="text-3xl font-bold text-gray-800 mb-6">
              Projets
            </motion.h2>
            <div className="space-y-4">
              {data.projects.map((project, i) => (
                <motion.div
                  key={i}
                  variants={fadeIn}
                  whileHover={{ y: -3 }}
                  className="p-5 rounded-2xl bg-white border border-gray-100 hover:shadow-lg transition-all"
                >
                  <h3 className="font-bold text-gray-800">{project.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{project.description}</p>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {project.technologies.map((tech, j) => (
                      <span key={j} className="px-2 py-0.5 rounded text-xs font-mono bg-gray-900 text-cyan-300">
                        {tech}
                      </span>
                    ))}
                  </div>
                  {project.link && (
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="inline-block mt-3 text-sm text-blue-500 hover:underline font-mono">
                      Voir &rarr;
                    </a>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}
      </div>
    </div>
  );
}
