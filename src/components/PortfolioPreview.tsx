"use client";

import { motion } from "framer-motion";
import { PortfolioData } from "@/types/portfolio";
import ModernDeveloper from "@/components/templates/ModernDeveloper";
import CreativeDesigner from "@/components/templates/CreativeDesigner";
import CorporateProfessional from "@/components/templates/CorporateProfessional";
import StudentJunior from "@/components/templates/StudentJunior";
import Freelancer from "@/components/templates/Freelancer";
import Educator from "@/components/templates/Educator";

interface PortfolioPreviewProps {
  data: PortfolioData;
  onShare: () => void;
}

function DefaultTemplate({ data }: { data: PortfolioData }) {
  const { primary, secondary, accent } = data.colorTheme;

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
  };

  return (
    <div className="space-y-8">
      {/* Header */}
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
            style={{ background: `linear-gradient(135deg, ${primary}, ${secondary})` }}
          >
            {data.fullName.split(" ").map((n) => n[0]).join("").slice(0, 2)}
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
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
            <span className="w-8 h-0.5 rounded-full" style={{ background: `linear-gradient(90deg, ${primary}, ${secondary})` }} />
            Compétences
          </h2>
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
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
            <span className="w-8 h-0.5 rounded-full" style={{ background: `linear-gradient(90deg, ${primary}, ${secondary})` }} />
            Expérience
          </h2>
          <div className="space-y-6">
            {data.experience.map((exp, i) => (
              <motion.div key={i} variants={fadeInUp} className="relative pl-6 border-l-2" style={{ borderColor: `${primary}40` }}>
                <div className="absolute left-[-5px] top-1 w-2 h-2 rounded-full" style={{ background: primary }} />
                <h3 className="text-lg font-semibold text-gray-800">{exp.role}</h3>
                <p className="text-sm font-medium" style={{ color: accent }}>{exp.company}</p>
                <p className="text-xs text-gray-400 mt-0.5">{exp.period}</p>
                <p className="text-gray-600 mt-2 text-sm leading-relaxed">{exp.description}</p>
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
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
            <span className="w-8 h-0.5 rounded-full" style={{ background: `linear-gradient(90deg, ${primary}, ${secondary})` }} />
            Formation
          </h2>
          <div className="space-y-4">
            {data.education.map((edu, i) => (
              <motion.div key={i} variants={fadeInUp} className="rounded-xl p-4" style={{ background: `linear-gradient(135deg, ${primary}08, ${secondary}08)`, border: `1px solid ${primary}15` }}>
                <h3 className="text-lg font-semibold text-gray-800">{edu.degree}</h3>
                <p className="text-sm" style={{ color: accent }}>{edu.institution}</p>
                <p className="text-xs text-gray-400 mt-0.5">{edu.period}</p>
                {edu.description && <p className="text-gray-600 mt-2 text-sm">{edu.description}</p>}
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
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
            <span className="w-8 h-0.5 rounded-full" style={{ background: `linear-gradient(90deg, ${primary}, ${secondary})` }} />
            Projets
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {data.projects.map((project, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="rounded-xl p-5 transition-all hover:scale-[1.02]"
                style={{ background: `linear-gradient(135deg, ${primary}10, ${secondary}10)`, border: `1px solid ${primary}20` }}
              >
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{project.name}</h3>
                <p className="text-gray-600 text-sm mb-3">{project.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {project.technologies.map((tech, j) => (
                    <span key={j} className="px-2 py-0.5 rounded-md text-xs" style={{ background: `${accent}20`, color: accent }}>
                      {tech}
                    </span>
                  ))}
                </div>
                {project.link && (
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="inline-block mt-3 text-sm hover:underline" style={{ color: primary }}>
                    Voir le projet &rarr;
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
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
          <span className="w-8 h-0.5 rounded-full" style={{ background: `linear-gradient(90deg, ${primary}, ${secondary})` }} />
          Contact
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {data.contact.email && (
            <motion.a variants={fadeInUp} href={`mailto:${data.contact.email}`} className="flex items-center gap-3 rounded-xl p-4 transition-all hover:scale-[1.02]" style={{ background: `${primary}10`, border: `1px solid ${primary}20` }}>
              <span className="text-xl">📧</span>
              <span className="text-sm text-gray-600">{data.contact.email}</span>
            </motion.a>
          )}
          {data.contact.phone && (
            <motion.a variants={fadeInUp} href={`tel:${data.contact.phone}`} className="flex items-center gap-3 rounded-xl p-4 transition-all hover:scale-[1.02]" style={{ background: `${primary}10`, border: `1px solid ${primary}20` }}>
              <span className="text-xl">📱</span>
              <span className="text-sm text-gray-600">{data.contact.phone}</span>
            </motion.a>
          )}
          {data.contact.linkedin && (
            <motion.a variants={fadeInUp} href={data.contact.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 rounded-xl p-4 transition-all hover:scale-[1.02]" style={{ background: `${primary}10`, border: `1px solid ${primary}20` }}>
              <span className="text-xl">💼</span>
              <span className="text-sm text-gray-600">LinkedIn</span>
            </motion.a>
          )}
          {data.contact.github && (
            <motion.a variants={fadeInUp} href={data.contact.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 rounded-xl p-4 transition-all hover:scale-[1.02]" style={{ background: `${primary}10`, border: `1px solid ${primary}20` }}>
              <span className="text-xl">🐙</span>
              <span className="text-sm text-gray-600">GitHub</span>
            </motion.a>
          )}
          {data.contact.location && (
            <motion.div variants={fadeInUp} className="flex items-center gap-3 rounded-xl p-4" style={{ background: `${primary}10`, border: `1px solid ${primary}20` }}>
              <span className="text-xl">📍</span>
              <span className="text-sm text-gray-600">{data.contact.location}</span>
            </motion.div>
          )}
          {data.contact.website && (
            <motion.a variants={fadeInUp} href={data.contact.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 rounded-xl p-4 transition-all hover:scale-[1.02]" style={{ background: `${primary}10`, border: `1px solid ${primary}20` }}>
              <span className="text-xl">🌐</span>
              <span className="text-sm text-gray-600">Website</span>
            </motion.a>
          )}
        </div>
      </motion.section>
    </div>
  );
}

function ContactSection({ data }: { data: PortfolioData }) {
  const { primary } = data.colorTheme;
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="glass rounded-2xl p-6"
    >
      <h2 className="text-lg font-bold text-gray-800 mb-4">Contact</h2>
      <div className="grid sm:grid-cols-2 gap-3">
        {data.contact.email && (
          <a href={`mailto:${data.contact.email}`} className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800 p-3 rounded-xl" style={{ background: `${primary}08` }}>
            <span>📧</span> {data.contact.email}
          </a>
        )}
        {data.contact.phone && (
          <a href={`tel:${data.contact.phone}`} className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800 p-3 rounded-xl" style={{ background: `${primary}08` }}>
            <span>📱</span> {data.contact.phone}
          </a>
        )}
        {data.contact.linkedin && (
          <a href={data.contact.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800 p-3 rounded-xl" style={{ background: `${primary}08` }}>
            <span>💼</span> LinkedIn
          </a>
        )}
        {data.contact.github && (
          <a href={data.contact.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800 p-3 rounded-xl" style={{ background: `${primary}08` }}>
            <span>🐙</span> GitHub
          </a>
        )}
        {data.contact.location && (
          <div className="flex items-center gap-2 text-sm text-gray-600 p-3 rounded-xl" style={{ background: `${primary}08` }}>
            <span>📍</span> {data.contact.location}
          </div>
        )}
        {data.contact.website && (
          <a href={data.contact.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800 p-3 rounded-xl" style={{ background: `${primary}08` }}>
            <span>🌐</span> Website
          </a>
        )}
      </div>
    </motion.section>
  );
}

function renderTemplate(data: PortfolioData) {
  const template = data.template || "modern-developer";
  switch (template) {
    case "modern-developer":
      return <ModernDeveloper data={data} />;
    case "creative-designer":
      return <CreativeDesigner data={data} />;
    case "corporate-professional":
      return <CorporateProfessional data={data} />;
    case "student-junior":
      return <StudentJunior data={data} />;
    case "freelancer":
      return <Freelancer data={data} />;
    case "educator":
      return <Educator data={data} />;
    default:
      return <DefaultTemplate data={data} />;
  }
}

export default function PortfolioPreview({ data, onShare }: PortfolioPreviewProps) {
  const hasContact = data.contact.email || data.contact.phone || data.contact.linkedin || data.contact.github || data.contact.location || data.contact.website;
  const template = data.template || "modern-developer";
  const showContactSeparately = template !== "corporate-professional";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="w-full max-w-5xl mx-auto space-y-6 pb-20"
    >
      {renderTemplate(data)}

      {hasContact && showContactSeparately && <ContactSection data={data} />}

      {/* Share + AI badge */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="flex flex-col items-center gap-4 pt-4"
      >
        <button
          onClick={onShare}
          className="px-8 py-3 rounded-xl text-white font-medium transition-all hover:scale-105 shadow-lg"
          style={{
            background: `linear-gradient(135deg, ${data.colorTheme.primary}, ${data.colorTheme.secondary})`,
          }}
        >
          Partager le Portfolio
        </button>
        {!data.aiGenerated && (
          <p className="text-xs text-amber-600 bg-amber-50 px-3 py-1 rounded-full">
            Portfolio standard — l&apos;IA n&apos;était pas disponible
          </p>
        )}
      </motion.div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="text-center py-8 text-sm text-gray-500"
      >
        Généré par CV2Portfolio AI &bull; Créé par Michel AFFEDJOU
      </motion.footer>
    </motion.div>
  );
}
