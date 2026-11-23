---
title: "Measuring home energy with a current sensor"
date: 2026-10-23
summary: "What a current sensor actually reports, and why a first reading is never the final number."
tags: ["esp32", "iot"]
cover: "energy-meter-notes"
---

The IoT Smart Energy Meter project uses an Arduino or ESP32 with a current sensor to show how much energy a home is using. It looks like a small project. The measuring is where I learned the most.

## What is being measured

Power is voltage times current. The sensor measures the current. For the voltage I used a fixed mains value in the calculation, which is an approximation. A better meter measures both.

Energy is power over time. If a 100 W lamp runs for ten hours, that is 1,000 watt-hours, or 1 kWh. The program adds up small slices of power multiplied by the time between readings.

## What went wrong at first

- **Offset.** With nothing connected, the sensor still reported a value near the middle of its range. I had to measure that resting value and subtract it.
- **Noise.** Single readings jumped around. Taking many readings quickly and averaging them gave a steady number.
- **Alternating current.** The current swings up and down many times a second, so an average is close to zero. The program has to calculate a root mean square value over a few cycles instead.

## Checking the result

I compared the output with a device of known power. The first numbers were wrong by a clear margin. After I corrected the offset and set the calibration factor, they were close. Without that check I would have trusted a number that was simply wrong.

## Safety

The sensor clamps around one wire and does not touch the conductor. That is the safe way to measure mains current. I did not open any wiring that carried power.
