export const brand = {
  name: 'Tradifier',
  year: 2026,
  email: 'tradifierhub@gmail.com',
  tagline: 'Build something useful.',
};

export const hero = {
  headline: ['We build', 'systems.'],
  disciplines: [
    { text: 'Software.', note: 'platforms, applications and the backends behind them' },
    { text: 'Automation.', note: 'workflows, agents and integrations that remove repeated work' },
    { text: 'AI.', note: 'connected to data, tools and decisions — not just a chat box' },
    { text: 'Trading technology.', note: 'research, execution and risk infrastructure. no promises of profit' },
    { text: 'Digital growth.', note: 'websites and funnels that actually do something' },
  ],
  intro:
    'Tradifier is a technology studio building software, intelligent automation and digital systems for people and businesses that want to move faster.',
  /** The word SYSTEM breaks into these, then reassembles as TRADIFIER. */
  fragments: ['CODE', 'DATA', 'PEOPLE', 'AUTOMATION', 'MARKETS', 'AI', 'DESIGN'],
  chain: ['idea', 'system', 'software', 'automation', 'data', 'ai', 'growth', 'result'],
  status: [
    ['STATUS', 'SHIPPING'],
    ['MODE', '__cycle__'],
    ['DOMAINS', 'BUILD / AUTOMATE / TRADE / GROW'],
    ['STACK', 'PYTHON / TS / APIS / LLMS'],
    ['OUTPUT', 'SYSTEMS THAT WORK'],
  ] as [string, string][],
  modes: ['BUILDING', 'AUTOMATING', 'CONNECTING', 'TESTING', 'DEPLOYING', 'ITERATING'],
};

export const coreIdea = {
  lead: 'Most businesses don’t need more tools. They need their tools to work together.',
  paragraphs: [
    'Tradifier builds the infrastructure between an idea and its execution.',
    'A business rarely needs “a website” or “a bot” in isolation. It needs the website to capture the lead, the lead to reach the CRM, the CRM to trigger the follow-up, and someone to know whether any of it worked.',
    'So we approach every request as a system rather than a task: what goes in, what has to happen, what comes out, and what breaks when it scales.',
  ],
  needs: [
    'a website',
    'a custom application',
    'an automated sales pipeline',
    'an AI assistant',
    'a trading system',
    'internal business software',
    'a lead-generation engine',
    'API integrations',
    'a better digital presence',
  ],
  worlds: [
    ['Build', 'Software, platforms, websites and custom digital products.'],
    ['Automate', 'Workflows, AI agents, integrations and internal systems.'],
    ['Trade', 'Algorithmic systems, market infrastructure and analytics.'],
    ['Grow', 'Digital presence, lead generation and conversion systems.'],
    ['Experiment', 'AI, Web3 and unconventional software ideas.'],
  ] as [string, string][],
};

export const outcome = {
  headline: 'We don’t just deliver files.',
  lines: [
    { thing: 'A website', rest: 'is not the outcome.' },
    { thing: 'A bot', rest: 'is not the outcome.' },
    { thing: 'An automation workflow', rest: 'is not the outcome.' },
    { thing: 'A dashboard', rest: 'is not the outcome.' },
  ],
  final: 'The outcome is a system that actually works.',
};

export const about = {
  word: 'tradifier',
  paragraphs: [
    'Tradifier is a technology studio built around a simple belief: interesting problems deserve properly engineered systems.',
    'We work across software development, automation, AI, trading technology, digital growth and emerging technology.',
    'Sometimes we build the entire product. Sometimes we repair the broken part. Sometimes we connect ten tools that were never designed to talk to each other. And sometimes we build something that didn’t exist yesterday.',
  ],
  traits: ['curious by default', 'skeptical of unnecessary complexity', 'obsessed with making things actually work'],
  aside: 'We are curious by default, skeptical of unnecessary complexity, and obsessed with making things actually work.',
};

export const audiences: [string, string][] = [
  ['Founders', 'Turning ideas into working products.'],
  ['Businesses', 'Replacing manual processes with connected systems.'],
  ['Traders', 'Building tools around research, execution and analysis.'],
  ['Creators', 'Building digital products and monetization infrastructure.'],
  ['Startups', 'Rapidly moving from concept to validated software.'],
  ['Teams', 'Automating operations and connecting existing tools.'],
  ['Specialists', 'Turning expertise into software, platforms or digital products.'],
];

export const contact = {
  heading: 'Have a problem worth building around?',
  line: 'Tell us what you’re trying to make, automate, fix or grow.',
  email: brand.email,
  areas: ['software', 'automation', 'ai systems', 'trading technology', 'growth systems', 'experiments'],
};

export const footer = {
  areas: ['Software', 'Automation', 'AI', 'Trading', 'Growth', 'Experiments'],
};
