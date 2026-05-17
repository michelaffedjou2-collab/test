"use client";

import { motion } from "framer-motion";
import { PortfolioData } from "@/types/portfolio";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

export default function CreativeDesigner({ data }: { data: PortfolioData }) {
  const { primary, secondary, accent } = data.colorTheme;

  return (
    <div className="space-y-6">
      {/* Bold creative header */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative rounded-3xl overflow-hidden p-10 md:p-14 text-center"
        style={{
          background: `linear-gradient(135deg, ${primary}, ${secondary}, ${accent})`,
        }}
      >
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 150, delay: 0.2 }}
            className="w-28 h-28 rounded-3xl mx-auto mb-6 bg-white/20 backdrop-blur-sm flex items-center justify-center text-4xl font-bold text-white border border-white/30 rotate-3"
          >
            {data.fullName.split(" ").map((n) => n[0]).join("").slice(0, 2)}
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-6xl font-black text-white mb-3 tracking-tight"
          >
            {data.fullName}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-xl text-white/80 font-light italic"
          >
            {data.professionalTitle}
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-white/70 mt-4 max-w-xl mx-auto leading-relaxed"
          >
            {data.bio}
          </motion.p>
        </div>
      </motion.section>

      {/* Skills as colorful pills */}
      {data.skills.length > 0 && (
        <motion.section
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.04 }}
          className="rounded-2xl p-6 bg-white/80 backdrop-blur border border-gray-100"
        >
          <h2 className="text-xl font-black text-gray-800 mb-4">
            Talents & Compétences
          </h2>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill, i) => (
              <motion.span
                key={i}
                variants={fadeIn}
                className="px-4 py-2 rounded-full text-sm font-semibold text-white shadow-sm hover:scale-105 transition-transform"
                style={{
                  background: `linear-gradient(135deg, ${primary}, ${i % 2 === 0 ? secondary : accent})`,
                }}
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.section>
      )}

      {/* Experience — bold cards */}
      {data.experience.length > 0 && (
        <motion.section
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.1 }}
          className="space-y-4"
        >
          <h2 className="text-xl font-black text-gray-800 px-2">Parcours</h2>
          {data.experience.map((exp, i) => (
            <motion.div
              key={i}
              variants={fadeIn}
              className="rounded-2xl p-6 bg-white/80 backdrop-blur border border-gray-100 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start gap-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg flex-shrink-0"
                  style={{ background: `linear-gradient(135deg, ${primary}, ${secondary})` }}
                >
                  {exp.company[0]}
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 text-lg">{exp.role}</h3>
                  <p className="text-sm font-medium" style={{ color: primary }}>
                    {exp.company}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">{exp.period}</p>
                  <p className="text-sm text-gray-600 mt-2">{exp.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.section>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <motion.section
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.1 }}
          className="rounded-2xl p-6 bg-white/80 backdrop-blur border border-gray-100"
        >
          <h2 className="text-xl font-black text-gray-800 mb-4">Formation</h2>
          <div className="space-y-3">
            {data.education.map((edu, i) => (
              <motion.div
                key={i}
                variants={fadeIn}
                className="p-4 rounded-xl"
                style={{ background: `${primary}10`, border: `1px solid ${primary}25` }}
              >
                <h3 className="font-semibold text-gray-800">{edu.degree}</h3>
                <p className="text-sm" style={{ color: primary }}>{edu.institution}</p>
                <p className="text-xs text-gray-400 mt-0.5">{edu.period}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>
      )}

      {/* Projects — gallery style */}
      {data.projects.length > 0 && (
        <motion.section
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.1 }}
        >
          <h2 className="text-xl font-black text-gray-800 mb-4 px-2">Réalisations</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {data.projects.map((project, i) => (
              <motion.div
                key={i}
                variants={fadeIn}
                className="rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <div
                  className="h-3"
                  style={{ background: `linear-gradient(90deg, ${primary}, ${secondary}, ${accent})` }}
                />
                <div className="p-5 bg-white/80 backdrop-blur">
                  <h3 className="font-bold text-gray-800 mb-1">{project.name}</h3>
                  <p className="text-sm text-gray-600 mb-3">{project.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.map((tech, j) => (
                      <span
                        key={j}
                        className="px-2 py-0.5 rounded-full text-xs font-medium"
                        style={{ background: `${accent}20`, color: accent }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  {project.link && (
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="inline-block mt-2 text-sm hover:underline" style={{ color: primary }}>
                      Découvrir &rarr;
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      )}
    </div>
  );
}
