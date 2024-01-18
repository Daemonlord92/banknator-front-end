import {Component} from "react";
import logo from '../assets/logo-transparent-png.png'
export class Home extends Component {
    render() {
        return (
            <div>
                <section className="bg-gray-100 py-16">
                    <div className="container mx-auto text-center">
                        <h1 className="text-4xl font-bold mb-4">Welcome to </h1>
                        <img src={logo} alt="Banknator Logo" className="z-20 max-w-96 m-auto "/>
                        <p className="text-gray-600">
                            Your trusted partner for all your financial needs.
                        </p>
                    </div>
                </section>

                <section className="py-16">
                    <div className="container mx-auto text-center">
                        <h2 className="text-3xl font-bold mb-8">Our Features</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {/* Feature 1 */}
                            <div className="bg-white p-6 rounded shadow-md">
                                <h3 className="text-xl font-semibold mb-4">Secure Banking</h3>
                                <p className="text-gray-600">
                                    Your security is our top priority. Enjoy safe and secure
                                    banking with Banknator.
                                </p>
                            </div>

                            <div className="bg-white p-6 rounded shadow-md">
                                <h3 className="text-xl font-semibold mb-4">Easy Transactions</h3>
                                <p className="text-gray-600">
                                    Make transactions seamlessly with our easy-to-use online
                                    banking platform.
                                </p>
                            </div>

                            <div className="bg-white p-6 rounded shadow-md">
                                <h3 className="text-xl font-semibold mb-4">24/7 Support</h3>
                                <p className="text-gray-600">
                                    Our customer support team is available 24/7 to assist you with
                                    any inquiries.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="bg-gray-100 py-16">
                    <div className="container mx-auto text-center">
                        <h2 className="text-3xl font-bold mb-8">Contact Us</h2>
                        <p className="text-gray-600">
                            Have questions or need assistance? Contact our support team.
                        </p>
                    </div>
                </section>
            </div>
        );
    }
}
