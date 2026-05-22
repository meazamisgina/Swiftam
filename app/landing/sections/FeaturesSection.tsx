"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowsClockwise,
  Buildings,
  Camera,
  DeviceMobile,
  FileText,
  GasPump,
  Microphone,
  UsersThree,
} from "@phosphor-icons/react";

export default function FeaturesSection() {
  return (
    <section className="py-28 px-6 sm:px-10 bg-background">
      <div className="max-w-7xl mx-auto space-y-4">
        <div className="mb-10 max-w-3xl flex flex-col sm:flex-row gap-6 items-start">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border border-primary/30 bg-primary/10">
            <FileText weight="duotone" size={40} className="text-primary" aria-hidden />
          </div>
          <div>
            <span className="text-primary font-mono text-xs tracking-[0.25em] uppercase block mb-3">What you touch every day</span>
            <h2 className="text-3xl md:text-5xl font-sans font-bold tracking-tight mb-4">
              Trips • fuel • payouts • proofs
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed">
              Same vocabulary your yard uses—Bollo snaps, advances, border waits—minus the dog-eared notebook.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <motion.div whileHover={{ y: -5 }} className="bento-card lg:col-span-2 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <FileText weight="duotone" className="text-primary" size={40} aria-hidden />
                <h3 className="text-2xl font-sans font-bold uppercase tracking-tight">Trip sheets</h3>
              </div>
              <p className="text-muted-foreground leading-snug mb-6">
                Digitise loads, allowances, checkpoints—feels like the paper run sheet, lives in the cloud.
              </p>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] font-mono text-muted-foreground uppercase mr-2">Examples</span>
                <span className="inline-flex items-center gap-2 text-xs px-2 py-1 rounded bg-secondary border border-border font-mono">
                  <GasPump size={14} className="text-primary" aria-hidden /> Fuel advance
                </span>
                <span className="text-xs px-2 py-1 rounded bg-secondary border border-border font-mono">Bollo / gate stamp</span>
                <span className="text-xs px-2 py-1 rounded bg-secondary border border-border font-mono">Border wait</span>
                <span className="text-xs px-2 py-1 rounded bg-secondary border border-border font-mono">Cargo type</span>
              </div>
            </div>
          </motion.div>

          <motion.div whileHover={{ y: -5 }} className="bento-card flex flex-col justify-between bg-gradient-to-br from-card to-background">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <GasPump weight="duotone" className="text-primary" size={40} aria-hidden />
                <h3 className="text-2xl font-sans font-bold uppercase tracking-tight">Fuel & cash</h3>
              </div>
              <p className="text-muted-foreground leading-snug mb-8">
                Hand-outs tied to lanes so finance sees fuel that burnt on Djibouti legs—not “misc.”
              </p>
              <span className="text-sm font-mono text-primary px-3 py-1 rounded border border-primary/30 inline-flex items-center gap-2">
                <GasPump size={16} weight="bold" aria-hidden /> Br 48,750 advance (sample)
              </span>
            </div>
          </motion.div>

          <motion.div whileHover={{ y: -5 }} className="bento-card flex flex-col lg:col-span-2 justify-between">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <UsersThree weight="duotone" className="text-primary" size={40} aria-hidden />
                  <h3 className="text-2xl font-sans font-bold uppercase tracking-tight">Driver pay split</h3>
                </div>
                <p className="text-muted-foreground mb-8 leading-snug">
                  Set salary / trip % once—drivers see owed amounts minus advances.
                </p>
              </div>
              <div className="relative flex flex-col justify-center gap-3">
                <div className="bento-card !p-4 border-primary/40">
                  <div className="flex items-center gap-2 mb-2">
                    <Buildings weight="duotone" className="text-primary" size={22} aria-hidden />
                    <span className="text-[10px] font-mono text-muted-foreground">Two branches split</span>
                  </div>
                  <p className="text-foreground font-semibold text-lg">Addis · Dire</p>
                  <div className="w-full bg-card h-1 rounded-full mt-4">
                    <div className="bg-primary h-full w-[62%] rounded-full" />
                  </div>
                </div>
                <Link href="/demo" className="vektor-btn-secondary text-center py-3 text-sm inline-flex gap-2 justify-center items-center">
                  Walk through driver pay <ArrowRight size={16} aria-hidden />
                </Link>
              </div>
            </div>
          </motion.div>

          <motion.div whileHover={{ y: -5 }} className="bento-card bg-primary/10">
            <div className="flex items-center gap-4 mb-4">
              <DeviceMobile weight="duotone" className="text-primary" size={40} aria-hidden />
              <h3 className="text-2xl font-sans font-bold uppercase tracking-tight">Photos & POD</h3>
            </div>
            <p className="text-muted-foreground leading-snug mb-8">
              Drop-off photos, tyre checks, signed Bollo—SMS “OK” from brokers logged beside the proof.
            </p>
            <div className="flex gap-4 border-t border-border/50 pt-5">
              <Camera size={32} weight="duotone" className="text-primary" aria-hidden />
              <Microphone size={32} weight="duotone" className="text-primary" aria-hidden />
              <Buildings size={32} weight="duotone" className="text-primary" aria-hidden />
            </div>
          </motion.div>

          <motion.div whileHover={{ y: -5 }} className="bento-card lg:col-span-3 flex flex-col md:flex-row gap-6 md:items-center md:justify-between">
            <div className="flex items-start gap-4">
              <ArrowsClockwise className="text-primary shrink-0" size={42} weight="duotone" aria-hidden />
              <div>
                <h3 className="text-xl font-bold uppercase tracking-tight">Offline yards</h3>
                <p className="text-muted-foreground text-sm mt-1 leading-snug max-w-xl">
                  Records stay on the phone; HQ catches up when Modjo or Mekelle towers come back—one ledger for every branch.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
