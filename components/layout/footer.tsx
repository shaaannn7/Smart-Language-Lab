import Link from "next/link"
import { BrainCircuit, Send, CodeXml, Globe, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="py-24 border-t border-white/5 bg-[#0B1020] relative overflow-hidden">
      <div className="absolute inset-0 grid-background opacity-[0.03] pointer-events-none" />
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-12 mb-24">
          <div className="col-span-2 lg:col-span-2 space-y-8">
            <Link href="/" className="flex items-center gap-4 group">
              <div className="w-12 h-12 rounded-2xl gradient-primary flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-500">
                <BrainCircuit className="text-white w-7 h-7" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black tracking-tighter text-white">LANG<span className="text-primary">LAB</span></span>
                <span className="text-[8px] font-black uppercase tracking-[0.4em] text-white/20 italic">Neural Protocol</span>
              </div>
            </Link>
            <p className="text-muted-foreground font-medium max-w-xs leading-relaxed text-lg italic">
              Synthesizing human connection through advanced neuro-linguistics and generative AI.
            </p>
            <div className="flex items-center gap-6 text-white/20">
               <Link href="#" className="hover:text-primary transition-all hover:scale-125"><Send className="w-5 h-5" /></Link>
               <Link href="#" className="hover:text-primary transition-all hover:scale-125"><CodeXml className="w-5 h-5" /></Link>
               <Link href="#" className="hover:text-primary transition-all hover:scale-125"><Globe className="w-5 h-5" /></Link>
               <Link href="#" className="hover:text-primary transition-all hover:scale-125"><Mail className="w-5 h-5" /></Link>
            </div>
          </div>
          
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40 mb-8 italic">Platform</h4>
            <ul className="space-y-4 text-xs font-black uppercase tracking-widest text-muted-foreground/60">
              <li><Link href="#features" className="hover:text-white transition-colors">Neural Engine</Link></li>
              <li><Link href="#features" className="hover:text-white transition-colors">Vocal Sync</Link></li>
              <li><Link href="#features" className="hover:text-white transition-colors">Cognitive Path</Link></li>
              <li><Link href="/dashboard" className="hover:text-white transition-colors">Command Center</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40 mb-8 italic">Intelligence</h4>
            <ul className="space-y-4 text-xs font-black uppercase tracking-widest text-muted-foreground/60">
              <li><Link href="#" className="hover:text-white transition-colors">Protocol v4.2</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">AI Ethics</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Neural Models</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">API Access</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40 mb-8 italic">Company</h4>
            <ul className="space-y-4 text-xs font-black uppercase tracking-widest text-muted-foreground/60">
              <li><Link href="#" className="hover:text-white transition-colors">Our Vision</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Press Node</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40 mb-8 italic">Legal</h4>
            <ul className="space-y-4 text-xs font-black uppercase tracking-widest text-muted-foreground/60">
              <li><Link href="#" className="hover:text-white transition-colors">Privacy</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Terms</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8">
          <p className="text-[9px] font-black uppercase tracking-[0.4em] text-muted-foreground/30">
            © 2026 LangLab Neural Systems • Transmitting from the future
          </p>
          <div className="flex items-center gap-3 px-5 py-2 rounded-full bg-white/[0.02] border border-white/5">
             <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,1)]" />
             <span className="text-[9px] font-black uppercase tracking-[0.3em] text-emerald-500/60 italic">All Systems Synced</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
