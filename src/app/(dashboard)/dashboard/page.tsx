import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col gap-margin-page animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      <header className="flex flex-col gap-unit">
        <h1 className="font-headline-lg text-headline-lg md:text-[48px] md:leading-[1.1] md:font-bold text-on-surface tracking-tight">Overview</h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant">Welcome back. Here's what's happening today.</p>
      </header>

      {/* KPI Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
        <KPICard title="Total Revenue" value="Rp 4.2B" trend="+12.5%" isPositive={true} icon="payments" />
        <KPICard title="Active Projects" value="24" trend="+3" isPositive={true} icon="architecture" />
        <KPICard title="Occupancy Rate" value="89%" trend="-2.1%" isPositive={false} icon="meeting_room" />
        <KPICard title="Feasibility Checks" value="156" trend="+14" isPositive={true} icon="analytics" />
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-gutter">
        {/* Main Content Area */}
        <div className="lg:col-span-2 flex flex-col gap-gutter">
          <div className="bg-surface-container-lowest rounded-xl p-card-padding flex flex-col gap-gutter shadow-sm border border-outline-variant">
            <div className="flex justify-between items-center border-b border-outline-variant pb-4">
              <h2 className="font-headline-md text-headline-md text-on-surface">Quick Access</h2>
              <button className="text-primary hover:text-primary-container font-label-md">View All</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <DashboardCard 
                title="Feasibility Analyzer"
                description="Calculate ROI, payback period, and market value."
                href="/feasibility"
                icon="analytics"
              />
              <DashboardCard 
                title="Property Portfolio"
                description="Manage all your 80+ projects and listings."
                href="/properties"
                icon="domain"
              />
              <DashboardCard 
                title="Funding Portal"
                description="Review funding applications and tracking."
                href="/funding"
                icon="account_balance_wallet"
              />
              <DashboardCard 
                title="Market Research"
                description="Analyze property price trends."
                href="/research"
                icon="monitoring"
              />
            </div>
          </div>
        </div>

        {/* Sidebar Widgets */}
        <div className="flex flex-col gap-gutter">
          <div className="bg-surface-container-lowest rounded-xl p-card-padding flex flex-col gap-4 shadow-sm border border-outline-variant">
            <h2 className="font-headline-sm text-headline-sm text-on-surface border-b border-outline-variant pb-3">Recent Activity</h2>
            <div className="flex flex-col gap-4">
              <ActivityItem title="New Feasibility Request" desc="Bintaro Sector 9 Property" time="2h ago" icon="analytics" />
              <ActivityItem title="Project Milestone" desc="Foundation complete for Cluster A" time="5h ago" icon="architecture" />
              <ActivityItem title="Payment Received" desc="Booking fee from John Doe" time="1d ago" icon="payments" />
            </div>
          </div>
        </div>
      </section>
      
    </div>
  );
}

function KPICard({ title, value, trend, isPositive, icon }: { title: string, value: string, trend: string, isPositive: boolean, icon: string }) {
  return (
    <div className="bg-surface-container-lowest rounded-xl p-card-padding shadow-sm border border-outline-variant hover-lift">
      <div className="flex justify-between items-start mb-4">
        <div className="w-12 h-12 rounded-lg bg-surface flex items-center justify-center text-on-surface-variant border border-outline-variant">
          <span className="material-symbols-outlined">{icon}</span>
        </div>
        <div className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${isPositive ? 'bg-primary-container text-on-primary-container' : 'bg-error-container text-on-error-container'}`}>
          <span className="material-symbols-outlined text-[14px]">{isPositive ? 'trending_up' : 'trending_down'}</span>
          {trend}
        </div>
      </div>
      <div>
        <p className="font-label-md text-label-md text-on-surface-variant mb-1">{title}</p>
        <p className="font-stat-lg text-stat-lg text-on-surface">{value}</p>
      </div>
    </div>
  );
}

function DashboardCard({ title, description, href, icon }: { title: string, description: string, href: string, icon: string }) {
  return (
    <Link href={href} className="block group">
      <div className="p-5 bg-surface rounded-xl border border-outline-variant transition-all hover:border-primary hover:bg-surface-container-lowest h-full flex flex-col gap-3">
        <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
          <span className="material-symbols-outlined">{icon}</span>
        </div>
        <div>
          <h3 className="font-headline-sm text-headline-sm text-on-surface group-hover:text-primary transition-colors">{title}</h3>
          <p className="font-body-md text-body-md text-on-surface-variant mt-1">{description}</p>
        </div>
      </div>
    </Link>
  );
}

function ActivityItem({ title, desc, time, icon }: { title: string, desc: string, time: string, icon: string }) {
  return (
    <div className="flex gap-3 items-start">
      <div className="w-8 h-8 rounded-full bg-surface-variant flex items-center justify-center flex-shrink-0 mt-1">
        <span className="material-symbols-outlined text-[16px] text-on-surface-variant">{icon}</span>
      </div>
      <div>
        <p className="font-label-md text-label-md text-on-surface">{title}</p>
        <p className="font-body-md text-body-md text-on-surface-variant">{desc}</p>
        <p className="font-label-sm text-label-sm text-outline mt-1">{time}</p>
      </div>
    </div>
  );
}
