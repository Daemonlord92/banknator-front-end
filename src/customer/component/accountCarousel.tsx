import React from 'react';
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

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

const AccountCarousel: React.FC<AccountCarouselProps> = ({ accounts }) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
    };
    console.log(accounts)
    return (
        <Slider {...settings} className="mt-5 flex justify-between">
            {accounts.map((account) => (
                <div key={account.id} className="bg-gray-200 p-4 rounded-lg">
                    <h3 className="text-xl font-bold mb-2">Account Number: {account.id}</h3>
                    <p className="text-lg mb-2">Balance: ${account.balance}</p>
                    <p className="text-lg">Type: {account.accountType}</p>
                </div>
            ))}
        </Slider>
    );
};

export default AccountCarousel;