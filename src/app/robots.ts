import type { MetadataRoute } from "next";

import { SITE_URL } from "@/utils/site";

/**
 * Liberados explicitamente. Tecnicamente o `*` já cobre todos, mas alguns
 * agentes de IA (Google-Extended e Applebot-Extended, por exemplo) funcionam
 * como opt-out e só olham a regra com o próprio nome. Declarar deixa a
 * intenção registrada e evita bloqueio acidental por uma regra futura.
 */
const AI_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-User",
  "Claude-SearchBot",
  "anthropic-ai",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "meta-externalagent",
  "Amazonbot",
  "Bytespider",
  "CCBot",
  "cohere-ai",
  "DuckAssistBot",
  "MistralAI-User",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      ...AI_CRAWLERS.map((userAgent) => ({ userAgent, allow: "/" })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
