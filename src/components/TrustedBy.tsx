export default function TrustedBrands() {

  const logos = [
    "c1.png","c2.png","c3.png","c4.png","c5.png","c6.png","c7.png",
    "c8.png","c9.png","c10.png","c11.png","c12.png","c13.png","c14.png",
  ]

  return (
    <section className="relative py-16 bg-gradient-to-br from-orange-50 via-white to-orange-100 overflow-hidden">

      {/* heading */}
      <div className="text-center mb-14 px-6">

        <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
          Trusted by <span className="text-[#FA8912]">Leading Brands</span>
        </h2>

        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
          We collaborate with innovative companies across industries to build scalable digital solutions.
        </p>

      </div>

      {/* marquee */}
      <div className="overflow-hidden mb-10">

        <div className="flex w-max animate-scroll-left gap-12">

          {[...logos, ...logos].map((logo, i) => (
            <img
              key={i}
              src={`/images/clientlogo/${logo}`}
              alt="Client Logo"
              className="h-14 md:h-20 w-40 object-contain grayscale hover:grayscale-0 transition duration-1000"
            />
          ))}

        </div>

      </div>

      {/* fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-orange-50 to-transparent" />

      <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-orange-50 to-transparent" />

    </section>
  )
}