"use client";

import { motion } from "framer-motion";
import { PortfolioData } from "@/types/portfolio";

const fadeIn = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
};

export default function StudentJunior({ data }: { data: PortfolioData }) {
  const initials = data.fullName.split(" ").map((n) => n[0]).join("").slice(0, 2);

  return (
    <div className="space-y-0">
      {/* Dynamic Hero */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative min-h-[70vh] flex items-center rounded-3xl overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-950 via-teal-900 to-cyan-950" />
        <div className="absolute top-10 right-10 w-[500px] h-[500px] rounded-full bg-emerald-500/10 blur-[120px] animate-pulse-glow" />
        <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full bg-teal-400/8 blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full border border-emerald-500/5" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-emerald-500/3" />

        <div className="relative z-10 w-full px-8 md:px-16 py-16 text-center md:text-left">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1 space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/20"
              >
                <span className="text-xs text-emerald-300 font-medium">En recherche d&apos;opportunités</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-5xl md:text-7xl font-black text-white tracking-tight leading-[1.05]"
              >
                {data.fullName}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-xl md:text-2xl text-emerald-300 font-medium"
              >
                {data.professionalTitle}
              </motion.p>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-teal-200/70 text-lg leading-relaxed max-w-lg"
              >
                {data.bio}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="flex flex-wrap gap-3 justify-center md:justify-start"
              >
                {data.contact.email && (
                  <a href={`mailto:${data.contact.email}`} className="px-6 py-3 rounded-2xl bg-emerald-500 text-white font-semibold text-sm hover:bg-emerald-400 transition-colors shadow-lg shadow-emerald-500/25">
                    Me contacter
                  </a>
                )}
                {data.contact.linkedin && (
                  <a href={data.contact.linkedin} target="_blank" rel="noopener noreferrer" className="px-6 py-3 rounded-2xl bg-white/5 border border-white/10 text-white font-medium text-sm hover:bg-white/10 transition-colors backdrop-blur-sm">
                    LinkedIn
                  </a>
                )}
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, type: "spring" }}
              className="order-1 md:order-2 flex justify-center"
            >
              <div className="relative">
                <div className="w-40 h-40 md:w-48 md:h-48 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-5xl md:text-6xl font-black text-white shadow-2xl shadow-emerald-500/30 animate-float">
                  {initials}
                </div>
                <div className="absolute -bottom-2 -right-2 w-40 h-40 md:w-48 md:h-48 rounded-full border-2 border-dashed border-emerald-400/20" />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Formation en premier — c'est un étudiant */}
      {data.education.length > 0 && (
        <motion.section
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-50px" }}
          transition={{ staggerChildren: 0.12 }}
          className="py-16 px-8 md:px-16"
        >
          <motion.div variants={fadeIn} className="mb-8">
            <span className="inline-block px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-semibold uppercase tracking-wider mb-3">Parcours académique</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Formation</h2>
          </motion.div>
          <div className="space-y-5">
            {data.education.map((edu, i) => (
              <motion.div
                key={i}
                variants={fadeIn}
                whileHover={{ x: 4 }}
                className="group grid md:grid-cols-4 gap-4 p-6 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50/30 border border-emerald-100 hover:shadow-lg hover:shadow-emerald-100/50 transition-all"
              >
                <div className="md:col-span-1">
                  <span className="text-sm font-mono text-emerald-500">{edu.period}</span>
                </div>
                <div className="md:col-span-3">
                  <h3 className="text-lg font-bold text-gray-800">{edu.degree}</h3>
                  <p className="text-emerald-600 font-medium">{edu.institution}</p>
                  {edu.description && <p className="text-gray-600 mt-2 text-sm">{edu.description}</p>}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      )}

      {/* Compétences — bubbles */}
      {data.skills.length > 0 && (
        <motion.section
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-50px" }}
          transition={{ staggerChildren: 0.05 }}
          className="py-16 px-8 md:px-16 bg-gradient-to-b from-transparent via-emerald-50/40 to-transparent rounded-3xl"
        >
          <motion.div variants={fadeIn} className="mb-8">
            <span className="inline-block px-3 py-1 rounded-full bg-teal-100 text-teal-700 text-xs font-semibold uppercase tracking-wider mb-3">Savoir-faire</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Compétences</h2>
          </motion.div>
          <div className="flex flex-wrap gap-3">
            {data.skills.map((skill, i) => (
              <motion.span
                key={i}
                variants={fadeIn}
                whileHover={{ scale: 1.1, y: -3 }}
                className="px-5 py-2.5 rounded-full text-sm font-semibold bg-white text-emerald-700 border-2 border-emerald-200 hover:border-emerald-400 hover:shadow-lg hover:shadow-emerald-200/40 transition-all cursor-default"
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.section>
      )}

      {/* Expérience — si disponible */}
      {data.experience.length > 0 && (
        <motion.section
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-50px" }}
          transition={{ staggerChildren: 0.15 }}
          className="py-16 px-8 md:px-16"
        >
          <motion.div variants={fadeIn} className="mb-8">
            <span className="inline-block px-3 py-1 rounded-full bg-cyan-100 text-cyan-700 text-xs font-semibold uppercase tracking-wider mb-3">Mon parcours</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Expériences</h2>
          </motion.div>
          <div className="space-y-5">
            {data.experience.map((exp, i) => (
              <motion.div
                key={i}
                variants={fadeIn}
                className="relative p-6 rounded-2xl bg-white border border-gray-100 hover:border-emerald-200 hover:shadow-xl transition-all"
              >
                <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">{exp.role}</h3>
                    <p className="text-emerald-600 font-medium">{exp.company}</p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-emerald-50 text-xs font-medium text-emerald-600 border border-emerald-200">{exp.period}</span>
                </div>
                <p className="text-gray-600 leading-relaxed">{exp.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>
      )}

      {/* Projets */}
      {data.projects.length > 0 && (
        <motion.section
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-50px" }}
          transition={{ staggerChildren: 0.1 }}
          className="py-16 px-8 md:px-16 bg-gradient-to-b from-transparent via-teal-50/30 to-transparent rounded-3xl"
        >
          <motion.div variants={fadeIn} className="mb-8">
            <span className="inline-block px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-semibold uppercase tracking-wider mb-3">Réalisations</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Projets</h2>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-6">
            {data.projects.map((project, i) => (
              <motion.div
                key={i}
                variants={fadeIn}
                whileHover={{ y: -6 }}
                className="p-6 rounded-2xl bg-white border border-gray-100 hover:shadow-xl hover:shadow-emerald-100/30 transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white font-bold text-lg mb-4">
                  {i + 1}
                </div>
                <h3 className="text-lg font-bold text-gray-800">{project.name}</h3>
                <p className="text-gray-600 mt-2 text-sm">{project.description}</p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {project.technologies.map((tech, j) => (
                    <span key={j} className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-600">
                      {tech}
                    </span>
                  ))}
                </div>
                {project.link && (
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="inline-block mt-4 text-sm text-emerald-500 font-semibold hover:underline">
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
