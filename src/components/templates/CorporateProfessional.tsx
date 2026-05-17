"use client";

import { motion } from "framer-motion";
import { PortfolioData } from "@/types/portfolio";

const fadeIn = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
};

export default function CorporateProfessional({ data }: { data: PortfolioData }) {
  const initials = data.fullName.split(" ").map((n) => n[0]).join("").slice(0, 2);

  return (
    <div className="space-y-0">
      {/* Elegant Corporate Hero */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative min-h-[65vh] flex items-end rounded-3xl overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-amber-950" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(217,169,78,0.15),transparent_60%)]" />
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/30 to-transparent" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400/50 to-transparent" />

        <div className="relative z-10 w-full px-8 md:px-16 py-16">
          <div className="grid md:grid-cols-3 gap-10 items-end">
            <div className="md:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-block px-4 py-1.5 rounded-full border border-amber-400/30 mb-6"
              >
                <span className="text-xs text-amber-300 font-medium tracking-widest uppercase">
                  Profil Professionnel
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-5xl md:text-7xl font-bold text-white leading-[1.1] tracking-tight"
              >
                {data.fullName}
              </motion.h1>

              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "6rem" }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="h-0.5 bg-gradient-to-r from-amber-400 to-amber-600 mt-6 mb-4"
              />

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="text-xl text-amber-200/80 font-light"
              >
                {data.professionalTitle}
              </motion.p>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="text-slate-300/80 mt-4 max-w-xl leading-relaxed text-lg"
              >
                {data.bio}
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="hidden md:block"
            >
              <div className="w-36 h-36 rounded-2xl bg-gradient-to-br from-amber-600 to-amber-800 flex items-center justify-center text-5xl font-bold text-white shadow-2xl shadow-amber-900/40 border border-amber-500/20">
                {initials}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Contact bar */}
      <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="flex flex-wrap gap-4 py-6 px-8 md:px-16 bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl -mt-1"
      >
        {data.contact.email && (
          <a href={`mailto:${data.contact.email}`} className="flex items-center gap-2 text-sm text-slate-300 hover:text-amber-300 transition-colors">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            {data.contact.email}
          </a>
        )}
        {data.contact.phone && (
          <span className="flex items-center gap-2 text-sm text-slate-300">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            {data.contact.phone}
          </span>
        )}
        {data.contact.linkedin && (
          <a href={data.contact.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-slate-300 hover:text-amber-300 transition-colors">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            LinkedIn
          </a>
        )}
        {data.contact.github && (
          <a href={data.contact.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-slate-300 hover:text-amber-300 transition-colors">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            GitHub
          </a>
        )}
        {data.contact.website && (
          <a href={data.contact.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-slate-300 hover:text-amber-300 transition-colors">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            Site web
          </a>
        )}
        {data.contact.location && (
          <span className="flex items-center gap-2 text-sm text-slate-300">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            {data.contact.location}
          </span>
        )}
      </motion.section>

      {/* Main Content: 2 columns */}
      <div className="grid md:grid-cols-3 gap-10 py-16 px-8 md:px-16">
        {/* Left: Experience + Projects */}
        <div className="md:col-span-2 space-y-16">
          {/* Expérience */}
          {data.experience.length > 0 && (
            <motion.section
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-50px" }}
              transition={{ staggerChildren: 0.15 }}
            >
              <motion.div variants={fadeIn} className="flex items-center gap-3 mb-8">
                <div className="w-8 h-0.5 bg-amber-500" />
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Expérience Professionnelle</h2>
              </motion.div>
              <div className="space-y-6">
                {data.experience.map((exp, i) => (
                  <motion.div
                    key={i}
                    variants={fadeIn}
                    className="group p-6 rounded-2xl bg-white border border-gray-100 hover:border-amber-200 hover:shadow-lg transition-all"
                  >
                    <div className="flex flex-wrap justify-between items-start gap-3">
                      <div>
                        <h3 className="text-lg font-bold text-gray-800">{exp.role}</h3>
                        <p className="text-amber-700 font-medium">{exp.company}</p>
                      </div>
                      <span className="px-3 py-1 rounded-full bg-slate-100 text-xs font-medium text-slate-600">{exp.period}</span>
                    </div>
                    <p className="text-gray-600 mt-3 leading-relaxed">{exp.description}</p>
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
            >
              <motion.div variants={fadeIn} className="flex items-center gap-3 mb-8">
                <div className="w-8 h-0.5 bg-amber-500" />
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Projets</h2>
              </motion.div>
              <div className="grid gap-6">
                {data.projects.map((project, i) => (
                  <motion.div
                    key={i}
                    variants={fadeIn}
                    className="p-6 rounded-2xl bg-gradient-to-r from-slate-50 to-white border border-gray-100 hover:shadow-lg transition-all"
                  >
                    <h3 className="text-lg font-bold text-gray-800">{project.name}</h3>
                    <p className="text-gray-600 mt-2">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {project.technologies.map((tech, j) => (
                        <span key={j} className="px-3 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200">
                          {tech}
                        </span>
                      ))}
                    </div>
                    {project.link && (
                      <a href={project.link} target="_blank" rel="noopener noreferrer" className="inline-block mt-3 text-sm text-amber-600 font-medium hover:underline">
                        Voir le projet &rarr;
                      </a>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}
        </div>

        {/* Right sidebar */}
        <div className="space-y-8">
          {/* Compétences */}
          {data.skills.length > 0 && (
            <motion.section
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-50px" }}
              transition={{ staggerChildren: 0.04 }}
            >
              <motion.div variants={fadeIn} className="flex items-center gap-3 mb-5">
                <div className="w-6 h-0.5 bg-amber-500" />
                <h2 className="text-lg font-bold text-gray-800">Compétences</h2>
              </motion.div>
              <div className="space-y-2">
                {data.skills.map((skill, i) => (
                  <motion.div
                    key={i}
                    variants={fadeIn}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-amber-50/50 transition-colors group"
                  >
                    <span className="w-2 h-2 rounded-sm bg-amber-400 group-hover:bg-amber-500 transition-colors" />
                    <span className="text-sm text-gray-700 font-medium">{skill}</span>
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
            >
              <motion.div variants={fadeIn} className="flex items-center gap-3 mb-5">
                <div className="w-6 h-0.5 bg-amber-500" />
                <h2 className="text-lg font-bold text-gray-800">Formation</h2>
              </motion.div>
              <div className="space-y-4">
                {data.education.map((edu, i) => (
                  <motion.div
                    key={i}
                    variants={fadeIn}
                    className="p-4 rounded-xl bg-gradient-to-br from-amber-50/80 to-orange-50/30 border border-amber-100"
                  >
                    <h3 className="font-bold text-gray-800 text-sm">{edu.degree}</h3>
                    <p className="text-amber-700 text-sm">{edu.institution}</p>
                    <p className="text-xs text-gray-400 mt-1">{edu.period}</p>
                    {edu.description && <p className="text-sm text-gray-600 mt-2">{edu.description}</p>}
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}
        </div>
      </div>
    </div>
  );
}
