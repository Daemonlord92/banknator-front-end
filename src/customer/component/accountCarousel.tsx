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
                        <div className="flex flex-row flex-wrap">
                            <div className="flex-col w-full">
                                <h3 className="text-xl font-bold">Account Number: {account.id}</h3>
                            </div>
                            <div className="space-x-4 flex justify-between">
                                <div className="flex-col">
                                    <p className="text-lg mb-2">Balance: ${account.balance}</p>
                                    <p className="text-lg mb-2">Type: {account.accountType.charAt(0) + account.accountType.slice(1).toLowerCase()}</p>
                                </div>
                                <div className="flex-col text-end">
                                    {account.accountType == "LOAN" ?
                                        <><p className="text-lg mb-2">Minimum pay: {account.minPay}</p><p
                                            className="text-lg">Interest Rate: {account.interestRate}</p></> : null}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </Slider>
        </>
    );
};

export default AccountCarousel;