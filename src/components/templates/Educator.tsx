"use client";

import { motion } from "framer-motion";
import { PortfolioData } from "@/types/portfolio";

const fadeIn = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
};

export default function Educator({ data }: { data: PortfolioData }) {
  const initials = data.fullName.split(" ").map((n) => n[0]).join("").slice(0, 2);

  return (
    <div className="space-y-0">
      {/* Scholarly Hero */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative min-h-[70vh] flex items-center rounded-3xl overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-violet-950 to-purple-950" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(139,92,246,0.15),transparent_60%)]" />
        <div className="absolute top-20 left-20 w-[400px] h-[400px] rounded-full bg-indigo-500/8 blur-[100px]" />
        <div className="absolute bottom-20 right-20 w-[300px] h-[300px] rounded-full bg-violet-500/10 blur-[80px]" />

        <div className="relative z-10 w-full px-8 md:px-16 py-16">
          <div className="grid md:grid-cols-3 gap-12 items-center">
            <div className="md:col-span-2 space-y-6">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-500/15 border border-violet-500/20"
              >
                <span className="text-xs text-violet-300 font-medium tracking-wider uppercase">Enseignant & Formateur</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-[1.1]"
                style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
              >
                {data.fullName}
              </motion.h1>

              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "4rem" }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="h-1 bg-gradient-to-r from-violet-400 to-indigo-400 rounded-full"
              />

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-xl md:text-2xl text-violet-300 font-light italic"
              >
                {data.professionalTitle}
              </motion.p>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="text-indigo-200/70 text-lg leading-relaxed max-w-xl"
              >
                {data.bio}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="flex flex-wrap gap-3 pt-2"
              >
                {data.contact.email && (
                  <a href={`mailto:${data.contact.email}`} className="px-6 py-3 rounded-2xl bg-violet-500 text-white font-semibold text-sm hover:bg-violet-400 transition-colors shadow-lg shadow-violet-500/25">
                    Me contacter
                  </a>
                )}
                {data.contact.linkedin && (
                  <a href={data.contact.linkedin} target="_blank" rel="noopener noreferrer" className="px-6 py-3 rounded-2xl bg-white/5 border border-white/10 text-white font-medium text-sm hover:bg-white/10 transition-all backdrop-blur-sm">
                    LinkedIn
                  </a>
                )}
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, type: "spring" }}
              className="hidden md:flex justify-center"
            >
              <div className="relative">
                <div className="w-44 h-44 rounded-3xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-5xl font-bold text-white shadow-2xl shadow-violet-500/30 border border-violet-400/20"
                  style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
                >
                  {initials}
                </div>
                <div className="absolute -top-3 -left-3 w-44 h-44 rounded-3xl border border-violet-400/15 rotate-6" />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Formation académique — en premier */}
      {data.education.length > 0 && (
        <motion.section
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-50px" }}
          transition={{ staggerChildren: 0.12 }}
          className="py-16 px-8 md:px-16"
        >
          <motion.div variants={fadeIn} className="mb-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center">
                <span className="text-violet-600 text-lg">🎓</span>
              </div>
              <div>
                <span className="text-sm uppercase tracking-[0.2em] text-violet-500 font-semibold">Académique</span>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Formation</h2>
              </div>
            </div>
          </motion.div>
          <div className="space-y-5">
            {data.education.map((edu, i) => (
              <motion.div
                key={i}
                variants={fadeIn}
                className="grid md:grid-cols-4 gap-6 p-6 rounded-2xl bg-gradient-to-r from-violet-50/80 to-indigo-50/40 border border-violet-100 hover:shadow-lg transition-all"
              >
                <div className="md:col-span-1">
                  <span className="text-sm font-medium text-violet-500">{edu.period}</span>
                </div>
                <div className="md:col-span-3">
                  <h3 className="text-lg font-bold text-gray-800" style={{ fontFamily: "'Georgia', serif" }}>{edu.degree}</h3>
                  <p className="text-violet-600 font-medium">{edu.institution}</p>
                  {edu.description && <p className="text-gray-600 mt-2">{edu.description}</p>}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      )}

      {/* Domaines d'expertise */}
      {data.skills.length > 0 && (
        <motion.section
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-50px" }}
          transition={{ staggerChildren: 0.05 }}
          className="py-16 px-8 md:px-16 bg-gradient-to-b from-transparent via-violet-50/40 to-transparent rounded-3xl"
        >
          <motion.div variants={fadeIn} className="mb-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center">
                <span className="text-indigo-600 text-lg">📚</span>
              </div>
              <div>
                <span className="text-sm uppercase tracking-[0.2em] text-violet-500 font-semibold">Savoir-faire</span>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Domaines d&apos;Expertise</h2>
              </div>
            </div>
          </motion.div>
          <div className="flex flex-wrap gap-3">
            {data.skills.map((skill, i) => (
              <motion.span
                key={i}
                variants={fadeIn}
                whileHover={{ scale: 1.08, y: -2 }}
                className="px-5 py-2.5 rounded-xl text-sm font-medium bg-white text-violet-700 border border-violet-200 hover:border-violet-400 hover:bg-violet-50 hover:shadow-md transition-all cursor-default"
                style={{ fontFamily: "'Georgia', serif" }}
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.section>
      )}

      {/* Expérience professionnelle */}
      {data.experience.length > 0 && (
        <motion.section
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-50px" }}
          transition={{ staggerChildren: 0.15 }}
          className="py-16 px-8 md:px-16"
        >
          <motion.div variants={fadeIn} className="mb-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center">
                <span className="text-violet-600 text-lg">💼</span>
              </div>
              <div>
                <span className="text-sm uppercase tracking-[0.2em] text-violet-500 font-semibold">Parcours</span>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Expérience</h2>
              </div>
            </div>
          </motion.div>
          <div className="space-y-6">
            {data.experience.map((exp, i) => (
              <motion.div
                key={i}
                variants={fadeIn}
                className="p-6 rounded-2xl bg-white border border-gray-100 hover:border-violet-200 hover:shadow-xl transition-all"
              >
                <div className="flex flex-wrap justify-between items-start gap-3">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800" style={{ fontFamily: "'Georgia', serif" }}>{exp.role}</h3>
                    <p className="text-violet-600 font-medium">{exp.company}</p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-violet-50 text-xs font-medium text-violet-600 border border-violet-200">{exp.period}</span>
                </div>
                <p className="text-gray-600 mt-4 leading-relaxed">{exp.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>
      )}

      {/* Projets pédagogiques */}
      {data.projects.length > 0 && (
        <motion.section
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-50px" }}
          transition={{ staggerChildren: 0.1 }}
          className="py-16 px-8 md:px-16 bg-gradient-to-b from-transparent via-indigo-50/30 to-transparent rounded-3xl"
        >
          <motion.div variants={fadeIn} className="mb-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center">
                <span className="text-indigo-600 text-lg">🔬</span>
              </div>
              <div>
                <span className="text-sm uppercase tracking-[0.2em] text-violet-500 font-semibold">Réalisations</span>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Projets</h2>
              </div>
            </div>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-6">
            {data.projects.map((project, i) => (
              <motion.div
                key={i}
                variants={fadeIn}
                whileHover={{ y: -4 }}
                className="p-6 rounded-2xl bg-white border border-gray-100 hover:shadow-xl hover:shadow-violet-100/30 transition-all"
              >
                <h3 className="text-lg font-bold text-gray-800" style={{ fontFamily: "'Georgia', serif" }}>{project.name}</h3>
                <p className="text-gray-600 mt-2">{project.description}</p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {project.technologies.map((tech, j) => (
                    <span key={j} className="px-3 py-1 rounded-full text-xs font-medium bg-violet-50 text-violet-600 border border-violet-200">
                      {tech}
                    </span>
                  ))}
                </div>
                {project.link && (
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="inline-block mt-4 text-sm text-violet-500 font-semibold hover:underline">
                    Voir le projet &rarr;
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
