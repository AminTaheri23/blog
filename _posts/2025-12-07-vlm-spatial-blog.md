---
layout: post                          # (require) default post layout
title: "Teaching Vision Models to Point: A Journey from DIY Grids to Molmo"                   # (require) a string title
date: 2025-12-07 22:34:02 -0230       # (require) a post date
categories: [blindtyping, idea, ai]          # (custom) some categories, but makesure these categories already exists inside path of `category/`
tags: [blindtyping, idea, ai]                      # (custom) tags only for meta `property="article:tag"`            # (custom) image only for meta `property="og:image"`, save your image inside path of `static/img/_posts`
---

I recently found myself puzzled by a curious limitation in vision-language models (VLMs). These AI systems can describe what they see in images with impressive accuracy, yet they struggle with something surprisingly basic: pointing out *where* things are located in those images. If you ask a native multimodal AI "where is the cat?" it can tell you there's a cat, describe it in detail, but it can't easily indicate its position.

This gap bothered me enough to experiment with a workaround.

## A DIY Solution: The Grid Approach

My approach was straightforward, if a bit rough around the edges. I asked the VLM to mentally overlay a 5×5 grid on the image, then output confidence scores between 0 and 1 for each grid cell. With some prompt engineering, I could essentially get the model to indicate which areas of the image contained the object I was asking about.

I tested this with Gemini, uploading a picture of a cat positioned in the top-left corner. I asked the model to identify the cat's location and return only a table of numbers between 0 and 1—no additional text. To my pleasant surprise, it worked. The model assigned higher confidence values to the grid cells in the top-left, accurately reflecting where the cat's head was located. The results were acceptable, showing that even without native spatial understanding, these models could be coaxed into providing location information.

## Then I Discovered Molmo

After some more research, I stumbled upon something that made my grid experiment look like a crude prototype: Molmo, a family of open-source multimodal AI models from the Allen Institute for AI. Unlike my workaround, Molmo handles spatial reasoning natively, and it does so elegantly.

Molmo goes beyond interpretation by learning to point at what it perceives, enabling interactions with both physical and virtual environments. The model can perform basic perception tasks that my grid method only approximated: segmentation, counting, and most importantly, accurate spatial localization. But Molmo's capabilities extend even further into territory I hadn't considered—it can identify and interact with UI elements, making it valuable for building web agents and automation tools.

What impressed me most was learning that Molmo was trained on a highly curated dataset of under one million images—a fraction of what typical multimodal models require. This focused approach to training, combined with its open-source nature, makes it accessible to researchers and developers who don't have massive computational resources.

The model comes in various sizes, from the powerful 72-billion parameter version down to the efficient 1-billion parameter MolmoE model, which nearly matches the performance of GPT-4V. This range means developers can choose between maximum capability or efficient on-device deployment.

## The Bigger Picture

What started as a personal curiosity about VLM limitations led me to a broader realization: the AI community has been actively solving this problem, and solving it well. My grid-based hack was a useful learning experience, but Molmo represents the proper solution—one that's not only more accurate but also opens doors to applications I hadn't imagined, from sophisticated robotics to augmented reality experiences.

The practical implications of this perception capability extend into critical domains like healthcare. Imagine a vision model that can not only identify potential abnormalities in medical imaging but also precisely point to their locations and segment them for further analysis. This kind of spatial awareness could assist radiologists in reviewing scans more efficiently, help train medical students by highlighting areas of interest, or support diagnostic workflows by providing precise visual references. The ability to point and segment isn't just a technical achievement—it's a foundation for building truly helpful AI assistants in fields where precision matters most.

The existence of Molmo also highlights something encouraging about the current AI landscape. Major advancements in spatial reasoning and visual understanding aren't locked behind proprietary systems. They're being built in the open, with full transparency about training data, model weights, and methodology.

## Key Takeaways

- **VLMs can be prompted for spatial information**: Even models without native spatial reasoning can provide location data through creative prompting techniques like confidence grids, though this is far from optimal.

- **Open-source solutions are catching up**: Molmo demonstrates that open models with proper training approaches can achieve performance comparable to proprietary systems, while remaining accessible to the wider AI community.

---

**Learn More About Molmo:**
- [Molmo Official Page (Allen Institute for AI)](https://allenai.org/blog/molmo)
- [Molmo Demo](https://molmo.allenai.org)
- [Molmo on Hugging Face](https://huggingface.co/allenai/Molmo-7B-D-0924)
- [Molmo GitHub Repository](https://github.com/allenai/molmo)
- [Technical Documentation](https://molmoai.com/)


# 6-Point Idea Audit: VLM Spatial Reasoning Blog Post

## Evaluation Summary

**Total Score: 22/30** — **Incubate** (Needs refinement or timing is off)

This blog post idea demonstrates strong relevance and passion but requires consideration of strategic positioning and resource allocation to maximize impact.

---

## Detailed Scoring

| Category | Score | Rationale | Recommendations |
|----------|-------|-----------|-----------------|
| **1. Demand / Relevance** | 4/5 | Strong technical interest exists. AI developers and researchers actively seek practical insights about VLM capabilities and limitations. Medical AI applications are a hot topic. However, the audience is somewhat niche (primarily technical readers interested in multimodal AI). | Broaden appeal by adding more real-world use cases beyond medical applications; include concrete examples readers can try themselves. |
| **2. Feasibility** | 5/5 | Highly feasible. The content already exists in raw form, requires only editing and structuring. No additional research, experiments, or technical work needed. Links to Molmo are readily available. Can be published immediately. | Execute now—this is ready to go with minimal additional investment. |
| **3. Personal Passion** | 5/5 | Clear enthusiasm evident in the original journal entry. The writer naturally explored this problem, experimented with solutions, and continued researching even after finding a working approach. This is authentic curiosity-driven content. | Leverage this passion by creating follow-up content: tutorials, video demonstrations, or a series exploring other VLM limitations. |
| **4. Novelty / Edge** | 3/5 | Moderate novelty. The grid-based workaround is a clever DIY approach but not groundbreaking. Molmo itself is well-documented by Allen AI. The unique angle is the personal discovery narrative and the practical medical application angle, which adds some differentiation. | Strengthen the edge by: (1) providing actual code examples for the grid approach, (2) comparing multiple VLMs' spatial reasoning capabilities, (3) conducting a small experiment with medical images (if ethically appropriate), or (4) interviewing someone using Molmo in production. |
| **5. Resource Efficiency** | 5/5 | Extremely efficient. Requires only writing time (already mostly done). No special tools, budget, or ongoing maintenance. Single blog post can be published and left to accumulate organic traffic. Low-risk, low-cost content. | Maximize ROI by cross-posting to Medium, Dev.to, or relevant subreddits (r/MachineLearning, r/LocalLLaMA). Add to portfolio immediately. |
| **6. Strategic Fit** | 0/5 | **Critical Gap**: No information provided about the author's long-term goals, career direction, or target audience. Is this building toward becoming an AI researcher, technical writer, medical AI specialist, or developer advocate? Without knowing the strategic context, it's impossible to assess fit. | **Action Required**: Define your content strategy. Ask: (1) What do I want to be known for? (2) Who is my target audience? (3) Does this post serve my 5-year vision? If building authority in AI/ML, this fits well. If pivoting to another field, reconsider. |

---

## Key Insights

### Strengths
- **Authentic voice**: Personal discovery narrative is engaging and relatable
- **Practical value**: Readers can replicate the grid experiment immediately
- **Timely topic**: VLM capabilities are cutting-edge and highly relevant
- **Accessible writing**: Technical content made understandable for general tech audience

### Weaknesses
- **Lacks differentiation**: Many tech blogs cover new AI models; needs stronger unique angle
- **Limited actionability**: Readers learn about Molmo but aren't guided on how to use it
- **Strategic uncertainty**: Unclear how this fits into broader content or career goals
- **Single format**: Blog post alone has limited reach; no multimedia components

---

## Recommendation: INCUBATE (with action items)

**Verdict**: This is solid content worth publishing, but it could be significantly more impactful with strategic refinement.

### Immediate Actions (if pursuing)
1. **Clarify strategic fit**: Decide if this aligns with your content brand and career trajectory
2. **Add practical tutorial**: Include a code snippet or step-by-step guide for the grid approach
3. **Create comparison**: Test 2-3 different VLMs on the same image and compare results
4. **Expand medical angle**: Interview a radiologist or medical AI researcher for expert perspective
5. **Plan distribution**: Identify 3-5 platforms/communities where this would resonate

### Long-term Considerations
- Could this be part of a series on "DIY AI experiments" or "Exploring VLM capabilities"?
- Is there potential to create video content demonstrating the concepts?
- Could you build a simple demo tool that lets readers test VLM spatial reasoning interactively?

---

## Final Score Breakdown

| Category | Score |
|----------|-------|
| Demand / Relevance | 4 |
| Feasibility | 5 |
| Personal Passion | 5 |
| Novelty / Edge | 3 |
| Resource Efficiency | 5 |
| Strategic Fit | 0 |
| **TOTAL** | **22/30** |

**Status**: Incubate — Publish if it aligns with your strategic goals; otherwise, archive as a portfolio piece.