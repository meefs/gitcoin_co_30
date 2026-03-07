# PRD: Coalitional Funding & Cartography Tool

**Working title:** Mechanism Cartographer
**Evolution of:** [Mechanism Finder](https://mechanism-finder.vercel.app), http://wtfisdacc.com/
**Author:** owockibot × Owocki
**Date:** 2026-03-06
**Status:** Draft

---

## 1. Vision

A tool that creates a reflexive feedback loop between **funding what matters**, **discovering projects and domains**, and **creating rounds/attractors** — turning mechanism discovery into coalitional action.

The next tool answers "what are the problems out there?  how do we discover them? who else cares about this problem, and how do we pool capital and deploy it together?"

This is **cartography of coordination** — mapping the solution space so coalitions can form around shared problems and fund them through the right mechanisms.

### d/acc Alignment
Every recommendation is filtered through a d/acc lens: does this mechanism centralize or decentralize power? Does it preserve human agency? The tool is opinionated — it steers toward defensive, decentralizing structures.

---

## 2. The Reflexive Loop

```
┌──────────────────────────────────────────────────┐
│                                                  │
│   ┌─────────────┐    ┌──────────────────┐        │
│   │  1. DISCOVER │───▶│  2. COALESCE     │        │
│   │  "What fits  │    │  "Who else cares │        │
│   │   my problem?"│   │   about this?"   │        │
│   └──────┬────────┘   └────────┬─────────┘        │
│          │                     │                  │
│          │    ┌────────────────┘                   │
│          ▼    ▼                                    │
│   ┌──────────────────┐   ┌─────────────────┐      │
│   │  3. FUND         │──▶│  4. LEARN       │      │
│   │  "Deploy capital  │   │  "What worked?" │      │
│   │   through the     │   │  Feed back into │      │
│   │   right mechanism"│   │  the map" (repeat)    │──────┘
>  └──────────────────┘   └─────────────────┘
```

**Each loop iteration makes the tool smarter:**
- Usage queries → reveal what problems people are trying to solve (demand signal)
- Coalition formation → reveals which problems have energy behind them
- Funding outcomes → reveals which mechanisms worked for which contexts
- Learnings → improve recommendations for the next user

---

## 3. User Journeys

### Journey A: The Funder
> "I have $50K and care about watershed monitoring in the Colorado River Basin. What mechanism should I use, and who else is funding this?"

1. **Discover** — Enter problem via natural language or sliders. Tool abstracts away details like mechanism stack (e.g., Quadratic Funding → Retroactive Rewards → Conviction Voting) and just lets people cast intents and find each other.
2. **See the map** — Cartography view shows related projects, existing rounds, and other funders in this domain
3. **Join or create** — Join an existing coalition/round, or create a new attractor
4. **Fund** — Deploy capital.  Abstract away complexity likehe selected mechanism (onchain integration)
5. **Track** — See outcomes, comopare to similar campaigns.  Plan a 2nd campaigng.

### Journey B: The Builder
> "I'm building open-source soil sensors. Where should I apply for funding?"

1. **Discover** — Describe your project. Tool shows which active rounds/attractors match
2. **See demand** — View what funders are looking for in your domain
3. **Apply** — Submit to matching rounds directly from the tool
4. **Get funded** — Mechanism handles allocation (QF, conviction, etc.). Abstract away as much complexity as possible.

### Journey C: The Round Operator
> "I want to run a climate funding round but don't know which mechanism to use or if there's enough demand."

1. **Discover** — Tool shows demand signals: how many people have searched for "climate" + "public goods" + "hardware".  Alos funding signals, who has commited funding and under what terms?
2. **Validate** — See if enough potential funders/builders exist for a viable round
3. **Design** — Tool recommends mechanism based on round parameters (community size, capital available, trust level)
4. **Launch** — Create the round as an attractor on the map.  Turn attractors into real campaigns.  

---

## 4. Core Features

### Phase 1: Cartography Layer (on top of current Mechanism Finder)

**What exists:** Slider-based mechanism recommendation with LLM intent input.

**Add:**
- **Domain map** — Visual cartography of all mechanism domains (climate, education, infrastructure, AI safety, etc. everything else in https://wtfisdacc.com) showing density of interest
- **Query aggregation** — Anonymous aggregation of search queries to surface demand signals ("47 people searched for watershed funding this month")
- **Related projects** — For each mechanism recommendation, show real-world projects that used it (pull from Gitcoin, Allo, Giveth, Optimism RPGF data)
- **"I care about this" signal** — Let users upvote/flag domains they want to fund or build in (lightweight coalition seed) with ETH deposits

### Phase 2: Coalition Formation

- **Attractor creation** — Any user can create an "attractor" around a problem domain + mechanism. Like a proto-round.
- **Pledging** — Users can pledge capital to an attractor ("I'll put in $5K if this round launches"). No commitment until threshold.
- **Builder matching** — Builders register projects; tool matches them to attractors where funders are gathering
- **Coalition chat** — Lightweight discussion for people coalescing around an attractor (could be embedded or link to Telegram/Discord)
- **Threshold triggers** — When an attractor hits critical mass (N funders, $X pledged, M projects), it graduates to a live round

### Phase 3: Onchain Funding Rails

- **Treasury formation** — Coalition members pool into a Safe .  
- **Defer complexity to sub-tools** — giveth 1hive etc all handle mechanism complexity. we dont.  
- **Outcome tracking** — After funding, track project milestones and feed results back into mechanism effectiveness scores
- **Reputation/history** — Build funder and builder reputation from onchain activity

### Phase 4: Intelligence Layer

- **case study/ effectiveness scoring** — Which case studies worked best for which problem types? Data-driven recommendations
- **Cross-round learning** — "Rounds in the climate domain that used QF had 3x more unique contributors than direct grants"
- **Demand forecasting** — Predict which domains will need funding next based on query trends
- **d/acc scoring** — Rate each mechanism and round configuration on decentralization, censorship resistance, and human agency preservation

---

## 5. Data Model

```
Domain
  ├── name (e.g., "Watershed Monitoring")
  ├── parent_domain (e.g., "Climate")
  ├── demand_signals[] (anonymized query count, trend)
  └── attractors[]

Attractor
  ├── domain
  ├── mechanism_stack[] (recommended mechanisms)
  ├── creator
  ├── pledges[] (funder, amount, conditional?)
  ├── projects[] (builders who've expressed interest)
  ├── status (forming | threshold_met | live_round | completed)
  └── threshold (min funders, min capital, min projects)

Round (graduates from Attractor)
  ├── attractor_id
  ├── mechanism (QF, conviction, retro, etc.)
  ├── allo_pool_id (onchain)
  ├── safe_address (treasury)
  ├── projects[]
  ├── contributions[]
  └── outcomes[]

User
  ├── address (wallet)
  ├── roles[] (funder, builder, operator)
  ├── domains_of_interest[]
  ├── history[] (rounds participated in, outcomes)
  └── reputation_score
```

---

## 6. What Makes This Different

| Existing tools | This tool |
|---|---|
| Gitcoin 2.0: "Here's a round, contribute" | "Here's the problem space, find your coalition, *then* fund" |
| Giveth: "Here are projects, donate" | "Here's where demand and supply of funding intersect" |
| Allo: "Here's infrastructure, build on it" | "Here's which infrastructure to use and why" |
| Clr.fund: "Here's QF" | "Here's the right *stack* of mechanisms for your context" |

**Key differentiator:** The tool doesn't assume you know what round to join or what mechanism to use. It starts from the *problem* and helps you cast intent, find allies, form a coalition, and deploy capital — all in one flow.

---

## 7. Technical Architecture

```
┌─────────────────────────────────────────┐
│           Frontend (Next.js)            │
│  ┌──────────┬───────────┬────────────┐  │
│  │ attractor Cartography│ Coalition  │  │
│  │ Finder   │ Map        │ Dashboard │  │
│  └──────────┴───────────┴────────────┘  │
├─────────────────────────────────────────┤
│           API Layer (Vercel)            │
│  ┌──────────┬───────────┬────────────┐  │
│  │ LLM Intent│ Query    │ Attractor  │  │
│  │ Parser    │ Aggregator│ CRUD      │  │
│  └──────────┴───────────┴────────────┘  │
├─────────────────────────────────────────┤
│           Data Layer                    │
│  ┌──────────┬───────────┬────────────┐  │
│  │ Supabase │ Allo      │ The Graph  │  │
│  │ (users,  │ Protocol  │ (onchain   │  │
│  │ attractors│(rounds)  │  events)   │  │
│  └──────────┴───────────┴────────────┘  │
├─────────────────────────────────────────┤
│           Onchain                       │
│  ┌──────────┬───────────┐               │
│  │ Allo v2  │ Safe      │               │
│  │ (pools)  │ (treasury)│               │
│  └──────────┴───────────┘               │
```

---

## 8. MVP Scope (Phase 1)

Ship the smallest thing that demonstrates the reflexive loop:

1. use existing css styles.  make an experiments/ dir with index page. build into gitcoin.co/experiments/coalitions.   use the four dimensions, diagnostic checklist and dacc taxonomy on http://wtfisdacc.com/ as the navigational devices
2. **+ Query logging** — anonymously log what people search for (demand signal)
3. **+ Domain map visualization** — show aggregated demand as a force-directed graph or treemap
4. **+ "I'm interested" button** — let wallet-connected users signal interest in a domain
5. **+ Interest aggregation** — show how many people care about each domain
6. **+ trending section** — show what subsections are trending

**MVP validates:** Do people use the demand signaling? Do clusters form? Is there enough signal to justify coalition features?  

---

## 9. Success Metrics

| Metric | Phase 1 target | Phase 2 target |
|---|---|---|
| Monthly active users | 500 | 2,000 |
| Domains with >10 interest signals | 5 | 20 |
| Attractors created | — | 10 |
| Attractors → live rounds | — | 3 |
| Capital deployed through tool | — | $100K |
| Unique funders in coalitions | — | 50 |

---

## 10. Answered Questions

1. **Identity** — Ethereum mainnet wallets. No L1s
2. **Simplicity** — keep it simpmle to start.
3. **Curation** — use the criteria from https://www.wtfisdacc.com/
5. **Revenue model** — 1% goes back to gitcoin.
6. **Governance** — Atrractor graduates to round when it passes 1 eth.
7. **Privacy** — Keep query data anonamous.

---

## 11. Why Now

- **gitcoin.co knowledge repoalready exists** and has users — we're not starting from zero
- **marekt is evolving bbigly"
- **The "what mechanism/how should i design it, what app should I use" question is real** — every Gitcoin round operator, RetroPGF applicant, and DAO treasurer asks it. we can be the first that sidesteps this complexity.
- **AI makes intent parsing tractable** — natural language → mechanism recommendation is already working
- **The funding landscape is fragmented** — dozens of mechanisms, no map. First credible cartography wins.

---


