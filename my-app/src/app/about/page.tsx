import Image from 'next/image';
// import aboutImage from '@/assets/images/about.jpg';

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">About Us</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* <div>
          <Image
            src={aboutImage}
            alt="Our team"
            width={600}
            height={400}
            className="rounded-lg shadow-lg"
          />
        </div> */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Our Story</h2>
          <p className="mb-4">
            Founded in 2010, RealEstate App has been helping people find their dream homes for over a decade. 
            Our mission is to make the home buying and selling process as seamless and stress-free as possible.
          </p>
          <p className="mb-4">
            With a team of experienced real estate professionals and cutting-edge technology, we provide our 
            clients with the best service in the industry.
          </p>
          <h3 className="text-xl font-bold mb-2">Our Values</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>Integrity in all our dealings</li>
            <li>Exceptional customer service</li>
            <li>Innovation in real estate technology</li>
            <li>Community involvement</li>
          </ul>
        </div>
      </div>
      
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Meet Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { name: 'John Doe', role: 'CEO', bio: 'Founder with 20+ years in real estate' },
            { name: 'Jane Smith', role: 'Lead Agent', bio: 'Specializes in luxury properties' },
            { name: 'Mike Johnson', role: 'Tech Lead', bio: 'Develops our innovative platform' },
          ].map((person) => (
            <div key={person.name} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <div className="w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-full mb-4"></div>
              <h3 className="text-xl font-bold">{person.name}</h3>
              <p className="text-primary-600 dark:text-primary-400 mb-2">{person.role}</p>
              <p className="text-gray-600 dark:text-gray-400">{person.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}