export default function Team() {
  const team = [
    {
      name: "Stuart Phillips",
      role: "Founder & Director",
      bio: "Stuart brings extensive experience in accounting, tax, insolvency, and finance. Having established his own tax and accounting practice and served as head of the commercial and legal division for one of Australia's largest franchisors, he combines entrepreneurial insight with deep technical expertise.",
      qualifications: [
        "Qualified Accountant",
        "Public Practice Certificate",
        "CA/CPA Member",
        "31+ Years Experience"
      ],
      expertise: [
        "Business restructuring & turnarounds",
        "Complex creditor negotiations",
        "Strategic advisory for distressed businesses",
        "Institutional relationship management"
      ]
    },
    {
      name: "Bec Camilleri",
      role: "General Manager",
      bio: "Bec has specialized in the insolvency industry since 2012, with a background in legal services including law firms and in-house legal counsel. She focuses on helping distressed business owners navigate recovery options and implement practical solutions.",
      qualifications: [
        "Legal Services Background",
        "Member - Women in Insolvency & Restructuring QLD",
        "10+ Years Insolvency Specialist",
        "ASIC Procedures Expert"
      ],
      expertise: [
        "Client relationship management",
        "Business recovery planning",
        "ASIC compliance & procedures",
        "File management & coordination"
      ]
    }
  ]

  return (
    <section id="team" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Meet Our Leadership Team
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Qualified professionals with decades of combined experience helping businesses navigate financial challenges
          </p>
        </div>

        {/* Team Members */}
        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {team.map((member, index) => (
            <div key={index} className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-2xl p-8 hover:shadow-xl transition-shadow">
              {/* Header */}
              <div className="mb-6">
                <div className="w-20 h-20 bg-primary-600 rounded-full flex items-center justify-center text-white text-3xl font-bold mb-4">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">
                  {member.name}
                </h3>
                <p className="text-primary-600 font-medium">
                  {member.role}
                </p>
              </div>

              {/* Bio */}
              <p className="text-gray-600 mb-6 leading-relaxed">
                {member.bio}
              </p>

              {/* Qualifications */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">Qualifications</h4>
                <div className="grid grid-cols-2 gap-2">
                  {member.qualifications.map((qual, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                      <svg className="w-4 h-4 text-primary-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {qual}
                    </div>
                  ))}
                </div>
              </div>

              {/* Expertise */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Key Expertise</h4>
                <ul className="space-y-2">
                  {member.expertise.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                      <svg className="w-4 h-4 text-primary-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center bg-primary-50 rounded-2xl p-8 max-w-4xl mx-auto border border-primary-100">
          <h3 className="text-2xl font-bold text-gray-900 mb-3">
            Ready to Discuss Your Situation?
          </h3>
          <p className="text-gray-600 mb-6">
            Our team is here to provide confidential, expert guidance tailored to your business needs
          </p>
          <button 
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-all hover:shadow-lg font-medium"
          >
            Book Your Consultation
          </button>
        </div>
      </div>
    </section>
  )
}
