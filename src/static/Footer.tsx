export const Footer = () => {
    const date = new Date().getFullYear()
    return (
        <footer className="bg-blue-500 text-white py-4 mt-8">
            <div className="container mx-auto text-center">
                &copy; {date} Banknator. All rights reserved.
            </div>
        </footer>
    );
};
