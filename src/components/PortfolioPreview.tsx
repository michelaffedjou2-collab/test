"use client";

import { motion } from "framer-motion";
import { PortfolioData } from "@/types/portfolio";

interface PortfolioPreviewProps {
  data: PortfolioData;
  onShare: () => void;
}

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
};

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <motion.h2
      variants={fadeInUp}
      className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3"
    >
      <span
        className="w-8 h-0.5 rounded-full"
        style={{
          background: "linear-gradient(90deg, #b8860b, #d4a855)",
        }}
      />
      {children}
    </motion.h2>
  );
}

export default function PortfolioPreview({
  data,
  onShare,
}: PortfolioPreviewProps) {
  const { primary, secondary, accent } = data.colorTheme;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="w-full max-w-5xl mx-auto space-y-8 pb-20"
    >
      {/* Header / Hero */}
      <motion.section
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="relative rounded-3xl overflow-hidden p-8 md:p-12"
        style={{
          background: `linear-gradient(135deg, ${primary}15, ${secondary}15, ${accent}10)`,
          border: `1px solid ${primary}30`,
        }}
      >
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-20 blur-3xl" style={{ background: primary }} />
        <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full opacity-15 blur-3xl" style={{ background: secondary }} />

        <div className="relative z-10 text-center space-y-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            className="w-24 h-24 rounded-full mx-auto flex items-center justify-center text-3xl font-bold text-white"
            style={{
              background: `linear-gradient(135deg, ${primary}, ${secondary})`,
            }}
          >
            {data.fullName
              .split(" ")
              .map((n) => n[0])
              .join("")
              .slice(0, 2)}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-5xl font-bold text-gray-800"
          >
            {data.fullName}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-lg font-medium"
            style={{ color: accent }}
          >
            {data.professionalTitle}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-gray-600 max-w-2xl mx-auto leading-relaxed"
          >
            {data.bio}
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex justify-center gap-3 pt-4"
          >
            <button
              onClick={onShare}
              className="px-6 py-2.5 rounded-xl text-white font-medium transition-all hover:scale-105"
              style={{
                background: `linear-gradient(135deg, ${primary}, ${secondary})`,
              }}
            >
              Share Portfolio
            </button>
            {data.contact.email && (
              <a
                href={`mailto:${data.contact.email}`}
                className="px-6 py-2.5 rounded-xl text-gray-700 font-medium glass hover:bg-white/30 transition-all"
              >
                Contact Me
              </a>
            )}
          </motion.div>
        </div>
      </motion.section>

      {/* Skills */}
      {data.skills.length > 0 && (
        <motion.section
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.05 }}
          className="glass rounded-2xl p-8"
        >
          <SectionTitle>Skills</SectionTitle>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill, i) => (
              <motion.span
                key={i}
                variants={fadeInUp}
                className="px-4 py-2 rounded-xl text-sm font-medium text-gray-700 transition-all hover:scale-105"
                style={{
                  background: `linear-gradient(135deg, ${primary}20, ${secondary}20)`,
                  border: `1px solid ${primary}30`,
                }}
              >
                {skill}
              </motion.span>
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
          className="glass rounded-2xl p-8"
        >
          <SectionTitle>Experience</SectionTitle>
          <div className="space-y-6">
            {data.experience.map((exp, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="relative pl-6 border-l-2"
                style={{ borderColor: `${primary}40` }}
              >
                <div
                  className="absolute left-[-5px] top-1 w-2 h-2 rounded-full"
                  style={{ background: primary }}
                />
                <h3 className="text-lg font-semibold text-gray-800">
                  {exp.role}
                </h3>
                <p className="text-sm font-medium" style={{ color: accent }}>
                  {exp.company}
                </p>
                <p className="text-xs text-gray-400 mt-0.5">{exp.period}</p>
                <p className="text-gray-600 mt-2 text-sm leading-relaxed">
                  {exp.description}
                </p>
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
          className="glass rounded-2xl p-8"
        >
          <SectionTitle>Education</SectionTitle>
          <div className="space-y-4">
            {data.education.map((edu, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="rounded-xl p-4"
                style={{
                  background: `linear-gradient(135deg, ${primary}08, ${secondary}08)`,
                  border: `1px solid ${primary}15`,
                }}
              >
                <h3 className="text-lg font-semibold text-gray-800">
                  {edu.degree}
                </h3>
                <p className="text-sm" style={{ color: accent }}>
                  {edu.institution}
                </p>
                <p className="text-xs text-gray-400 mt-0.5">{edu.period}</p>
                {edu.description && (
                  <p className="text-gray-600 mt-2 text-sm">
                    {edu.description}
                  </p>
                )}
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
          className="glass rounded-2xl p-8"
        >
          <SectionTitle>Projects</SectionTitle>
          <div className="grid md:grid-cols-2 gap-4">
            {data.projects.map((project, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="rounded-xl p-5 transition-all hover:scale-[1.02]"
                style={{
                  background: `linear-gradient(135deg, ${primary}10, ${secondary}10)`,
                  border: `1px solid ${primary}20`,
                }}
              >
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {project.name}
                </h3>
                <p className="text-gray-600 text-sm mb-3">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {project.technologies.map((tech, j) => (
                    <span
                      key={j}
                      className="px-2 py-0.5 rounded-md text-xs"
                      style={{
                        background: `${accent}20`,
                        color: accent,
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-3 text-sm hover:underline"
                    style={{ color: primary }}
                  >
                    View Project &rarr;
                  </a>
                )}
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
        transition={{ staggerChildren: 0.1 }}
        className="glass rounded-2xl p-8"
      >
        <SectionTitle>Contact</SectionTitle>
        <div className="grid sm:grid-cols-2 gap-4">
          {data.contact.email && (
            <motion.a
              variants={fadeInUp}
              href={`mailto:${data.contact.email}`}
              className="flex items-center gap-3 rounded-xl p-4 transition-all hover:scale-[1.02]"
              style={{
                background: `${primary}10`,
                border: `1px solid ${primary}20`,
              }}
            >
              <span className="text-xl">📧</span>
              <span className="text-sm text-gray-600">{data.contact.email}</span>
            </motion.a>
          )}
          {data.contact.phone && (
            <motion.a
              variants={fadeInUp}
              href={`tel:${data.contact.phone}`}
              className="flex items-center gap-3 rounded-xl p-4 transition-all hover:scale-[1.02]"
              style={{
                background: `${primary}10`,
                border: `1px solid ${primary}20`,
              }}
            >
              <span className="text-xl">📱</span>
              <span className="text-sm text-gray-600">
                {data.contact.phone}
              </span>
            </motion.a>
          )}
          {data.contact.linkedin && (
            <motion.a
              variants={fadeInUp}
              href={data.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-xl p-4 transition-all hover:scale-[1.02]"
              style={{
                background: `${primary}10`,
                border: `1px solid ${primary}20`,
              }}
            >
              <span className="text-xl">💼</span>
              <span className="text-sm text-gray-600">LinkedIn</span>
            </motion.a>
          )}
          {data.contact.github && (
            <motion.a
              variants={fadeInUp}
              href={data.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-xl p-4 transition-all hover:scale-[1.02]"
              style={{
                background: `${primary}10`,
                border: `1px solid ${primary}20`,
              }}
            >
              <span className="text-xl">🐙</span>
              <span className="text-sm text-gray-600">GitHub</span>
            </motion.a>
          )}
          {data.contact.location && (
            <motion.div
              variants={fadeInUp}
              className="flex items-center gap-3 rounded-xl p-4"
              style={{
                background: `${primary}10`,
                border: `1px solid ${primary}20`,
              }}
            >
              <span className="text-xl">📍</span>
              <span className="text-sm text-gray-600">
                {data.contact.location}
              </span>
            </motion.div>
          )}
          {data.contact.website && (
            <motion.a
              variants={fadeInUp}
              href={data.contact.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-xl p-4 transition-all hover:scale-[1.02]"
              style={{
                background: `${primary}10`,
                border: `1px solid ${primary}20`,
              }}
            >
              <span className="text-xl">🌐</span>
              <span className="text-sm text-gray-600">Website</span>
            </motion.a>
          )}
        </div>
      </motion.section>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="text-center py-8 text-sm text-gray-500"
      >
        Generated by CV2Portfolio AI &bull; Created by Michel Affedjou
      </motion.footer>
    </motion.div>
  );
}
