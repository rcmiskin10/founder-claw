import { MessageSquare, Shield, BarChart, Rocket, Zap, Globe } from 'lucide-react'
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
  tagline: 'Your AI co-founder that never sleeps',
  description: 'Managed OpenClaw hosting for indie hackers — a 24/7 AI co-founder in your messaging apps, zero DevOps required.',
  url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  company: 'FounderClaw',

  mainNav: [
    { title: 'Features', href: '/features' },
    { title: 'Pricing', href: '/pricing' },
    { title: 'How It Works', href: '/features#how-it-works' },
    { title: 'Blog', href: '/blog' }
  ],

  dashboardNav: [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Instances', href: '/dashboard/entities' },
    { title: 'Usage', href: '/dashboard/usage' },
    { title: 'Settings', href: '/dashboard/settings' }
  ],

  hero: {
    badge: 'Skip the DevOps. Ship faster.',
    headline: 'Your Always-On AI Co-Founder, Ready in 5 Minutes',
    headlineHighlight: 'AI Co-Founder',
    subheadline: 'FounderClaw gives indie hackers a pre-configured, always-on AI co-founder running 24/7 in Telegram, Discord, or WhatsApp. MRR tracking, idea validation, build-in-public tweets, launch kits — all powered by OpenClaw, without the nightmare of self-hosting.',
    primaryCta: { text: 'Start 7-Day Free Trial', href: '/register' },
    secondaryCta: { text: 'See How It Works', href: '/features#how-it-works' },
    socialProof: { text: 'Trusted by 500+ indie hackers and solo founders', rating: '4.9/5' },
  },

  features: [
    {
      icon: MessageSquare,
      title: 'Lives in Your Messaging App',
      description: 'Deploy your AI co-founder to Telegram, Discord, or WhatsApp — no new dashboards, no context switching. It meets you where you already work.',
      gradient: 'from-violet-500 to-purple-500',
    },
    {
      icon: Shield,
      title: 'Security Hardened & Always Patched',
      description: 'OpenClaw has had critical CVEs in 2026. We handle per-user container isolation, automatic patching, API key encryption, and cost guardrails so you don\'t have to.',
      gradient: 'from-emerald-500 to-teal-500',
    },
    {
      icon: BarChart,
      title: 'Stripe MRR Tracking & Daily Alerts',
      description: 'Connect your Stripe account and get proactive daily revenue summaries, churn alerts, and growth insights pushed directly to your chat — no dashboard required.',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Rocket,
      title: 'Product Hunt Launch Kit Generator',
      description: 'Generate taglines, first comments, maker stories, and launch day checklists tailored to your product. Your AI co-founder has launched hundreds of times.',
      gradient: 'from-orange-500 to-red-500',
    },
    {
      icon: Zap,
      title: 'Idea Validation with IHVF Framework',
      description: 'Structured conversational validation where Payment = Validation. The bot guides you through the Indie Hacker Validation Framework to pressure-test ideas before you build.',
      gradient: 'from-yellow-500 to-amber-500',
    },
    {
      icon: Globe,
      title: 'Build-in-Public Tweet Drafting',
      description: 'Your AI co-founder knows your product, metrics, and journey. It drafts authentic build-in-public tweets on schedule so you stay consistent without the time sink.',
      gradient: 'from-pink-500 to-rose-500',
    }
  ],

  techStack: [
    { name: 'Next.js 15', color: 'bg-black text-white' },
    { name: 'Supabase', color: 'bg-emerald-600 text-white' },
    { name: 'Stripe', color: 'bg-purple-600 text-white' },
    { name: 'Docker', color: 'bg-blue-600 text-white' },
    { name: 'OpenClaw', color: 'bg-orange-600 text-white' },
    { name: 'Hetzner', color: 'bg-red-600 text-white' }
  ],

  footerSections: [
    {
      title: 'Product',
      links: [
        { title: 'Features', href: '/features' },
        { title: 'Pricing', href: '/pricing' },
        { title: 'How It Works', href: '/features#how-it-works' },
        { title: 'Changelog', href: '/blog' }
      ],
    },
    {
      title: 'Company',
      links: [
        { title: 'About', href: '/about' },
        { title: 'Blog', href: '/blog' },
        { title: 'Contact', href: '/contact' }
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
