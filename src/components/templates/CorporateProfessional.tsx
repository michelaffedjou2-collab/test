"use client";

import { motion } from "framer-motion";
import { PortfolioData } from "@/types/portfolio";

const fadeIn = {
  initial: { opacity: 0, y: 15 },
  animate: { opacity: 1, y: 0 },
};

export default function CorporateProfessional({ data }: { data: PortfolioData }) {
  return (
    <div className="space-y-6">
      {/* Elegant header */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="rounded-2xl overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900 p-10 md:p-14"
      >
        <div className="max-w-3xl">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "4rem" }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="h-1 bg-amber-400 mb-8 rounded-full"
          />
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-5xl font-bold text-white mb-3 tracking-tight"
          >
            {data.fullName}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-lg text-amber-300 font-medium"
          >
            {data.professionalTitle}
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-slate-300 mt-4 leading-relaxed max-w-2xl"
          >
            {data.bio}
          </motion.p>
        </div>
      </motion.section>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Main content — 2 cols */}
        <div className="md:col-span-2 space-y-6">
          {/* Experience */}
          {data.experience.length > 0 && (
            <motion.section
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              transition={{ staggerChildren: 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
            >
              <h2 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-6">
                Expérience Professionnelle
              </h2>
              <div className="space-y-6">
                {data.experience.map((exp, i) => (
                  <motion.div key={i} variants={fadeIn}>
                    <div className="flex items-baseline justify-between gap-4 mb-1">
                      <h3 className="font-semibold text-gray-800">{exp.role}</h3>
                      <span className="text-xs text-gray-400 whitespace-nowrap">{exp.period}</span>
                    </div>
                    <p className="text-sm text-slate-600 font-medium mb-1">{exp.company}</p>
                    <p className="text-sm text-gray-500 leading-relaxed">{exp.description}</p>
                    {i < data.experience.length - 1 && (
                      <div className="border-b border-gray-100 mt-5" />
                    )}
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
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
            >
              <h2 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-6">
                Formation
              </h2>
              <div className="space-y-4">
                {data.education.map((edu, i) => (
                  <motion.div key={i} variants={fadeIn}>
                    <h3 className="font-semibold text-gray-800">{edu.degree}</h3>
                    <p className="text-sm text-slate-600">{edu.institution}</p>
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
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
            >
              <h2 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-6">
                Projets Clés
              </h2>
              <div className="space-y-4">
                {data.projects.map((project, i) => (
                  <motion.div key={i} variants={fadeIn}>
                    <h3 className="font-semibold text-gray-800 mb-1">{project.name}</h3>
                    <p className="text-sm text-gray-500 mb-2">{project.description}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies.map((tech, j) => (
                        <span key={j} className="px-2 py-0.5 rounded text-xs bg-slate-100 text-slate-600">
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

        {/* Sidebar — 1 col */}
        <div className="space-y-6">
          {/* Skills */}
          {data.skills.length > 0 && (
            <motion.section
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              transition={{ staggerChildren: 0.03 }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
            >
              <h2 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-4">
                Compétences
              </h2>
              <div className="space-y-2">
                {data.skills.map((skill, i) => (
                  <motion.div key={i} variants={fadeIn} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{skill}</span>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}

          {/* Contact */}
          <motion.section
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            transition={{ staggerChildren: 0.05 }}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
          >
            <h2 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-4">
              Contact
            </h2>
            <div className="space-y-3">
              {data.contact.email && (
                <motion.a variants={fadeIn} href={`mailto:${data.contact.email}`} className="flex items-center gap-2 text-sm text-gray-600 hover:text-slate-800">
                  <span>📧</span> {data.contact.email}
                </motion.a>
              )}
              {data.contact.phone && (
                <motion.a variants={fadeIn} href={`tel:${data.contact.phone}`} className="flex items-center gap-2 text-sm text-gray-600 hover:text-slate-800">
                  <span>📱</span> {data.contact.phone}
                </motion.a>
              )}
              {data.contact.location && (
                <motion.div variants={fadeIn} className="flex items-center gap-2 text-sm text-gray-600">
                  <span>📍</span> {data.contact.location}
                </motion.div>
              )}
              {data.contact.linkedin && (
                <motion.a variants={fadeIn} href={data.contact.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-gray-600 hover:text-slate-800">
                  <span>💼</span> LinkedIn
                </motion.a>
              )}
              {data.contact.github && (
                <motion.a variants={fadeIn} href={data.contact.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-gray-600 hover:text-slate-800">
                  <span>🐙</span> GitHub
                </motion.a>
              )}
              {data.contact.website && (
                <motion.a variants={fadeIn} href={data.contact.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-gray-600 hover:text-slate-800">
                  <span>🌐</span> Website
                </motion.a>
              )}
            </div>
          </motion.section>
        </div>
      </div>
    </div>
  );
}
