import Slider, {Settings} from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import React from "react";

interface Account {
    id: number,
    accountType:string,
    balance:number,
    minPay:number,
    interestRate:number,
    isDisabled:boolean
}

interface AccountCarouselProps {
    accounts: Account[];
    setTransactions:(id:number)=>void;
    disableAccount:(id:number)=>Promise<void>;
}

const AccountCarousel: React.FC<AccountCarouselProps> = ({ accounts, setTransactions, disableAccount}: { accounts:Account[], setTransactions: (id:number)=>void, disableAccount:(id:number)=>Promise<void> }) => {

    const settings:Settings = {
        dots: true,
        infinite: accounts.length > 3,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        lazyLoad: "anticipated",
        adaptiveHeight:true,
    };


    return (
        <>

            <Slider {...settings} className="mt-5">
                {accounts.map((account,id) => (
                    account.isDisabled ?
                        <div className="slick-slide">
                            <div key={id} className="bg-gray-200 p-4 rounded-lg items-stretch h-fit py-16" >
                                <div className="flex flex-row flex-wrap">
                                    <div className="flex-col w-full">
                                        <h3 className="text-xl font-bold"  onClick={() => setTransactions(account.id) }>Account Number: {account.id}</h3>
                                    </div>
                                    <div className="space-x-4 flex justify-between flex-wrap">
                                        <div className="flex-col text-start">
                                            <p className="text-lg mb-2">Balance: ${account.balance.toFixed(2)}</p>
                                            <p className="text-lg mb-2">Type: {account.accountType.charAt(0) + account.accountType.slice(1).toLowerCase()}</p>
                                        </div>
                                        <div className="flex-col text-end">
                                            {account.accountType == "LOAN" ?
                                                <><p className="text-lg mb-2">Minimum pay: {account.minPay}</p><p
                                                    className="text-lg">Interest Rate: {account.interestRate}</p></> : null}
                                        </div>
                                        <div className="">
                                            <button onClick={() =>disableAccount(account.id)} className="border border-b-red-600">
                                                Close Account
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    : null
                ))}
            </Slider>
        </>
    );
};

export default AccountCarousel;