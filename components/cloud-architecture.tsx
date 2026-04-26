'use client'

import { motion } from 'framer-motion'
import { Server, LayoutTemplate, Database, Cloud, Lock } from 'lucide-react'

const architectureCards = [
  {
    title: 'IaaS (Infrastructure as a Service)',
    icon: Server,
    description: 'Raw compute power hosted on virtualized instances to run heavy AI threat-detection algorithms in isolated environments.'
  },
  {
    title: 'PaaS (Platform as a Service)',
    icon: LayoutTemplate,
    description: 'Deployed on managed edge networks, providing a seamless, globally distributed frontend without the headache of server maintenance.'
  },
  {
    title: 'DBaaS (Database as a Service)',
    icon: Database,
    description: 'Fully managed, serverless PostgreSQL clusters handling millions of threat logs with high availability and automated backups.'
  },
  {
    title: 'Storage as a Service',
    icon: Cloud,
    description: 'Secure, scalable cloud buckets designed to temporarily quarantine and process suspicious user-uploaded files and scripts.'
  },
  {
    title: 'Security as a Service',
    icon: Lock,
    description: 'Zero-trust authentication flows and encrypted session management offloaded to enterprise-grade identity providers.'
  }
]

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: 'easeOut'
    }
  })
}

export function CloudArchitecture() {
  return (
    <section className="w-full bg-black/[0.96] py-24 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 via-transparent to-purple-500/5 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-8 md:px-12 relative z-10">
        {/* Section heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 mb-4">
            Powered by Enterprise Cloud Infrastructure
          </h2>
          <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
            Leveraging cutting-edge cloud services to deliver unparalleled threat intelligence and security insights.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {architectureCards.map((card, i) => {
            const Icon = card.icon
            return (
              <motion.div
                key={i}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={cardVariants}
                className="group relative"
              >
                {/* Card background with glassmorphism */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/5 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="relative h-full p-6 rounded-lg border border-white/10 bg-white/[0.02] backdrop-blur-md hover:bg-white/[0.05] hover:border-blue-500/30 transition-all duration-300">
                  {/* Icon */}
                  <div className="mb-4 inline-flex p-3 rounded-lg bg-blue-500/20 group-hover:bg-blue-500/30 transition-colors">
                    <Icon className="w-6 h-6 text-blue-400" />
                  </div>

                  {/* Title */}
                  <h3 className="text-white font-semibold mb-2 text-sm leading-tight">
                    {card.title}
                  </h3>

                  {/* Description */}
                  <p className="text-neutral-400 text-xs leading-relaxed">
                    {card.description}
                  </p>

                  {/* Hover glow effect */}
                  <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" style={{
                    boxShadow: 'inset 0 0 20px rgba(59, 130, 246, 0.1)'
                  }} />
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
