"use client";

import { motion } from "framer-motion";
import { PortfolioData } from "@/types/portfolio";

const fadeIn = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
};

export default function CreativeDesigner({ data }: { data: PortfolioData }) {
  const colors = ["from-pink-500 to-rose-500", "from-violet-500 to-purple-500", "from-fuchsia-500 to-pink-500", "from-amber-500 to-orange-500", "from-cyan-500 to-blue-500"];

  return (
    <div className="space-y-0">
      {/* Bold Hero with rotating gradient */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative min-h-[80vh] flex items-center rounded-3xl overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-950 via-purple-950 to-violet-950" />
        <div className="absolute top-0 left-1/3 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-pink-500/20 to-fuchsia-500/10 blur-[120px] animate-pulse-glow" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-gradient-to-br from-violet-500/15 to-purple-500/5 blur-[100px]" />

        <div className="relative z-10 w-full px-8 md:px-16 py-20">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-3 mb-8"
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-pink-500 to-fuchsia-500 flex items-center justify-center text-white font-bold text-lg rotate-6">
              {data.fullName.charAt(0)}
            </div>
            <span className="text-purple-300 text-sm font-medium">Portfolio Créatif</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-6xl md:text-8xl font-black leading-[0.95] tracking-tight"
          >
            <span className="text-white">{data.fullName.split(" ")[0]}</span>
            {data.fullName.includes(" ") && (
              <>
                <br />
                <span className="bg-gradient-to-r from-pink-400 via-fuchsia-400 to-purple-400 bg-clip-text text-transparent">
                  {data.fullName.split(" ").slice(1).join(" ")}
                </span>
              </>
            )}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-8 max-w-xl"
          >
            <p className="text-2xl text-pink-300 font-medium italic mb-4">{data.professionalTitle}</p>
            <p className="text-purple-200/80 text-lg leading-relaxed">{data.bio}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            {data.contact.email && (
              <a href={`mailto:${data.contact.email}`} className="px-6 py-3 rounded-2xl bg-gradient-to-r from-pink-500 to-fuchsia-500 text-white font-semibold text-sm hover:shadow-lg hover:shadow-pink-500/30 transition-all">
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
      </motion.section>

      {/* Compétences — Bold colorful cards */}
      {data.skills.length > 0 && (
        <motion.section
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-50px" }}
          transition={{ staggerChildren: 0.05 }}
          className="py-16 px-8 md:px-16 bg-gradient-to-b from-purple-50/50 to-transparent rounded-3xl"
        >
          <motion.div variants={fadeIn} className="mb-10">
            <span className="text-sm uppercase tracking-[0.3em] text-purple-400 font-medium">Expertise</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mt-2">Compétences</h2>
          </motion.div>
          <div className="flex flex-wrap gap-3">
            {data.skills.map((skill, i) => (
              <motion.span
                key={i}
                variants={fadeIn}
                whileHover={{ scale: 1.1, rotate: i % 2 === 0 ? 2 : -2 }}
                className={`px-5 py-2.5 rounded-2xl text-sm font-semibold text-white bg-gradient-to-r ${colors[i % colors.length]} shadow-lg cursor-default`}
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.section>
      )}

      {/* Expériences — Magazine layout */}
      {data.experience.length > 0 && (
        <motion.section
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-50px" }}
          transition={{ staggerChildren: 0.15 }}
          className="py-16 px-8 md:px-16"
        >
          <motion.div variants={fadeIn} className="mb-10">
            <span className="text-sm uppercase tracking-[0.3em] text-purple-400 font-medium">Parcours</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mt-2">Expériences</h2>
          </motion.div>
          <div className="space-y-6">
            {data.experience.map((exp, i) => (
              <motion.div
                key={i}
                variants={fadeIn}
                whileHover={{ x: 6 }}
                className={`group p-8 rounded-3xl border-l-4 ${i % 2 === 0 ? "border-l-pink-500 bg-gradient-to-r from-pink-50/60 to-transparent" : "border-l-violet-500 bg-gradient-to-r from-violet-50/60 to-transparent"} hover:shadow-xl transition-all`}
              >
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <h3 className="text-xl font-bold text-gray-800">{exp.role}</h3>
                  <span className="text-sm text-purple-500 font-medium">@ {exp.company}</span>
                </div>
                <p className="text-xs uppercase tracking-widest text-gray-400 mb-3">{exp.period}</p>
                <p className="text-gray-600 leading-relaxed">{exp.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>
      )}

      {/* Projets — Gallery grid */}
      {data.projects.length > 0 && (
        <motion.section
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-50px" }}
          transition={{ staggerChildren: 0.1 }}
          className="py-16 px-8 md:px-16 bg-gradient-to-b from-transparent via-fuchsia-50/30 to-transparent rounded-3xl"
        >
          <motion.div variants={fadeIn} className="mb-10">
            <span className="text-sm uppercase tracking-[0.3em] text-purple-400 font-medium">Réalisations</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mt-2">Projets</h2>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-6">
            {data.projects.map((project, i) => (
              <motion.div
                key={i}
                variants={fadeIn}
                whileHover={{ y: -8 }}
                className="group relative p-8 rounded-3xl bg-white border border-gray-100 overflow-hidden hover:shadow-2xl transition-all"
              >
                <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${colors[i % colors.length]}`} />
                <h3 className="text-xl font-bold text-gray-800 mt-2">{project.name}</h3>
                <p className="text-gray-600 mt-3">{project.description}</p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {project.technologies.map((tech, j) => (
                    <span key={j} className="px-3 py-1 rounded-full text-xs font-medium bg-purple-50 text-purple-600 border border-purple-200">
                      {tech}
                    </span>
                  ))}
                </div>
                {project.link && (
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="inline-block mt-4 text-sm text-pink-500 font-semibold hover:underline">
                    Voir le projet &rarr;
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        </motion.section>
      )}

      {/* Formation */}
      {data.education.length > 0 && (
        <motion.section
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-50px" }}
          transition={{ staggerChildren: 0.1 }}
          className="py-16 px-8 md:px-16"
        >
          <motion.div variants={fadeIn} className="mb-10">
            <span className="text-sm uppercase tracking-[0.3em] text-purple-400 font-medium">Éducation</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mt-2">Formation</h2>
          </motion.div>
          <div className="space-y-4">
            {data.education.map((edu, i) => (
              <motion.div
                key={i}
                variants={fadeIn}
                className="p-6 rounded-2xl bg-gradient-to-br from-purple-50 to-fuchsia-50/50 border border-purple-100"
              >
                <h3 className="text-lg font-bold text-gray-800">{edu.degree}</h3>
                <p className="text-purple-600 font-medium">{edu.institution}</p>
                <p className="text-sm text-gray-400 mt-1">{edu.period}</p>
                {edu.description && <p className="text-gray-600 mt-2">{edu.description}</p>}
              </motion.div>
            ))}
          </div>
        </motion.section>
      )}
    </div>
  );
}
