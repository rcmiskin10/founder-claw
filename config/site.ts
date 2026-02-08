import { MessageSquare, Shield, Rocket, BarChart, Brain, Zap } from 'lucide-react'
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
  tagline: 'Your 24/7 AI co-founder, managed and always on',
  description: 'Managed OpenClaw hosting for indie hackers — a 24/7 AI co-founder on Telegram, Discord, and WhatsApp.',
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
    { title: 'AI Co-founders', href: '/dashboard/ai_co_founder' },
    { title: 'Integrations', href: '/dashboard/integrations' },
    { title: 'Usage & Billing', href: '/dashboard/billing' },
    { title: 'Settings', href: '/dashboard/settings' }
  ],

  hero: {
    badge: 'Skip the DevOps. Ship faster.',
    headline: 'Your 24/7 AI Co-founder, Managed So You Don\'t Have To',
    headlineHighlight: 'AI Co-founder',
    subheadline: 'FounderClaw gives indie hackers a pre-configured, always-on AI co-founder on Telegram, Discord, and WhatsApp — pre-loaded with idea validation, MRR tracking, build-in-public content, and Product Hunt launch kits. No Docker. No CVEs. No DevOps nightmares. Just the magic.',
    primaryCta: { text: 'Start Free 7-Day Trial', href: '/register' },
    secondaryCta: { text: 'See How It Works', href: '/features#how-it-works' },
    socialProof: { text: 'Trusted by 500+ indie hackers building in public', rating: '4.9/5' },
  },

  features: [
    {
      icon: MessageSquare,
      title: 'Lives Where You Already Are',
      description: 'Your AI co-founder runs 24/7 on Telegram, Discord, or WhatsApp — proactively pushing MRR alerts, content ideas, and competitor updates instead of waiting in a dashboard you\'ll forget to check.',
      gradient: 'from-violet-500 to-purple-500',
    },
    {
      icon: Shield,
      title: 'Security-Hardened Hosting',
      description: 'Per-user container isolation, automatic CVE patching, encrypted API key storage, and cost guardrails. OpenClaw without the anxiety — we handle every critical vulnerability so you never have to.',
      gradient: 'from-emerald-500 to-teal-500',
    },
    {
      icon: Rocket,
      title: 'Indie Hacker Skill Pack',
      description: 'Pre-loaded with opinionated workflows: IHVF idea validation (payment = validation), Product Hunt launch kit generation, landing page roasting, build-in-public tweet drafting, and cold outreach sequences.',
      gradient: 'from-orange-500 to-red-500',
    },
    {
      icon: BarChart,
      title: 'Stripe MRR Tracking & Alerts',
      description: 'Connect your Stripe account and get daily MRR digests, new customer notifications, churn alerts, and revenue milestone celebrations — all pushed directly to your messaging app.',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Brain,
      title: 'Compounding Business Context',
      description: 'Unlike ChatGPT, FounderClaw remembers everything about your product, customers, metrics, and voice. It gets smarter every week, making it irreplaceable over time.',
      gradient: 'from-pink-500 to-rose-500',
    },
    {
      icon: Zap,
      title: 'Conversational Onboarding',
      description: 'No configuration dashboards. Sign up, connect your channel, and the bot asks \'What are you building?\' — then sets itself up. From zero to AI co-founder in under 5 minutes.',
      gradient: 'from-amber-500 to-yellow-500',
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
        { title: 'Skill Pack', href: '/features#skills' },
        { title: 'Security', href: '/features#security' }
      ],
    },
    {
      title: 'Company',
      links: [
        { title: 'About', href: '/about' },
        { title: 'Blog', href: '/blog' },
        { title: 'Changelog', href: '/blog#changelog' },
        { title: 'Contact', href: '/contact' }
      ],
    },
    {
      title: 'Legal',
      links: [
        { title: 'Privacy Policy', href: '/privacy' },
        { title: 'Terms of Service', href: '/terms' },
        { title: 'Security Policy', href: '/security' },
        { title: 'DPA', href: '/dpa' }
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
