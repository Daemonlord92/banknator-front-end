import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import React from "react";

interface Account {
    id: number,
    accountType:string,
    balance:number,
    minPay:number,
    interestRate:number
}

interface AccountCarouselProps {
    accounts: Account[];
}

const AccountCarousel: React.FC<AccountCarouselProps> = ({ accounts, setTransactions = () =>{} }) => {

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
    };
    return (
        <>

            <Slider {...settings} className="mt-5">
                {accounts.map((account,id) => (
                    <div key={id} className="bg-gray-200 p-4 rounded-lg"  onClick={() => setTransactions(account.id) }>
                        <h3 className="text-xl font-bold mb-2">Account Number: {account.id}</h3>
                        <p className="text-lg mb-2">Balance: ${account.balance}</p>
                        <p className="text-lg">Type: {account.accountType}</p>
                    </div>
                ))}
            </Slider>
        </>
    );
};

export default AccountCarousel;