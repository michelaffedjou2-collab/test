"use client";

import { motion } from "framer-motion";
import { TemplateId } from "@/types/portfolio";
import { TEMPLATES, TemplateDefinition } from "@/lib/templates";

interface TemplateSelectorProps {
  selected: TemplateId;
  recommended: TemplateId;
  onSelect: (id: TemplateId) => void;
}

function TemplateCard({
  template,
  isSelected,
  isRecommended,
  onSelect,
}: {
  template: TemplateDefinition;
  isSelected: boolean;
  isRecommended: boolean;
  onSelect: () => void;
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      onClick={onSelect}
      className={`relative text-left p-5 rounded-2xl border-2 transition-all ${
        isSelected
          ? "border-amber-500 shadow-lg shadow-amber-100 bg-white"
          : "border-gray-200 hover:border-gray-300 bg-white/60"
      }`}
    >
      {isRecommended && (
        <span className="absolute -top-2.5 left-4 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-gradient-to-r from-amber-500 to-orange-400 text-white">
          Recommandé
        </span>
      )}
      <div className="flex items-start gap-3">
        <span className="text-2xl">{template.icon}</span>
        <div>
          <h3 className="font-semibold text-gray-800 text-sm">{template.name}</h3>
          <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{template.description}</p>
        </div>
      </div>
      {isSelected && (
        <motion.div
          layoutId="template-check"
          className="absolute top-3 right-3 w-5 h-5 rounded-full bg-amber-500 flex items-center justify-center"
        >
          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </motion.div>
      )}
    </motion.button>
  );
}

export default function TemplateSelector({
  selected,
  recommended,
  onSelect,
}: TemplateSelectorProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-4xl mx-auto"
    >
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Choisissez votre template</h2>
        <p className="text-sm text-gray-500 mt-1">
          Sélectionnez le style qui correspond le mieux à votre profil
        </p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {TEMPLATES.map((template) => (
          <TemplateCard
            key={template.id}
            template={template}
            isSelected={selected === template.id}
            isRecommended={recommended === template.id}
            onSelect={() => onSelect(template.id)}
          />
        ))}
      </div>
    </motion.div>
  );
}
