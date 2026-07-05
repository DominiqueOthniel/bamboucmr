import { Hero } from "@/components/home/Hero";
import { Partners } from "@/components/home/Partners";
import { Stats } from "@/components/home/Stats";
import { Teasers } from "@/components/home/Teasers";

export default function HomePage() {
  return (
    <>
      <Hero />
      <div className="mx-auto max-w-[1160px] px-5 sm:px-8 lg:px-16" aria-hidden="true">
        <div className="flex items-center text-line">
          <span className="h-0.5 flex-1 bg-current" />
          <span className="mx-[-1px] h-5 w-3 shrink-0 rounded-[5px] bg-sand-2 shadow-[inset_0_0_0_2px_var(--paper)]" />
          <span className="h-0.5 flex-1 bg-current" />
        </div>
      </div>
      <Stats />
      <Teasers />
      <Partners />
    </>
  );
}
