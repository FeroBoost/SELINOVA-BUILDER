import React, { useState } from "react"
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CheckCircle, Mail, ShieldCheck } from "lucide-react"
import type { Listing } from "@workspace/api-client-react"

interface ContactModalProps {
  listing: Listing
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ContactModal({ listing, open, onOpenChange }: ContactModalProps) {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" })
  const [errors, setErrors] = useState<Partial<typeof form>>({})

  const validate = () => {
    const errs: Partial<typeof form> = {}
    if (!form.name.trim()) errs.name = "Name ist erforderlich"
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) errs.email = "Gültige E-Mail erforderlich"
    if (!form.message.trim()) errs.message = "Nachricht ist erforderlich"
    return errs
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setErrors({})
    // In production this would POST to the API
    setTimeout(() => setSubmitted(true), 400)
  }

  const handleClose = (o: boolean) => {
    if (!o) {
      setTimeout(() => { setSubmitted(false); setForm({ name: "", email: "", phone: "", message: "" }) }, 300)
    }
    onOpenChange(o)
  }

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("de-AT", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(price)

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg">
        {submitted ? (
          <div className="flex flex-col items-center text-center py-8 gap-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center">
              <CheckCircle className="w-9 h-9 text-emerald-600" />
            </div>
            <DialogTitle className="text-xl font-black">Anfrage gesendet!</DialogTitle>
            <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
              Wir haben Ihre Anfrage erhalten und melden uns innerhalb von 24 Stunden bei Ihnen zurück.
            </p>
            <Button onClick={() => handleClose(false)} className="mt-2">Schließen</Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-xl font-black flex items-center gap-2">
                <Mail className="w-5 h-5 text-primary" />
                Anfrage stellen
              </DialogTitle>
              <DialogDescription className="text-sm">
                Für: <span className="font-semibold text-foreground">{listing.title}</span>
                <span className="ml-2 text-primary font-bold">{formatPrice(listing.price)}</span>
                {listing.pricePeriod && listing.pricePeriod !== "once" && (
                  <span className="text-slate-400"> / {listing.pricePeriod}</span>
                )}
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4 pt-2">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-600 uppercase tracking-wide mb-1.5 block">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <Input
                    placeholder="Max Mustermann"
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    className={errors.name ? "border-red-400 focus-visible:ring-red-400" : ""}
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-600 uppercase tracking-wide mb-1.5 block">
                    Telefon
                  </label>
                  <Input
                    placeholder="+43 123 456 789"
                    value={form.phone}
                    onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wide mb-1.5 block">
                  E-Mail <span className="text-red-500">*</span>
                </label>
                <Input
                  type="email"
                  placeholder="max@beispiel.at"
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  className={errors.email ? "border-red-400 focus-visible:ring-red-400" : ""}
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wide mb-1.5 block">
                  Ihre Nachricht <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={4}
                  placeholder="Ich interessiere mich für dieses Angebot und hätte folgende Fragen…"
                  value={form.message}
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  className={`w-full rounded-md border px-3 py-2 text-sm shadow-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none ${errors.message ? "border-red-400 focus-visible:ring-red-400" : "border-input bg-background"}`}
                />
                {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
              </div>

              <div className="flex items-start gap-2 bg-emerald-50 border border-emerald-200 rounded-lg p-3">
                <ShieldCheck className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                <p className="text-xs text-emerald-700 leading-relaxed">
                  Ihre Anfrage wird sicher über SELINOVA-TECH übermittelt. Transaktionen laufen über unser Treuhand-System.
                </p>
              </div>

              <div className="flex gap-3 pt-1">
                <Button type="button" variant="outline" onClick={() => handleClose(false)} className="flex-1">
                  Abbrechen
                </Button>
                <Button type="submit" className="flex-1 font-bold">
                  Anfrage senden
                </Button>
              </div>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
