import React from 'react'
function Stats() {
    return ( 
        <div className='container mt-5 p-3'> 
            <div className='row'>
                <div className='col-6 p-5'>
                    <h1 className='mb-5 fs-1'> Trust with confidence</h1>
                    <h2 className='fs-4'> Customer-first Always</h2>
                    <p className='text-muted'>Customers trust us with ₹4.5+ lakh crores of equity investments and contribute to 15% of daily retail exchange volumes in India </p>

                    <h2 className='fs-4'> No spam or gimmicks</h2>
                    <p className='text-muted'>No gimmicks, spam, "gamification", or annoying push notifications. High quality apps that you use at your pace, the way you like</p>

                    <h2 className='fs-4'>The universe</h2>
                    <p className='text-muted'>Not just an app, but a whole ecosystem. Our investments in 30+ fintech startups offer you tailored services specific to your needs.</p>
                    
                    <h2 className='fs-4'>Do better with money</h2>
                    <p className='text-muted'>With initiatives like Nudge and Kill Switch, we don't just facilitate transactions, but actively help you do better with your money.</p>
                </div>
                <div className='col-6 p-5'>
                    <img src='images/ecosystem.png ' style={{width: "90%"}}/>
                    <div className='text-center '>
                        <a href='' className='mx-5' style={{textDecoration:'none'}}>Explore our product</a>
                        <a href=''style={{textDecoration:'none'}}>Try Kite demo</a>
                    </div>
                    
                </div>
            </div>

        </div>
     );
}

export default Stats;