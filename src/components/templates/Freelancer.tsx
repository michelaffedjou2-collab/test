"use client";

import { motion } from "framer-motion";
import { PortfolioData } from "@/types/portfolio";

const fadeIn = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
};

export default function Freelancer({ data }: { data: PortfolioData }) {
  return (
    <div className="space-y-0">
      {/* Warm Powerful Hero */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative min-h-[75vh] flex items-center rounded-3xl overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-orange-950 via-amber-950 to-yellow-950" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-orange-500/15 blur-[130px]" />
        <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] rounded-full bg-amber-400/10 blur-[100px]" />
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 via-amber-400 to-yellow-500" />

        <div className="relative z-10 w-full px-8 md:px-16 py-20">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-3 mb-8"
          >
            <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/15 border border-green-500/20">
              <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
              <span className="text-sm text-green-300 font-semibold">Disponible pour des missions</span>
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-5xl md:text-8xl font-black text-white tracking-tight leading-[1]"
          >
            {data.fullName}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-6"
          >
            <p className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-orange-300 via-amber-300 to-yellow-300 bg-clip-text text-transparent">
              {data.professionalTitle}
            </p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-orange-100/70 text-lg mt-6 max-w-2xl leading-relaxed"
          >
            {data.bio}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="flex flex-wrap gap-4 mt-10"
          >
            {data.contact.email && (
              <a href={`mailto:${data.contact.email}`} className="px-7 py-3.5 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold text-sm hover:shadow-lg hover:shadow-orange-500/30 transition-all">
                Discutons de votre projet
              </a>
            )}
            {data.contact.linkedin && (
              <a href={data.contact.linkedin} target="_blank" rel="noopener noreferrer" className="px-7 py-3.5 rounded-2xl bg-white/5 border border-white/15 text-white font-medium text-sm hover:bg-white/10 transition-all backdrop-blur-sm">
                Mon profil LinkedIn
              </a>
            )}
            {data.contact.website && (
              <a href={data.contact.website} target="_blank" rel="noopener noreferrer" className="px-7 py-3.5 rounded-2xl bg-white/5 border border-white/15 text-white font-medium text-sm hover:bg-white/10 transition-all backdrop-blur-sm">
                Site web
              </a>
            )}
          </motion.div>
        </div>
      </motion.section>

      {/* Statistiques rapides */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 py-10 px-8 md:px-16 -mt-2"
      >
        <div className="p-5 rounded-2xl bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-100 text-center">
          <p className="text-3xl font-black text-orange-600">{data.experience.length}</p>
          <p className="text-sm text-gray-500 mt-1">Missions</p>
        </div>
        <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-50 to-yellow-50 border border-amber-100 text-center">
          <p className="text-3xl font-black text-amber-600">{data.projects.length}</p>
          <p className="text-sm text-gray-500 mt-1">Projets</p>
        </div>
        <div className="p-5 rounded-2xl bg-gradient-to-br from-yellow-50 to-orange-50 border border-yellow-100 text-center">
          <p className="text-3xl font-black text-yellow-600">{data.skills.length}</p>
          <p className="text-sm text-gray-500 mt-1">Compétences</p>
        </div>
        <div className="p-5 rounded-2xl bg-gradient-to-br from-orange-50 to-red-50 border border-orange-100 text-center">
          <p className="text-3xl font-black text-orange-600">{data.education.length}</p>
          <p className="text-sm text-gray-500 mt-1">Diplômes</p>
        </div>
      </motion.section>

      {/* Services / Compétences */}
      {data.skills.length > 0 && (
        <motion.section
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-50px" }}
          transition={{ staggerChildren: 0.06 }}
          className="py-16 px-8 md:px-16 bg-gradient-to-b from-transparent via-orange-50/40 to-transparent rounded-3xl"
        >
          <motion.div variants={fadeIn} className="mb-10 text-center">
            <span className="text-sm uppercase tracking-[0.3em] text-orange-500 font-semibold">Expertise</span>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mt-2">Mes Compétences</h2>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {data.skills.map((skill, i) => (
              <motion.div
                key={i}
                variants={fadeIn}
                whileHover={{ y: -4, scale: 1.02 }}
                className="p-5 rounded-2xl bg-white border border-gray-100 hover:border-orange-200 hover:shadow-lg hover:shadow-orange-100/50 transition-all text-center"
              >
                <span className="text-sm font-semibold text-gray-700">{skill}</span>
              </motion.div>
            ))}
          </div>
        </motion.section>
      )}

      {/* Missions / Expériences */}
      {data.experience.length > 0 && (
        <motion.section
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-50px" }}
          transition={{ staggerChildren: 0.15 }}
          className="py-16 px-8 md:px-16"
        >
          <motion.div variants={fadeIn} className="mb-10">
            <span className="text-sm uppercase tracking-[0.3em] text-orange-500 font-semibold">Parcours</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mt-2">Missions & Expériences</h2>
          </motion.div>
          <div className="space-y-6">
            {data.experience.map((exp, i) => (
              <motion.div
                key={i}
                variants={fadeIn}
                className="group relative grid md:grid-cols-12 gap-6 p-6 rounded-2xl bg-white border border-gray-100 hover:border-orange-200 hover:shadow-xl transition-all"
              >
                <div className="md:col-span-3 flex md:flex-col gap-2">
                  <span className="px-3 py-1 rounded-full bg-orange-50 text-xs font-semibold text-orange-600 border border-orange-200 self-start">{exp.period}</span>
                </div>
                <div className="md:col-span-9">
                  <h3 className="text-xl font-bold text-gray-800">{exp.role}</h3>
                  <p className="text-orange-600 font-medium">{exp.company}</p>
                  <p className="text-gray-600 mt-3 leading-relaxed">{exp.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      )}

      {/* Projets réalisés */}
      {data.projects.length > 0 && (
        <motion.section
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-50px" }}
          transition={{ staggerChildren: 0.1 }}
          className="py-16 px-8 md:px-16 bg-gradient-to-b from-transparent via-amber-50/30 to-transparent rounded-3xl"
        >
          <motion.div variants={fadeIn} className="mb-10">
            <span className="text-sm uppercase tracking-[0.3em] text-orange-500 font-semibold">Portfolio</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mt-2">Projets Réalisés</h2>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-6">
            {data.projects.map((project, i) => (
              <motion.div
                key={i}
                variants={fadeIn}
                whileHover={{ y: -6 }}
                className="relative p-8 rounded-3xl bg-white border border-gray-100 hover:shadow-2xl hover:shadow-orange-100/30 transition-all overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-orange-100/60 to-transparent rounded-bl-3xl" />
                <h3 className="text-xl font-bold text-gray-800">{project.name}</h3>
                <p className="text-gray-600 mt-3">{project.description}</p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {project.technologies.map((tech, j) => (
                    <span key={j} className="px-3 py-1 rounded-full text-xs font-medium bg-orange-50 text-orange-700 border border-orange-200">
                      {tech}
                    </span>
                  ))}
                </div>
                {project.link && (
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="inline-block mt-4 text-sm text-orange-500 font-bold hover:underline">
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
          <motion.div variants={fadeIn} className="mb-8">
            <span className="text-sm uppercase tracking-[0.3em] text-orange-500 font-semibold">Éducation</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mt-2">Formation</h2>
          </motion.div>
          <div className="space-y-4">
            {data.education.map((edu, i) => (
              <motion.div
                key={i}
                variants={fadeIn}
                className="p-6 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50/50 border border-amber-100"
              >
                <h3 className="text-lg font-bold text-gray-800">{edu.degree}</h3>
                <p className="text-orange-600 font-medium">{edu.institution}</p>
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
