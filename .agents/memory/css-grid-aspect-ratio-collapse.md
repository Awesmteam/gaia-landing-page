---
name: CSS grid auto-track collapses aspect-ratio video box
description: Why a Vimeo/iframe embed renders blank when placed in a grid auto column
---

A responsive media embed (Vimeo iframe, padding-top aspect-ratio box) placed inside a
CSS grid `auto` track with a `w-full` (`width:100%`) wrapper can collapse to **zero width**
and render nothing — the column sizes to content, the child's `100%` resolves against that
collapsing track, and an iframe/padding-ratio box has no intrinsic width to stop the collapse.

**Why:** On the Trygghetsövningen video page the hero used `md:grid-cols-[1fr_auto]` with the
video column as `w-full max-w-[300px]` over a `padding-top:177.78%` box. Result: video column
width 0, page looked like it "had no video" even though the Vimeo embed/ID was correct.

**How to apply:** Give the media column a **definite** width on desktop
(e.g. `md:grid-cols-[1fr_300px]`) instead of `auto`, so the aspect-ratio box has a real width
to fill. Don't rely on `auto` track + `w-full` for iframe/aspect-ratio embeds.
