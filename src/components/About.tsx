export default function About() {
  return (
    <section id="about" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Content */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Strategic Guidance When Your Business Needs It Most
            </h2>
            
            <div className="prose prose-lg text-gray-600 space-y-4 mb-8">
              <p>
                We provide professional guidance to business owners seeking specialist advice during challenging times. 
                Whether you're facing cashflow pressure, debt accumulation, or operational disruptions — we review your 
                position and deliver actionable solutions.
              </p>
              
              <p>
                As a specialist advisory firm, we don't provide accounting or tax services. Instead, we work alongside 
                your existing accountants and lawyers to deliver the best possible outcome for your specific situation.
              </p>
              
              <p>
                Our expertise lies in providing company directors with strategic options when financial issues or 
                significant matters disrupt business operations. We take a holistic approach, considering all aspects 
                of your situation to create a clear, practical pathway forward.
              </p>
            </div>

            {/* Key Differentiators */}
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Qualified Professionals</h3>
                  <p className="text-gray-600">
                    All advisory staff are qualified accountants with CA, IPA, or CPA memberships
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Confidential & Independent</h3>
                  <p className="text-gray-600">
                    Work at your own pace, online, with complete confidentiality
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Proven Track Record</h3>
                  <p className="text-gray-600">
                    31+ years helping businesses from diverse industries and backgrounds
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Stats & Visual */}
          <div className="relative">
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-8">Why Businesses Choose Us</h3>
              
              <div className="space-y-8">
                <div>
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-gray-700 font-medium">Client Satisfaction</span>
                    <span className="text-2xl font-bold text-primary-600">98%</span>
                  </div>
                  <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-primary-600 rounded-full" style={{width: '98%'}}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-gray-700 font-medium">Successful Restructures</span>
                    <span className="text-2xl font-bold text-primary-600">92%</span>
                  </div>
                  <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-primary-600 rounded-full" style={{width: '92%'}}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-gray-700 font-medium">Asset Protection Rate</span>
                    <span className="text-2xl font-bold text-primary-600">95%</span>
                  </div>
                  <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-primary-600 rounded-full" style={{width: '95%'}}></div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-gray-200">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <div className="text-3xl font-bold text-primary-600 mb-1">500+</div>
                    <div className="text-sm text-gray-600">Businesses Assisted</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-primary-600 mb-1">$2B+</div>
                    <div className="text-sm text-gray-600">Debt Managed</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative element */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary-100 rounded-2xl -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
