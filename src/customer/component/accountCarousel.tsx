import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import React from "react";

interface Account {
    id: number,
    accountType:string,
    balance:number,
    minPay:number,
    interestRate:number,
    isActive:boolean
}

interface AccountCarouselProps {
    accounts: Account[];
}

const AccountCarousel: React.FC<AccountCarouselProps> = ({ accounts, setTransactions = () =>{}, setDataChange = (arg:boolean)=> {} }) => {

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
    };

    const disableAccount = async (id:number) => {
        const response = await fetch("http://localhost:8080/apiv1/account/disableAccount?id="+id,
            {
                method:'PUT',
                headers:{
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "http://localhost:5173",
                    "Authorization": "Bearer "+sessionStorage.getItem("Authorization")
                }
            })
        const result = await response.json()
        window.alert(result.message)
        setDataChange(true)
    }
    return (
        <>

            <Slider {...settings} className="mt-5">
                {accounts.map((account,id) => (
                    !account.isActive ?
                    <div key={id} className="bg-gray-200 p-4 rounded-lg" >
                        <div className="flex flex-row flex-wrap">
                            <div className="flex-col w-full">
                                <h3 className="text-xl font-bold"  onClick={() => setTransactions(account.id) }>Account Number: {account.id}</h3>
                            </div>
                            <div className="space-x-4 flex justify-between flex-wrap">
                                <div className="flex-col text-start">
                                    <p className="text-lg mb-2">Balance: ${account.balance}</p>
                                    <p className="text-lg mb-2">Type: {account.accountType.charAt(0) + account.accountType.slice(1).toLowerCase()}</p>
                                </div>
                                <div className="flex-col text-end">
                                    {account.accountType == "LOAN" ?
                                        <><p className="text-lg mb-2">Minimum pay: {account.minPay}</p><p
                                            className="text-lg">Interest Rate: {account.interestRate}</p></> : null}
                                </div>
                                <div className="flex-col w-max">
                                    {account.accountType != "CREDIT"?
                                        <button onClick={() =>disableAccount(account.id)} className="border border-b-red-600">
                                            Close Account
                                        </button>
                                    :null}
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