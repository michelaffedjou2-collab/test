"use client";

import { motion } from "framer-motion";
import { PortfolioData } from "@/types/portfolio";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

export default function ModernDeveloper({ data }: { data: PortfolioData }) {
  return (
    <div className="space-y-6">
      {/* Terminal-style header */}
      <motion.section
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="rounded-2xl overflow-hidden border border-gray-200"
      >
        <div className="bg-gray-800 px-4 py-2.5 flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-red-400" />
          <span className="w-3 h-3 rounded-full bg-yellow-400" />
          <span className="w-3 h-3 rounded-full bg-green-400" />
          <span className="ml-3 text-xs text-gray-400 font-mono">portfolio.tsx</span>
        </div>
        <div className="bg-gray-900 p-8 md:p-12">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="font-mono text-sm text-cyan-400 mb-1"
          >
            {"// Bienvenue sur mon portfolio"}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-5xl font-bold text-white mb-2"
          >
            {data.fullName}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="text-lg text-blue-400 font-mono"
          >
            {`> ${data.professionalTitle}`}
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-gray-400 mt-4 max-w-2xl leading-relaxed"
          >
            {data.bio}
          </motion.p>
        </div>
      </motion.section>

      {/* Skills as tags */}
      {data.skills.length > 0 && (
        <motion.section
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.03 }}
          className="glass rounded-2xl p-6"
        >
          <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span className="text-blue-500 font-mono text-sm">{"<"}</span>
            Stack Technique
            <span className="text-blue-500 font-mono text-sm">{"/>"}</span>
          </h2>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill, i) => (
              <motion.span
                key={i}
                variants={fadeIn}
                className="px-3 py-1.5 rounded-lg text-sm font-mono bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 transition-colors"
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.section>
      )}

      {/* Experience timeline */}
      {data.experience.length > 0 && (
        <motion.section
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.1 }}
          className="glass rounded-2xl p-6"
        >
          <h2 className="text-lg font-bold text-gray-800 mb-6">Expérience</h2>
          <div className="space-y-4">
            {data.experience.map((exp, i) => (
              <motion.div
                key={i}
                variants={fadeIn}
                className="relative pl-6 border-l-2 border-blue-300"
              >
                <div className="absolute left-[-5px] top-1.5 w-2 h-2 rounded-full bg-blue-500" />
                <h3 className="font-semibold text-gray-800">{exp.role}</h3>
                <p className="text-sm text-blue-600 font-medium">{exp.company}</p>
                <p className="text-xs text-gray-400 mt-0.5">{exp.period}</p>
                <p className="text-sm text-gray-600 mt-1.5">{exp.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <motion.section
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.1 }}
          className="glass rounded-2xl p-6"
        >
          <h2 className="text-lg font-bold text-gray-800 mb-4">Formation</h2>
          <div className="space-y-3">
            {data.education.map((edu, i) => (
              <motion.div
                key={i}
                variants={fadeIn}
                className="p-4 rounded-xl bg-blue-50/50 border border-blue-100"
              >
                <h3 className="font-semibold text-gray-800">{edu.degree}</h3>
                <p className="text-sm text-blue-600">{edu.institution}</p>
                <p className="text-xs text-gray-400 mt-0.5">{edu.period}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>
      )}

      {/* Projects as cards */}
      {data.projects.length > 0 && (
        <motion.section
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.1 }}
          className="glass rounded-2xl p-6"
        >
          <h2 className="text-lg font-bold text-gray-800 mb-4">Projets</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {data.projects.map((project, i) => (
              <motion.div
                key={i}
                variants={fadeIn}
                className="p-5 rounded-xl border border-gray-200 bg-white hover:shadow-md transition-shadow"
              >
                <h3 className="font-semibold text-gray-800 mb-1">{project.name}</h3>
                <p className="text-sm text-gray-600 mb-3">{project.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {project.technologies.map((tech, j) => (
                    <span key={j} className="px-2 py-0.5 rounded text-xs bg-gray-100 text-gray-600 font-mono">
                      {tech}
                    </span>
                  ))}
                </div>
                {project.link && (
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="inline-block mt-2 text-sm text-blue-500 hover:underline">
                    Voir &rarr;
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        </motion.section>
      )}
    </div>
  );
}
