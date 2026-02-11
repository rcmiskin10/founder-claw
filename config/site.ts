import { Lightbulb, TrendingUp, PenTool, Search, Rocket, Radar } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export interface NavItem {
  title: string
  href: string
  external?: boolean
}

export interface FooterLink {
  title: string
  href: string
}

export interface FooterSection {
  title: string
  links: FooterLink[]
}

export interface Feature {
  icon: LucideIcon
  title: string
  description: string
  gradient: string
}

export interface HeroContent {
  badge: string
  headline: string
  headlineHighlight: string
  subheadline: string
  primaryCta: { text: string; href: string }
  secondaryCta: { text: string; href: string }
  socialProof?: { text: string; rating: string }
}

export interface SiteConfig {
  name: string
  tagline: string
  description: string
  url: string
  company: string
  mainNav: NavItem[]
  dashboardNav: NavItem[]
  hero: HeroContent
  features: Feature[]
  techStack: Array<{ name: string; color: string }>
  footerSections: FooterSection[]
  footerCopyright: string
  social: {
    twitter?: string
    github?: string
    discord?: string
  }
}

export const siteConfig: SiteConfig = {
  name: 'FounderClaw',
  tagline: 'Your AI co-founder that lives in your chat app',
  description: 'A managed AI co-founder for indie hackers — idea validation, MRR tracking, and launch tools in Telegram.',
  url: process.env.NEXT_PUBLIC_APP_URL
    || (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : null)
    || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null)
    || 'http://localhost:3000',
  company: 'FounderClaw',

  mainNav: [
    { title: 'Features', href: '/features' },
    { title: 'Pricing', href: '/pricing' },
    { title: 'How It Works', href: '/features#how-it-works' },
    { title: 'FAQ', href: '/pricing#faq' }
  ],

  dashboardNav: [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Interactions', href: '/dashboard/entities' },
    { title: 'Connect Chat', href: '/dashboard/integrations' },
    { title: 'Stripe', href: '/dashboard/stripe' },
    { title: 'Settings', href: '/dashboard/settings' }
  ],

  hero: {
    badge: 'Powered by OpenClaw — Zero DevOps',
    headline: 'Your AI Co-Founder That Lives',
    headlineHighlight: 'In Your Chat App',
    subheadline: 'FounderClaw is a managed AI co-founder built for indie hackers and solo founders. It lives in Telegram, connects to your Stripe, validates your ideas with the IHVF framework, drafts your build-in-public content, roasts your landing page, and sends you daily MRR alerts — all without touching a Docker config.',
    primaryCta: { text: 'Get Started Free', href: '/register' },
    secondaryCta: { text: 'See How It Works', href: '/features' },
    socialProof: { text: 'Trusted by 500+ indie hackers building in public', rating: '4.9/5' },
  },

  features: [
    {
      icon: Lightbulb,
      title: 'IHVF Idea Validation',
      description: 'Run your startup idea through a structured validation framework with scoring, market signals, and honest critique — all in a guided conversation.',
      gradient: 'from-amber-500 to-orange-500',
    },
    {
      icon: TrendingUp,
      title: 'Stripe MRR Alerts',
      description: 'Connect Stripe once and get daily revenue summaries, new customer alerts, and churn notifications pushed directly to your chat — with AI-powered insights.',
      gradient: 'from-emerald-500 to-green-500',
    },
    {
      icon: PenTool,
      title: 'Build-in-Public Drafts',
      description: 'Generate authentic Twitter/X threads, milestone updates, and progress posts based on your actual startup context and recent activity.',
      gradient: 'from-violet-500 to-purple-500',
    },
    {
      icon: Search,
      title: 'Landing Page Roasting',
      description: 'Paste any URL and get instant, actionable feedback on copy, positioning, UX, and conversion — like hiring a $500/hr consultant for free.',
      gradient: 'from-rose-500 to-pink-500',
    },
    {
      icon: Rocket,
      title: 'Launch Kit Generation',
      description: 'Generate a complete Product Hunt launch kit with taglines, descriptions, first comments, maker stories, and a pre-launch checklist in minutes.',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Radar,
      title: 'Competitor Monitoring',
      description: 'Track up to 10 competitors and get alerted when they ship features, change pricing, or launch campaigns — with strategic analysis baked in.',
      gradient: 'from-indigo-500 to-violet-500',
    }
  ],

  techStack: [
    { name: 'Next.js', color: 'bg-black text-white' },
    { name: 'Supabase', color: 'bg-emerald-600 text-white' },
    { name: 'Stripe', color: 'bg-purple-600 text-white' },
    { name: 'OpenClaw', color: 'bg-orange-600 text-white' },
    { name: 'Telegram API', color: 'bg-blue-500 text-white' }
  ],

  footerSections: [
    {
      title: 'Product',
      links: [
        { title: 'Features', href: '/features' },
        { title: 'Pricing', href: '/pricing' },
        { title: 'Changelog', href: '/changelog' },
        { title: 'Integrations', href: '/features#integrations' }
      ],
    },
    {
      title: 'Community',
      links: [
        { title: 'Blog', href: '/blog' },
        { title: 'IHVF Framework', href: '/blog/ihvf-framework' },
        { title: 'Indie Hackers', href: 'https://indiehackers.com' },
        { title: 'Discord', href: 'https://discord.gg/founderclaw' }
      ],
    },
    {
      title: 'Legal',
      links: [
        { title: 'Privacy Policy', href: '/privacy' },
        { title: 'Terms of Service', href: '/terms' },
        { title: 'Security', href: '/security' }
      ],
    }
  ],

  footerCopyright: '2026 FounderClaw. All rights reserved.',

  social: {
    discord: 'https://discord.gg/founderclaw',
    github: 'https://github.com/founderclaw',
    twitter: 'https://twitter.com/founderclaw'
  },
}
