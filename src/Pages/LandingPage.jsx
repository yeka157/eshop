import React from 'react';
import background from './images/background.jpg';

const LandingPage = (props) => {
    
    const customBg = {
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        overflow : 'hidden',
        maxWidth : '100%' 
      }

    return (
    <div className='p-0' style={customBg}>
        <div id='landingpage'className='vh-100'>
            <div className='h-50'>
            </div>
            <div className='row'>
                <div className='col-12 col-md-7'></div>
                <div id='carouselLanding' className='carousel carousel-dark slide bg-light opacity-50 col-12 col-md-5 p-5' data-bs-ride='carousel'>
                    <div className='carousel-inner container w-75 h-100'>
                        <div className='carousel-item active' data-bs-interval="10000">
                            <div className='d-block w-100'>
                                <h3 className='fw-light'>Find your best <span className='fw-bold'>Bedroom</span> furniture</h3>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, fuga quia! 
                                    Illum veritatis fugiat dicta animi nam error corrupti tempore? Voluptatibus 
                                    quasi error suscipit tempora nesciunt est, quis at porro.
                                </p>
                            </div>
                        </div>
                        <div className='carousel-item' data-bs-interval="2000">
                            <div className='d-block w-100'>
                                <h3 className='fw-light'>Find your best <span className='fw-bold'>Kitchen</span> furniture</h3>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, fuga quia! 
                                    Illum veritatis fugiat dicta animi nam error corrupti tempore? Voluptatibus 
                                    quasi error suscipit tempora nesciunt est, quis at porro.
                                </p>
                            </div>
                        </div>
                        <div className='carousel-item' data-bs-interval="2000">
                            <div className='d-block w-100'>
                                <h3 className='fw-light'>Find your best <span className='fw-bold'>Living Room</span> furniture</h3>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, fuga quia! 
                                    Illum veritatis fugiat dicta animi nam error corrupti tempore? Voluptatibus 
                                    quasi error suscipit tempora nesciunt est, quis at porro.
                                </p>
                            </div>
                        </div>
                    </div>
                    <button 
                        className='carousel-control-prev' 
                        type='button' 
                        data-bs-target='#carouselLanding' 
                        data-bs-slide='prev'
                    >
                        <span className='carousel-control-prev-icon' aria-hidden='true'></span>
                        <span className='visually-hidden'>Previous</span>
                    </button>
                    <button 
                        className='carousel-control-next' 
                        type='button' 
                        data-bs-target='#carouselLanding' 
                        data-bs-slide='next'
                    >
                        <span className='carousel-control-next-icon' aria-hidden='true'></span>
                        <span className='visually-hidden'>Next</span>
                    </button>
                </div>
            </div>
        </div>
        <div className='bg-white mb-0'>
            <div className='row px-5'>
                <div className='col-12 col-md-6 p-5 m-auto'>
                    <h2 className='mb-5 fw-bold fs-5'>TOBERGET</h2>
                    <p className='mt-5'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
                        Voluptatibus est adipisci eaque voluptates voluptate, illum, 
                        quos nisi dolor temporibus aliquam facilis sapiente reprehenderit 
                        delectus corrupti natus odit, tenetur maxime soluta?
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. 
                        Quae, non assumenda. Repudiandae aspernatur dignissimos, 
                        culpa iusto tempora, dolorum at aliquid fuga assumenda expedita 
                        illum eveniet debitis delectus laboriosam corrupti placeat!
                    </p>
                </div>
                <div className='col-12 col-md-6 p-5 text-center m-auto'>
                    <img src={require("./images/toberget.jpg")} alt="toberget-img" className='shadow-lg img-fluid mx-auto'/>
                </div>
            </div>
            <hr/>
            <div className='row px-5'>
                <div className='col-12 col-md-6 p-5 text-center m-auto'>
                    <img src={require("./images/malm.jpg")} alt="malm-img" className='shadow-lg img-fluid mx-auto'/>
                </div>
                <div className='col-12 col-md-6 p-5 m-auto'>
                    <h2 className='mb-5 fw-bold fs-5'>MALM</h2>
                    <p className='mt-5'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
                        Quos rem ipsam sed corrupti vel aliquam dolores! Vitae, 
                        quo quas eveniet officia nobis, ea, dolorem dignissimos 
                        laudantium cum ipsa deserunt nemo!
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                        Soluta totam vitae eaque, dolore architecto perspiciatis 
                        debitis corrupti rerum veniam qui laudantium earum distinctio 
                        corporis ipsam accusantium dignissimos, temporibus, quis pariatur!
                    </p>
                </div>
            </div>
            <hr/>
            <div className='row px-5'>
                <div className='col-12 col-md-6 p-5 m-auto'>
                    <h2 className='mb-5 fw-bold fs-5'>KLIPPAN</h2>
                    <p className='mt-5'>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                        Reprehenderit in, ratione dolorum ad quos officia assumenda 
                        voluptate perspiciatis itaque culpa et quo quisquam eaque a 
                        neque minus perferendis. Laboriosam, hic.
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
                        Optio delectus quibusdam, voluptas nesciunt animi quas 
                        consectetur nam earum. Laborum perspiciatis, officia ex 
                        ipsam veritatis veniam eaque. Sit atque praesentium quod.
                    </p>
                </div>
                <div className='col-12 col-md-6 p-5 text-center m-auto'>
                    <img src={require("./images/klippan.jpg")} alt="klippan-img" className='shadow-lg img-fluid mx-auto'/>
                </div>
            </div>
        </div>
    </div>
    );
}

export default LandingPage;