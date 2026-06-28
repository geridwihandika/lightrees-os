export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-margin-page animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-5xl">
      <header className="flex flex-col gap-unit">
        <h1 className="font-headline-lg text-headline-lg md:text-[48px] md:leading-[1.1] md:font-bold text-on-surface tracking-tight">Settings</h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant">Manage your account settings, preferences, and integrations.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
        {/* Settings Navigation */}
        <div className="md:col-span-3">
          <nav className="flex flex-col gap-2">
            <a href="#profile" className="flex items-center gap-3 px-4 py-3 rounded-lg bg-primary-container text-on-primary-container font-label-md transition-colors">
              <span className="material-symbols-outlined text-[20px]">person</span> Profile
            </a>
            <a href="#account" className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant hover:bg-surface-variant font-label-md transition-colors">
              <span className="material-symbols-outlined text-[20px]">manage_accounts</span> Account
            </a>
            <a href="#notifications" className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant hover:bg-surface-variant font-label-md transition-colors">
              <span className="material-symbols-outlined text-[20px]">notifications</span> Notifications
            </a>
            <a href="#integrations" className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant hover:bg-surface-variant font-label-md transition-colors">
              <span className="material-symbols-outlined text-[20px]">integration_instructions</span> Integrations
            </a>
            <a href="#billing" className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant hover:bg-surface-variant font-label-md transition-colors">
              <span className="material-symbols-outlined text-[20px]">credit_card</span> Billing
            </a>
            
            <div className="my-2 border-t border-outline-variant"></div>
            
            <a href="/login" className="flex items-center gap-3 px-4 py-3 rounded-lg text-error hover:bg-error/10 font-label-md transition-colors mt-2">
              <span className="material-symbols-outlined text-[20px]">logout</span> Sign Out
            </a>
          </nav>
        </div>

        {/* Settings Content */}
        <div className="md:col-span-9 flex flex-col gap-gutter">
          
          {/* Profile Section */}
          <section id="profile" className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm overflow-hidden">
            <div className="p-6 border-b border-outline-variant">
              <h2 className="font-headline-md text-headline-md text-on-surface">Public Profile</h2>
              <p className="font-body-md text-on-surface-variant mt-1">This information will be displayed publicly.</p>
            </div>
            
            <div className="p-6 flex flex-col gap-6">
              <div className="flex items-center gap-6">
                <div className="w-24 h-24 rounded-full bg-surface-variant overflow-hidden border-2 border-outline-variant shrink-0">
                  <img src="https://ui-avatars.com/api/?name=Admin+User&background=13423c&color=fff&size=200" alt="Avatar" className="w-full h-full object-cover" />
                </div>
                <div className="flex gap-3">
                  <button className="bg-primary text-on-primary px-4 py-2 rounded-lg font-label-md hover:bg-primary-container hover:text-on-primary-container transition-colors shadow-sm">
                    Change Avatar
                  </button>
                  <button className="bg-surface text-on-surface border border-outline-variant px-4 py-2 rounded-lg font-label-md hover:bg-surface-variant transition-colors">
                    Remove
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="font-label-sm text-on-surface-variant">First Name</label>
                  <input type="text" defaultValue="Admin" className="bg-surface border border-outline-variant rounded-lg p-2.5 font-body-md focus:ring-primary focus:border-primary text-on-surface" />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="font-label-sm text-on-surface-variant">Last Name</label>
                  <input type="text" defaultValue="User" className="bg-surface border border-outline-variant rounded-lg p-2.5 font-body-md focus:ring-primary focus:border-primary text-on-surface" />
                </div>
              </div>
              
              <div className="flex flex-col gap-1">
                <label className="font-label-sm text-on-surface-variant">Bio</label>
                <textarea rows={3} className="bg-surface border border-outline-variant rounded-lg p-2.5 font-body-md focus:ring-primary focus:border-primary text-on-surface" defaultValue="Property manager and lead developer at Lightrees OS."></textarea>
              </div>

              <div className="flex justify-end mt-2">
                <button className="bg-primary text-on-primary px-6 py-2.5 rounded-lg font-label-md hover:bg-primary-container hover:text-on-primary-container transition-colors shadow-sm">
                  Save Changes
                </button>
              </div>
            </div>
          </section>

          {/* Integrations Section */}
          <section id="integrations" className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm overflow-hidden">
            <div className="p-6 border-b border-outline-variant">
              <h2 className="font-headline-md text-headline-md text-on-surface flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">webhook</span> Webhooks & Integrations
              </h2>
              <p className="font-body-md text-on-surface-variant mt-1">Manage connected services like Make.com, Zapier, or custom endpoints.</p>
            </div>
            
            <div className="p-6 flex flex-col gap-4">
              <div className="flex items-center justify-between p-4 border border-outline-variant rounded-lg bg-surface">
                <div className="flex gap-4 items-center">
                  <div className="w-12 h-12 bg-white rounded-md flex items-center justify-center border border-outline-variant shadow-sm p-1">
                    {/* Make.com logo placeholder */}
                    <span className="font-black text-[22px] tracking-tighter text-[#7b00ff]">make</span>
                  </div>
                  <div>
                    <h3 className="font-label-md text-on-surface font-bold">Make.com (Integromat)</h3>
                    <p className="font-body-md text-on-surface-variant text-sm">Feasibility Analyzer Webhook</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded-md">Connected</span>
                  <button className="text-on-surface-variant hover:text-error transition-colors">
                    <span className="material-symbols-outlined">delete</span>
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-2 mt-2">
                <label className="font-label-sm text-on-surface-variant">Active Webhook URL</label>
                <div className="flex gap-2">
                  <input type="text" readOnly defaultValue="https://hook.eu1.make.com/vnqjmoefpvofhgad5ubj0e7j501zxbyy" className="bg-surface-variant border border-outline-variant rounded-lg p-2.5 font-mono text-xs focus:ring-primary focus:border-primary text-on-surface flex-1 text-on-surface-variant" />
                  <button className="bg-surface border border-outline-variant text-on-surface px-4 py-2.5 rounded-lg hover:bg-surface-variant transition-colors flex items-center justify-center">
                    <span className="material-symbols-outlined text-[18px]">content_copy</span>
                  </button>
                </div>
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
