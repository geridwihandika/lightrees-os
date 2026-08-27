import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-7xl mx-auto pb-12">
      
      <header className="flex flex-col gap-2 pt-4">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-container/50 backdrop-blur-md text-primary text-xs font-bold tracking-wider uppercase mb-2 border border-primary/20 shadow-sm w-fit">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span> Live Update
        </div>
        <h1 className="font-display-lg text-[40px] md:text-[56px] font-black text-on-surface tracking-tight leading-tight drop-shadow-sm">
          Overview
        </h1>
        <p className="font-body-lg text-[18px] text-on-surface-variant font-medium mt-1">
          Welcome back. Here&apos;s what&apos;s happening across your properties today.
        </p>
      </header>

      {/* KPI Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard title="Total Revenue" value="Rp 4.2B" trend="+12.5%" isPositive={true} icon="account_balance" />
        <KPICard title="Active Projects" value="24" trend="+3" isPositive={true} icon="architecture" />
        <KPICard title="Occupancy Rate" value="89%" trend="-2.1%" isPositive={false} icon="sensor_door" />
        <KPICard title="Feasibility Checks" value="156" trend="+14" isPositive={true} icon="analytics" />
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-4">
        {/* Main Content Area */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="bg-white/70 backdrop-blur-xl rounded-[2rem] p-8 shadow-sm hover:shadow-md transition-shadow border border-outline-variant/30 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
            <div className="flex justify-between items-end border-b border-outline-variant/40 pb-5 mb-6 relative z-10">
              <div>
                <h2 className="font-headline-lg text-[28px] font-black text-on-surface tracking-tight">Quick Access</h2>
                <p className="text-on-surface-variant font-medium text-sm mt-1">Navigate to your most used tools</p>
              </div>
              <button className="text-primary font-label-md font-bold hover:text-primary-container flex items-center gap-1 group transition-colors">
                View All <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10">
              <DashboardCard 
                title="Feasibility Analyzer"
                description="Calculate ROI, payback period, and market value."
                href="/feasibility"
                icon="analytics"
                colorClass="text-primary bg-primary/10"
              />
              <DashboardCard 
                title="Property Portfolio"
                description="Manage all your 80+ projects and listings."
                href="/properties"
                icon="domain"
                colorClass="text-secondary bg-secondary/10"
              />
              <DashboardCard 
                title="Funding Portal"
                description="Review funding applications and tracking."
                href="/funding"
                icon="account_balance_wallet"
                colorClass="text-tertiary text-emerald-600 bg-emerald-100"
              />
              <DashboardCard 
                title="Market Research"
                description="Analyze property price trends and demand."
                href="/research"
                icon="query_stats"
                colorClass="text-blue-600 bg-blue-100"
              />
            </div>
          </div>
        </div>

        {/* Sidebar Widgets */}
        <div className="flex flex-col gap-6">
          <div className="bg-white/70 backdrop-blur-xl rounded-[2rem] p-8 shadow-sm hover:shadow-md transition-shadow border border-outline-variant/30">
            <h2 className="font-headline-md text-[22px] font-black text-on-surface border-b border-outline-variant/40 pb-4 mb-5 tracking-tight">Recent Activity</h2>
            <div className="flex flex-col gap-5">
              <ActivityItem title="New Feasibility Request" desc="Bintaro Sector 9 Property" time="2h ago" icon="analytics" highlight="primary" />
              <ActivityItem title="Project Milestone" desc="Foundation complete for Cluster A" time="5h ago" icon="architecture" highlight="secondary" />
              <ActivityItem title="Payment Received" desc="Booking fee from John Doe" time="1d ago" icon="payments" highlight="tertiary" />
            </div>
          </div>
        </div>
      </section>
      
    </div>
  );
}

function KPICard({ title, value, trend, isPositive, icon }: { title: string, value: string, trend: string, isPositive: boolean, icon: string }) {
  return (
    <div className="bg-white/80 backdrop-blur-lg rounded-[1.5rem] p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-outline-variant/30 group">
      <div className="flex justify-between items-start mb-6">
        <div className="w-12 h-12 rounded-xl bg-surface-container-lowest flex items-center justify-center text-primary border border-outline-variant/50 group-hover:scale-110 transition-transform shadow-sm">
          <span className="material-symbols-outlined text-[24px]">{icon}</span>
        </div>
        <div className={`px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-sm ${isPositive ? 'bg-green-100 text-green-700 border-green-200' : 'bg-red-100 text-red-700 border-red-200'} border`}>
          <span className="material-symbols-outlined text-[14px]">{isPositive ? 'trending_up' : 'trending_down'}</span>
          {trend}
        </div>
      </div>
      <div>
        <p className="font-label-md text-[14px] text-on-surface-variant mb-1 font-semibold uppercase tracking-wider">{title}</p>
        <p className="font-display-sm text-[32px] font-black text-on-surface tracking-tight">{value}</p>
      </div>
    </div>
  );
}

function DashboardCard({ title, description, href, icon, colorClass }: { title: string, description: string, href: string, icon: string, colorClass: string }) {
  return (
    <Link href={href} className="block group">
      <div className="p-6 bg-white/60 backdrop-blur-md rounded-2xl border border-outline-variant/50 transition-all duration-300 hover:border-primary/50 hover:bg-white hover:shadow-md h-full flex flex-col gap-4 relative overflow-hidden">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform ${colorClass}`}>
          <span className="material-symbols-outlined text-[24px]">{icon}</span>
        </div>
        <div>
          <h3 className="font-headline-sm text-[18px] font-bold text-on-surface group-hover:text-primary transition-colors">{title}</h3>
          <p className="font-body-md text-[14px] text-on-surface-variant mt-1.5 font-medium leading-relaxed">{description}</p>
        </div>
      </div>
    </Link>
  );
}

function ActivityItem({ title, desc, time, icon, highlight }: { title: string, desc: string, time: string, icon: string, highlight: string }) {
  const getHighlightColor = () => {
    switch (highlight) {
      case 'primary': return 'text-primary bg-primary/10';
      case 'secondary': return 'text-secondary bg-secondary/10';
      default: return 'text-emerald-600 bg-emerald-100';
    }
  };

  return (
    <div className="flex gap-4 items-start group cursor-default">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-1 transition-transform group-hover:scale-110 ${getHighlightColor()}`}>
        <span className="material-symbols-outlined text-[20px]">{icon}</span>
      </div>
      <div className="flex-1">
        <p className="font-label-md text-[15px] font-bold text-on-surface group-hover:text-primary transition-colors">{title}</p>
        <p className="font-body-md text-[14px] font-medium text-on-surface-variant mt-0.5">{desc}</p>
        <p className="font-label-sm text-[12px] font-bold text-outline mt-1.5">{time}</p>
      </div>
    </div>
  );
}
