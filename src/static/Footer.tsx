export const Footer = () => {
    const date = new Date().getFullYear()
    return (
        <footer className="fixed bottom-0 left-0 z-20 w-full p-4 bg-blue-600 border-t border-gray-200 text-white shadow md:flex md:items-center md:justify-between md:p-6">
            <div className="text-center w-fit">
                &copy; {date} Banknator. All rights reserved.
            </div>
        </footer>
    );
};
