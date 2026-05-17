"use client";

import { motion } from "framer-motion";
import { PortfolioData } from "@/types/portfolio";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

export default function StudentJunior({ data }: { data: PortfolioData }) {
  return (
    <div className="space-y-6">
      {/* Fresh gradient header */}
      <motion.section
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
        className="relative rounded-3xl overflow-hidden p-10 md:p-14 text-center bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500"
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-white blur-2xl" />
          <div className="absolute bottom-10 right-10 w-24 h-24 rounded-full bg-white blur-2xl" />
        </div>
        <div className="relative z-10">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            className="w-24 h-24 rounded-full mx-auto mb-4 bg-white/20 backdrop-blur-sm flex items-center justify-center text-3xl font-bold text-white border-2 border-white/30"
          >
            {data.fullName.split(" ").map((n) => n[0]).join("").slice(0, 2)}
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-3xl md:text-5xl font-bold text-white mb-2"
          >
            {data.fullName}
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="inline-block px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-medium"
          >
            {data.professionalTitle}
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-white/80 mt-4 max-w-xl mx-auto"
          >
            {data.bio}
          </motion.p>
        </div>
      </motion.section>

      {/* Skills — bubble style */}
      {data.skills.length > 0 && (
        <motion.section
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.04 }}
          className="glass rounded-2xl p-6"
        >
          <h2 className="text-lg font-bold text-gray-800 mb-4">Mes Compétences</h2>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill, i) => (
              <motion.span
                key={i}
                variants={fadeIn}
                className="px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-700 border border-emerald-200 hover:shadow-sm transition-shadow"
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.section>
      )}

      {/* Education first for students */}
      {data.education.length > 0 && (
        <motion.section
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.1 }}
          className="glass rounded-2xl p-6"
        >
          <h2 className="text-lg font-bold text-gray-800 mb-4">Formation</h2>
          <div className="space-y-4">
            {data.education.map((edu, i) => (
              <motion.div
                key={i}
                variants={fadeIn}
                className="flex gap-4 items-start"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white text-lg flex-shrink-0">
                  🎓
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">{edu.degree}</h3>
                  <p className="text-sm text-emerald-600">{edu.institution}</p>
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
          <h2 className="text-lg font-bold text-gray-800 mb-4">Expériences</h2>
          <div className="space-y-4">
            {data.experience.map((exp, i) => (
              <motion.div
                key={i}
                variants={fadeIn}
                className="p-4 rounded-xl bg-gradient-to-r from-emerald-50/50 to-transparent border border-emerald-100"
              >
                <h3 className="font-semibold text-gray-800">{exp.role}</h3>
                <p className="text-sm text-emerald-600 font-medium">{exp.company}</p>
                <p className="text-xs text-gray-400 mt-0.5">{exp.period}</p>
                <p className="text-sm text-gray-600 mt-1.5">{exp.description}</p>
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
          <h2 className="text-lg font-bold text-gray-800 mb-4">Projets</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {data.projects.map((project, i) => (
              <motion.div
                key={i}
                variants={fadeIn}
                className="p-5 rounded-xl bg-white border border-gray-100 hover:shadow-md transition-shadow"
              >
                <h3 className="font-semibold text-gray-800 mb-1">{project.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{project.description}</p>
                <div className="flex flex-wrap gap-1">
                  {project.technologies.map((tech, j) => (
                    <span key={j} className="px-2 py-0.5 rounded text-xs bg-emerald-50 text-emerald-600">
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
