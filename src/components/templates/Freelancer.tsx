"use client";

import { motion } from "framer-motion";
import { PortfolioData } from "@/types/portfolio";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

export default function Freelancer({ data }: { data: PortfolioData }) {
  return (
    <div className="space-y-6">
      {/* Warm bold header */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="relative rounded-3xl overflow-hidden p-10 md:p-14 bg-gradient-to-br from-orange-500 via-amber-500 to-yellow-400"
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-10 -right-10 w-60 h-60 rounded-full bg-white blur-3xl" />
        </div>
        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-block px-4 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-medium mb-4"
          >
            Disponible pour des missions
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-5xl font-black text-white mb-2"
          >
            {data.fullName}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-white/90 font-medium"
          >
            {data.professionalTitle}
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-white/80 mt-4 max-w-2xl leading-relaxed"
          >
            {data.bio}
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap gap-3 mt-6"
          >
            {data.contact.email && (
              <a
                href={`mailto:${data.contact.email}`}
                className="px-5 py-2 rounded-xl bg-white text-orange-600 font-semibold text-sm hover:shadow-lg transition-shadow"
              >
                Me contacter
              </a>
            )}
            {data.contact.linkedin && (
              <a
                href={data.contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2 rounded-xl bg-white/20 backdrop-blur-sm text-white font-medium text-sm border border-white/30 hover:bg-white/30 transition-colors"
              >
                LinkedIn
              </a>
            )}
          </motion.div>
        </div>
      </motion.section>

      {/* Stats-like skills */}
      {data.skills.length > 0 && (
        <motion.section
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.04 }}
          className="glass rounded-2xl p-6"
        >
          <h2 className="text-lg font-bold text-gray-800 mb-4">Expertise</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {data.skills.map((skill, i) => (
              <motion.div
                key={i}
                variants={fadeIn}
                className="px-4 py-3 rounded-xl bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-100 text-center hover:shadow-sm transition-shadow"
              >
                <span className="text-sm font-semibold text-gray-700">{skill}</span>
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
          <h2 className="text-lg font-bold text-gray-800 mb-6">Missions & Expériences</h2>
          <div className="space-y-5">
            {data.experience.map((exp, i) => (
              <motion.div
                key={i}
                variants={fadeIn}
                className="relative pl-6 border-l-2 border-orange-300"
              >
                <div className="absolute left-[-6px] top-1 w-2.5 h-2.5 rounded-full bg-orange-400 ring-2 ring-orange-100" />
                <h3 className="font-semibold text-gray-800">{exp.role}</h3>
                <p className="text-sm text-orange-600 font-medium">{exp.company}</p>
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
              <motion.div key={i} variants={fadeIn} className="p-4 rounded-xl bg-orange-50/50 border border-orange-100">
                <h3 className="font-semibold text-gray-800">{edu.degree}</h3>
                <p className="text-sm text-orange-600">{edu.institution}</p>
                <p className="text-xs text-gray-400">{edu.period}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>
      )}

      {/* Projects */}
      {data.projects.length > 0 && (
        <motion.section
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.1 }}
          className="glass rounded-2xl p-6"
        >
          <h2 className="text-lg font-bold text-gray-800 mb-4">Portfolio</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {data.projects.map((project, i) => (
              <motion.div
                key={i}
                variants={fadeIn}
                className="p-5 rounded-xl bg-white border border-gray-100 hover:shadow-md hover:-translate-y-0.5 transition-all"
              >
                <h3 className="font-bold text-gray-800 mb-1">{project.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{project.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {project.technologies.map((tech, j) => (
                    <span key={j} className="px-2 py-0.5 rounded text-xs bg-orange-50 text-orange-600">
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      )}
    </div>
  );
}
