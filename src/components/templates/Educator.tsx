"use client";

import { motion } from "framer-motion";
import { PortfolioData } from "@/types/portfolio";

const fadeIn = {
  initial: { opacity: 0, y: 15 },
  animate: { opacity: 1, y: 0 },
};

export default function Educator({ data }: { data: PortfolioData }) {
  return (
    <div className="space-y-6">
      {/* Scholarly header */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="rounded-2xl overflow-hidden bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-700 p-10 md:p-14 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
          className="w-20 h-20 rounded-2xl mx-auto mb-4 bg-white/15 backdrop-blur-sm flex items-center justify-center text-3xl border border-white/20"
        >
          📚
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-3xl md:text-5xl font-bold text-white mb-2"
        >
          {data.fullName}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-lg text-indigo-200 font-medium"
        >
          {data.professionalTitle}
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-indigo-100/80 mt-4 max-w-2xl mx-auto leading-relaxed"
        >
          {data.bio}
        </motion.p>
      </motion.section>

      {/* Skills — clean list */}
      {data.skills.length > 0 && (
        <motion.section
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.03 }}
          className="glass rounded-2xl p-6"
        >
          <h2 className="text-lg font-bold text-gray-800 mb-4">Domaines de Compétence</h2>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill, i) => (
              <motion.span
                key={i}
                variants={fadeIn}
                className="px-4 py-2 rounded-xl text-sm font-medium bg-indigo-50 text-indigo-700 border border-indigo-100"
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.section>
      )}

      {/* Education first — important for educators */}
      {data.education.length > 0 && (
        <motion.section
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.1 }}
          className="glass rounded-2xl p-6"
        >
          <h2 className="text-lg font-bold text-gray-800 mb-4">Formation Académique</h2>
          <div className="space-y-4">
            {data.education.map((edu, i) => (
              <motion.div
                key={i}
                variants={fadeIn}
                className="flex gap-4 items-start p-4 rounded-xl bg-indigo-50/50 border border-indigo-100"
              >
                <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-sm flex-shrink-0">
                  {i + 1}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">{edu.degree}</h3>
                  <p className="text-sm text-indigo-600">{edu.institution}</p>
                  <p className="text-xs text-gray-400">{edu.period}</p>
                  {edu.description && <p className="text-sm text-gray-600 mt-1">{edu.description}</p>}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <motion.section
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.1 }}
          className="glass rounded-2xl p-6"
        >
          <h2 className="text-lg font-bold text-gray-800 mb-4">Expérience Pédagogique</h2>
          <div className="space-y-4">
            {data.experience.map((exp, i) => (
              <motion.div
                key={i}
                variants={fadeIn}
                className="relative pl-6 border-l-2 border-indigo-200"
              >
                <div className="absolute left-[-5px] top-1.5 w-2 h-2 rounded-full bg-indigo-500" />
                <h3 className="font-semibold text-gray-800">{exp.role}</h3>
                <p className="text-sm text-indigo-600 font-medium">{exp.company}</p>
                <p className="text-xs text-gray-400 mt-0.5">{exp.period}</p>
                <p className="text-sm text-gray-600 mt-1.5">{exp.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>
      )}

      {/* Projects / Publications */}
      {data.projects.length > 0 && (
        <motion.section
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.1 }}
          className="glass rounded-2xl p-6"
        >
          <h2 className="text-lg font-bold text-gray-800 mb-4">Projets & Publications</h2>
          <div className="space-y-4">
            {data.projects.map((project, i) => (
              <motion.div
                key={i}
                variants={fadeIn}
                className="p-4 rounded-xl bg-white border border-gray-100"
              >
                <h3 className="font-semibold text-gray-800 mb-1">{project.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{project.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {project.technologies.map((tech, j) => (
                    <span key={j} className="px-2 py-0.5 rounded text-xs bg-indigo-50 text-indigo-600">
                      {tech}
                    </span>
                  ))}
                </div>
                {project.link && (
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="inline-block mt-2 text-sm text-indigo-500 hover:underline">
                    Consulter &rarr;
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
