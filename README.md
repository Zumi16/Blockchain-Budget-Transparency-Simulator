# Blockchain Budget Transparency Simulator

A **web-based simulator** that demonstrates transparent and accountable **budget tracking** using blockchain-inspired principles.
Users can record project budgets, log transactions, monitor fund usage, and vote on whether unspent money should be **reallocated** or **returned**.

---

## Overview

This project simulates how **blockchain technology** can promote **transparency and trust** in financial management.
All transactions are stored locally in a `blockchain.json` file, acting as a digital ledger to mimic blockchain immutability and traceability.

---

## Features

- Add and manage project budgets
- Record detailed transactions and expenses
- Automatic computation of total spent and remaining funds
- Voting system for reallocation or refund of leftover budget
- Local JSON-based ledger (no database or paid APIs needed)

---

## ⚙️ Installation

**Clone this repository**

   ```bash
   git clone https://github.com/yourusername/Blockchain-Budget-Transparency-Simulator.git
   ```

**Navigate into the project directory**

   ```bash
   cd Blockchain-Budget-Transparency-Simulator
   ```

**Install dependencies**

   ```bash
   npm install express cors
   ```

**Run the server**

   ```bash
   node server.js
   ```

**Open** `index.html` in your browser.

---

## Usage

1. Enter a **Project Name** and its **Approved Budget**.
2. Add multiple **transactions** (e.g., transportation, supplies, etc.).
3. The system will compute **total spent** and **remaining funds**.
4. When funds remain, users can **vote** to:

   * *Reallocate* the remaining balance
   * *Return* it to the source

All records are saved in `blockchain.json` to simulate a transparent ledger.

---

## Purpose

This simulator is designed for **educational use only**, showing how blockchain concepts can be applied to **public budgeting transparency** and **financial accountability**.

---

## Note: I created this to promote awareness of open, transparent, and responsible financial systems.

