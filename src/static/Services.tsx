export const Services = () => {
    return (
        <div>
            <section className="bg-gray-100 py-16">
                <div className="container mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-8">Our Services</h2>
                    <div className="bg-white p-6 rounded shadow-md mb-8">
                        <h3 className="text-xl font-semibold mb-4">Accounts</h3>
                        <p className="text-gray-600">
                            Explore our range of account services tailored to meet your financial needs.
                        </p>
                        <ul className="list-none text-gray-600 pl-6 mt-4">
                            <li>Checking Accounts</li>
                            <li>Credit Accounts</li>
                            <li>Savings Accounts</li>
                        </ul>
                    </div>
                    <div className="bg-white p-6 rounded shadow-md">
                        <h3 className="text-xl font-semibold mb-4">Loans</h3>
                        <p className="text-gray-600">
                            Need financial assistance? Check out our flexible and competitive loan options.
                        </p>
                        <ul className="list-none text-gray-600 pl-6 mt-4">
                            <li>Personal Loans</li>
                            <li>Home Loans</li>
                            <li>Business Loans</li>
                        </ul>
                    </div>
                </div>
            </section>
        </div>
    );
};
