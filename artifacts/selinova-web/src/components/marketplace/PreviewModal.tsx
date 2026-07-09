import React, { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ExternalLink, Loader2, Monitor, Smartphone, X } from "lucide-react"
import { generatePreviewHtml } from "@/lib/generatePreviewHtml"
import type { Listing } from "@workspace/api-client-react"

interface PreviewModalProps {
  listing: Listing
  open: boolean
  onOpenChange: (open: boolean) => void
}

type Viewport = "desktop" | "mobile"

export function PreviewModal({ listing, open, onOpenChange }: PreviewModalProps) {
  const [loaded, setLoaded] = useState(false)
  const [viewport, setViewport] = useState<Viewport>("desktop")

  const html = generatePreviewHtml(listing)
  const blobUrl = React.useMemo(() => {
    const blob = new Blob([html], { type: "text/html;charset=utf-8" })
    return URL.createObjectURL(blob)
  }, [html])

  // Revoke blob URL when it changes or the component unmounts — prevents memory leak
  React.useEffect(() => {
    return () => {
      URL.revokeObjectURL(blobUrl)
    }
  }, [blobUrl])

  // Reset loaded state when modal closes
  React.useEffect(() => {
    if (!open) setLoaded(false)
  }, [open])

  const openInNewTab = () => {
    const win = window.open("", "_blank")
    if (win) {
      win.document.write(html)
      win.document.close()
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[98vw] w-full h-[96vh] p-0 gap-0 flex flex-col overflow-hidden rounded-xl">
        {/* Header */}
        <DialogHeader className="flex-shrink-0 flex flex-row items-center justify-between px-5 py-3 border-b bg-slate-50 space-y-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-amber-400" />
              <div className="w-3 h-3 rounded-full bg-emerald-400" />
            </div>
            <div className="w-px h-4 bg-slate-200" />
            <DialogTitle className="text-sm font-semibold text-slate-600 truncate">
              {listing.title} — Vorschau
            </DialogTitle>
          </div>

          {/* Viewport switcher */}
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center bg-white border border-slate-200 rounded-lg p-1 gap-1">
              <button
                onClick={() => setViewport("desktop")}
                className={`p-1.5 rounded-md transition-colors ${viewport === "desktop" ? "bg-primary text-white" : "text-slate-400 hover:text-slate-700"}`}
                title="Desktop-Ansicht"
              >
                <Monitor className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewport("mobile")}
                className={`p-1.5 rounded-md transition-colors ${viewport === "mobile" ? "bg-primary text-white" : "text-slate-400 hover:text-slate-700"}`}
                title="Mobil-Ansicht"
              >
                <Smartphone className="w-4 h-4" />
              </button>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={openInNewTab}
              className="hidden sm:flex items-center gap-1.5 text-xs font-semibold"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Im Browser öffnen
            </Button>

            <button
              onClick={() => onOpenChange(false)}
              className="p-1.5 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </DialogHeader>

        {/* Browser chrome bar */}
        <div className="flex-shrink-0 bg-slate-100 border-b px-4 py-2 flex items-center gap-3">
          <div className="flex-1 bg-white border border-slate-200 rounded-md px-3 py-1.5 text-xs text-slate-400 font-mono truncate">
            preview.selinova-tech.at/{listing.categorySlug}/{listing.id}
          </div>
        </div>

        {/* iframe stage */}
        <div className="flex-1 overflow-hidden bg-slate-200 flex items-center justify-center">
          <div
            className={`relative bg-white transition-all duration-300 h-full ${
              viewport === "mobile"
                ? "w-[390px] border-x-8 border-t-12 border-b-16 border-slate-800 rounded-3xl shadow-2xl overflow-hidden"
                : "w-full"
            }`}
          >
            {!loaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-white z-10">
                <div className="flex flex-col items-center gap-3 text-slate-400">
                  <Loader2 className="w-7 h-7 animate-spin text-primary" />
                  <span className="text-sm font-medium">Vorschau wird geladen…</span>
                </div>
              </div>
            )}
            <iframe
              src={blobUrl}
              className="w-full h-full border-0"
              title={`Vorschau: ${listing.title}`}
              sandbox="allow-scripts allow-same-origin"
              onLoad={() => setLoaded(true)}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
