export const About = () => {
    return (
        <div>
            <section className="bg-gray-100 py-16">
                <div className="container mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-8">About Us</h2>
                    <p className="text-gray-600">
                        At Banknator, we are committed to providing top-notch banking
                        services to our valued customers. Here's what sets us apart:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                        {/* Mission Section */}
                        <div className="bg-white p-6 rounded shadow-md">
                            <h3 className="text-xl font-semibold mb-4">Our Mission</h3>
                            <p className="text-gray-600">
                                Our mission is to empower individuals and businesses by
                                offering innovative and reliable banking solutions. We strive to
                                make banking accessible to everyone.
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded shadow-md">
                            <h3 className="text-xl font-semibold mb-4">Our Core Values</h3>
                            <ul className="list-disc text-gray-600 pl-6">
                                <li>Integrity: We conduct our business with honesty and transparency.</li>
                                <li>Customer-Centric: Our customers are at the heart of everything we do.</li>
                                <li>Innovation: We embrace innovation to provide cutting-edge solutions.</li>
                                <li>Community Engagement: We actively contribute to the communities we serve.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};
