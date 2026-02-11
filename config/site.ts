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
  description: 'Managed AI co-founder for indie hackers — idea validation, MRR alerts, and build-in-public content via Telegram.',
  url: process.env.NEXT_PUBLIC_APP_URL
    || (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : null)
    || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null)
    || 'http://localhost:3000',
  company: 'FounderClaw',

  mainNav: [
    { title: 'Features', href: '/features' },
    { title: 'Pricing', href: '/pricing' },
    { title: 'FAQ', href: '/#faq' },
    { title: 'Blog', href: '/blog' }
  ],

  dashboardNav: [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Interactions', href: '/dashboard/entities' },
    { title: 'Stripe Connect', href: '/dashboard/stripe' },
    { title: 'Settings', href: '/dashboard/settings' }
  ],

  hero: {
    badge: 'Powered by OpenClaw — zero DevOps required',
    headline: 'Your AI Co-Founder',
    headlineHighlight: 'Inside Telegram',
    subheadline: 'FounderClaw validates your ideas, tracks your MRR with daily Stripe alerts, drafts your build-in-public content, and roasts your landing pages — all from a single chat conversation. No self-hosting, no Docker configs, no prompt engineering. Just tell it what you\'re building.',
    primaryCta: { text: 'Start Free on Telegram', href: '/register' },
    secondaryCta: { text: 'See How It Works', href: '/features' },
    socialProof: { text: 'Trusted by 1,200+ indie hackers', rating: '4.9/5' },
  },

  features: [
    {
      icon: Lightbulb,
      title: 'IHVF Idea Validation',
      description: 'Structured idea validation using the Idea-Hypothesis-Validation-Feedback framework — get a scored report with clear next steps, not generic ChatGPT advice.',
      gradient: 'from-violet-500 to-purple-500',
    },
    {
      icon: TrendingUp,
      title: 'Stripe MRR Alerts',
      description: 'Connect Stripe in one click and get proactive daily MRR updates, churn notifications, and revenue milestone celebrations pushed directly to your chat.',
      gradient: 'from-emerald-500 to-teal-500',
    },
    {
      icon: PenTool,
      title: 'Build-in-Public Drafts',
      description: 'Auto-generate authentic tweets, threads, and updates based on your actual milestones and progress — stop spending 45 minutes a day on content.',
      gradient: 'from-orange-500 to-amber-500',
    },
    {
      icon: Search,
      title: 'Landing Page Roasting',
      description: 'Paste any URL and get structured UX, copy, and conversion feedback in seconds — like having a senior growth marketer on call 24/7.',
      gradient: 'from-rose-500 to-pink-500',
    },
    {
      icon: Rocket,
      title: 'Launch Kit Generation',
      description: 'Product Hunt assets, email sequences, social copy, and press templates generated from your product context — never reinvent the launch wheel again.',
      gradient: 'from-blue-500 to-indigo-500',
    },
    {
      icon: Radar,
      title: 'Competitor Monitoring',
      description: 'Track competitor pricing changes, feature launches, and positioning shifts with automated weekly digests delivered to your chat.',
      gradient: 'from-cyan-500 to-sky-500',
    }
  ],

  techStack: [
    { name: 'OpenClaw', color: 'bg-violet-600 text-white' },
    { name: 'Next.js', color: 'bg-black text-white' },
    { name: 'Supabase', color: 'bg-emerald-600 text-white' },
    { name: 'Stripe', color: 'bg-purple-600 text-white' },
    { name: 'Telegram API', color: 'bg-blue-500 text-white' },
    { name: 'Redis', color: 'bg-red-600 text-white' }
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
        { title: 'Discord', href: 'https://discord.gg/founderclaw' },
        { title: 'Indie Hackers', href: 'https://indiehackers.com/product/founderclaw' },
        { title: 'Build in Public', href: 'https://twitter.com/founderclaw' }
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
