---
title: "A clap-controlled switch: how it works and where it fails"
date: 2026-10-16
summary: "The idea is simple. Getting it to ignore everything except a clap is the real work."
tags: ["arduino", "iot"]
cover: "clap-switch-notes"
---

The Clap-Controlled Light Switch was an IoT course project. A sound sensor listens, an Arduino decides whether it heard a clap, and a relay switches the light.

## The parts

- **Sound sensor module.** It gives a signal when the sound passes a level that a small dial on the board sets.
- **Arduino.** It reads the sensor and decides what to do.
- **Relay module.** It lets a small signal switch a separate circuit.

## The logic

On a clap the sensor signal changes. The program flips a variable, `on` becomes `off` and the other way round, and writes it to the relay pin.

## Where the problems were

- **Noise.** A door slam, a cough or a loud word all look like a clap. I added a short wait after each trigger, so one clap counts once, even though the sound lasts a moment.
- **Echo.** One clap can reach the sensor twice. The same wait helps.
- **Sensitivity.** The dial on the module was too high at first and the light flickered on a passing motorbike. Lowering it fixed more than any code.

A better version would count two claps in a short window before switching, which is much harder to do by accident.

## Safety

Switching mains power is dangerous. The relay isolates the Arduino, but the wiring on the other side still carries mains voltage. I tested the logic with a low-voltage lamp first and did the mains side only with the supervision of someone who knew what they were doing.
