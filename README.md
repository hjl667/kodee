
# [kodee.io](https://kodee.io)

[![English](https://img.shields.io/badge/Language-English-red.svg)](README.md)
[![中文](https://img.shields.io/badge/语言-中文-blue.svg)](README_CN.md)

## Design Philosophy: A Copy of Your Brain
With so many note-taking apps already available, why did I create another one? On one hand, I wanted to practice and have a side project that I could continuously improve. On the other hand, I felt I had some unique needs for note-taking that existing apps couldn't satisfy.

One requirement I wanted to fulfill is that the things I write down should be something I've digested and organized myself, rather than just copying and pasting from ChatGPT with nice formatting, only to forget it in a few days.

That's why the title says "a copy of your brain" - meaning that everything recorded inside is something you could explain to others, no matter how much time has passed.

I emphasize the process of personal organization and thinking because with AI available now, it's easy to create comprehensive-looking written reports. However, having your own thoughts and insights about a field and being able to articulate them clearly remains a relatively rare and difficult skill to develop.

I believe learning should be a lifelong habit, not something you do for an exam and then forget. If it's the latter, the learning process becomes painful and doesn't yield much long-term benefit.

So with the goal clear, what's the implementation method? The kodee app implements two main functions.

The first is to work with topics as units, starting from fragmented small knowledge points and then organizing logic and establishing connections yourself. Everyone has probably experienced learning a new field from scratch. In such situations, many people might find an authoritative book/notes in that field and use that learning material's framework to study the new domain.

But I think a more effective approach, or at least one I personally prefer, is to start with small topics/knowledge points that interest you, thoroughly understand these points first, then repeat this process. When you've understood enough, you can establish connections and organize frameworks yourself. I think this completely reversed logic better aligns with learning patterns and makes it easier to absorb, internalize, and explain to others.

So kodee supports quickly creating small topics, where users can organize their understanding of each topic, then use the created topics to create views - essentially establishing connections.

The second function is ensuring that individual topics are thoroughly understood. First, there's a theoretical point: if understanding a topic requires understanding higher-level concepts, you need to clarify those first. Then ask more questions, like why certain tech stacks emerged, what problems they solve, what the solution approach is, what trade-offs exist, etc.

Additionally, there are practical features that kodee can provide. The theoretical foundation here is that the standard for having learned something is being able to explain it clearly to someone outside the field using concise, precise language. So in the topic editing page, you can explain to kodee, which provides real-time voice transcription. After explaining, you can get corresponding feedback through AI and prompt settings.

The original "English learning" function is preserved here - you can take notes in Chinese, explain in English, and get English expression-related feedback, allowing you to improve practical English while mastering knowledge points.

I'd like to elaborate on my understanding of "English learning" - I think English proficiency should be judged by how much actual information you can express in English, and how concise, accurate, and understandable your expression is. From this perspective, vocabulary accumulation and pronunciation are not as important.

## Usage Guide
After creating an account and logging in, you'll see two pages. One is "create," which is similar to current AI app chat interfaces where you can create new topics.

![create page](assets/create.jpg)

Here you can switch between "no edit" and "optimized with ai." "No edit" saves exactly what you write, while "optimized with ai" uses default prompts or your own prompts to let AI edit and optimize. From my experience, I don't really like having AI make changes.

After creating topics, you can go to the explore interface. The right side of this page shows all your created topics, and the left side shows all created views.

![expore page](assets/explore.jpg)

Let's first look at the editing page after clicking into a topic. This is the main page for topic editing and practice. The size between the three main sections is adjustable. The largest section on the left is the topic editing section, which uses a Notion-like block-styled editing mode. 

Each note can be exported as .md format using the menu button below. The microphone button below starts practice explanation, and real-time transcription appears in the bottom-right section. The tabs in the top-right corner show views containing the current topic, followed by all practice feedback and practice transcription content (transcription only supports English).

![edit page](assets/edit%20page.jpg)

Back to the explore page, you can create views through the plus button in the top-right corner. In this popup, you can search for topics to add, then adjust the hierarchical structure by dragging on the left side. Additionally, in the operation bar of each view on the explore page, there's an export function that can export all topics in that view as a complete .md file according to the custom hierarchy.

![edit page](assets/view.jpg)

## How kodee Became Today's Version

The kodee project has gone through two pivots. These changes happened partly because of my improved skills - I felt capable of building more complex things. Another reason is that as a side project, I still hoped it would be an app I could actually use, which would give me continued motivation to improve it.

kodee initially positioned itself as an auxiliary app specifically for interpreters, but since I'm no longer in that industry, I wasn't clear about interpreters' needs anymore, so it transformed into an academic speaking improvement software.

However, when using the second version of kodee, I found the AI-generated content quality was quite poor - the content was too generic, and I didn't even have the motivation to practice. Forcing myself to learn the content and expressions inside meant I couldn't learn knowledge or practice concise, powerful expression.

So I thought about letting users provide their own practice content, which naturally led to a note-taking function. Combined with the learning patterns I've discovered (as described above) and the speaking practice function from the second version, this became the current latest version of kodee.

I'm already using kodee to learn all the content I encounter now. Problems I encounter while using it will be fixed when I have time, and I'll record the bugs I'm fixing and features I'm writing in this readme.

## Features to be Developed
- bug fix
- password reset